import { string, mixed, setLocale } from 'yup';
import axios from 'axios';
import parseXml from '../parser.js';
import addPost from '../add-post.js';

const addSubmitHandler = (state, watchedState, form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form).get('url');

    setLocale({
      string: {
        url: ({ url }) => ({ key: 'invalid_url_error', values: { url } }),
      },
      mixed: {
        notOneOf: ({ notOneOf }) => ({ key: 'duplicate_rss_error', values: { notOneOf } }),
        required: ({ required }) => ({ key: 'empty_field_error', values: { required } }),
      },
    });

    const urlSchema = string().url().required();
    const feedsHrefs = state.rssForm.feeds.map(({ href }) => href);
    const duplicationSchema = mixed().notOneOf(feedsHrefs);

    urlSchema
      .validate(formData)
      .then((result) => duplicationSchema.validate(result))
      .then(() => axios.get(
        `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(formData)}`,
      ))
      .then((resp) => parseXml(resp.data.contents))
      .then((parsedData) => {
        const feedTitle = parsedData.querySelector('channel > title').textContent;
        const feedDescription = parsedData.querySelector('channel > description').textContent;
        Array.from(parsedData.getElementsByTagName('item')).forEach((item) => {
          const postTitle = item.querySelector('title').textContent;
          const postDescription = item.querySelector('description').textContent;
          const href = item.querySelector('link').textContent;
          addPost(state, postTitle, postDescription, href);
        });
        watchedState.rssForm.posts = [...state.rssForm.posts];
        watchedState.rssForm.feeds.push({
          id: state.rssForm.feeds.length + 1,
          href: formData,
          feedTitle,
          feedDescription,
        });
      })
      .then(() => {
        state.rssForm.value = '';
        state.rssForm.inputState = 'valid';
        state.rssForm.error = '';
      })
      .catch((e) => {
        if (e.name === 'TypeError') {
          watchedState.rssForm.error = 'parse_error';
        } else if (e.name === 'AxiosError') {
          watchedState.rssForm.error = 'network_error';
        } else {
          watchedState.rssForm.error = e.errors[0].key;
        }
        state.rssForm.inputState = 'invalid';
        watchedState.rssForm.value = formData;
      });
  });
};

export default addSubmitHandler;
