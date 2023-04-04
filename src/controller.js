import { string, mixed } from 'yup';
import onChange from 'on-change';
import { formRender, feedsRender, postsRender, errorsRender } from './view.js';
import { setLocale } from 'yup';
import axios from 'axios';
import parseXml from './parser.js';

const runApp = (state) => {
  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path) => {
    console.log(state);
    if (path === 'rssForm.feeds') {
      formRender(form);
      feedsRender(state);
      postsRender(state);
      updatePosts();
    }
    if (path === 'rssForm.posts') {
      postsRender(state);
    }
    if (path === 'rssForm.error') {
      errorsRender(state, form);
    }
  });

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
      .then(() =>
        axios.get(
          `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(formData)}`
        )
      )
      .then((resp) => parseXml(resp.data.contents))
      .then((parsedData) => {
        const feedTitle = parsedData.querySelector('channel > title').textContent;
        const feedDescription = parsedData.querySelector('channel > description').textContent;
        Array.from(parsedData.getElementsByTagName('item')).map((item, index) => {
          const postTitle = item.querySelector('title').textContent;
          const postDescription = item.querySelector('description').textContent;
          const href = item.querySelector('link').textContent;
          watchedState.rssForm.posts.push({
            id: index + 1,
            feedId: state.rssForm.feeds.length + 1,
            href,
            postTitle,
            postDescription,
          });
        });
        watchedState.rssForm.feeds.push({
          id: state.rssForm.feeds.length + 1,
          href: formData,
          feedTitle,
          feedDescription,
        });
        console.log(state);
      })
      .then(() => {
        state.rssForm.value = '';
        watchedState.rssForm.inputState = 'valid';
        state.rssForm.error = '';
      })
      .catch((e) => {
        console.log(e.name);
        if (e.name === 'TypeError') {
          watchedState.rssForm.error = 'parse_error';
        } else if (e.name === 'AxiosError') {
          watchedState.rssForm.error = 'network_error';
        } else {
          console.log(e.errors[0]);
          watchedState.rssForm.error = e.errors[0].key;
        }
        watchedState.rssForm.inputState = 'invalid';
        watchedState.rssForm.value = formData;
      });
  });

  const updatePosts = () => {
    console.log('5 sec');
    state.rssForm.feeds.map(({ href }) => {
      axios
        .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(href)}`)
        .then((resp) => parseXml(resp.data.contents))
        .then((parsedData) => {
          Array.from(parsedData.getElementsByTagName('item')).map((item, index) => {
            const postTitle = item.querySelector('title').textContent;
            const postDescription = item.querySelector('description').textContent;
            const href = item.querySelector('link').textContent;
            const posts = state.rssForm.posts.map(({ postTitle }) => postTitle);
            if (!posts.includes(postTitle)) {
              state.rssForm.posts.push({
                id: index + 1,
                feedId: state.rssForm.feeds.length + 1,
                href,
                postTitle,
                postDescription,
              });
            }
          });
        })
        .catch((e) => e);
    });
    watchedState.rssForm.posts = [...state.rssForm.posts];
    setTimeout(() => updatePosts(), 5000);
  };
};

export default runApp;
