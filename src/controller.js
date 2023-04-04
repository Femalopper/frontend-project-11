import { string, mixed } from 'yup';
import onChange from 'on-change';
import render from './view.js';
import { setLocale } from 'yup';
import axios from 'axios';
import parseXml from './parser.js';

const runApp = (state) => {
  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path, value) => {
    console.log(state);
    if (path === 'rssForm.inputState') {
      if (value === 'valid' || value === 'empty') {
        render(state, form);
      }
    }
    if (path === 'rssForm.error') {
      render(state, form);
    }
  });

  form.addEventListener('submit', (event) => {
    console.log('event');
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
        watchedState.rssForm.inputState = 'empty';
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
        watchedState.rssForm.inputState = 'empty';
      });
  });
};

export default runApp;
