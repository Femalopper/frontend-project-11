import { string, mixed } from 'yup';
import onChange from 'on-change';
import render from './view.js';
import { setLocale } from 'yup';

const runApp = (state) => {
  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path, value) => {
    console.log(state);
    if (path === 'rssForm.error') {
      render(form, watchedState.rssForm.error);
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
      },
    });

    const urlSchema = string().url();
    const duplicationSchema = mixed().notOneOf(state.rssForm.addedFids);

    urlSchema
      .validate(formData)
      .then((result) => duplicationSchema.validate(result))
      .then(() => {
        watchedState.rssForm.addedFids.push(formData);
        watchedState.rssForm.value = '';
        watchedState.rssForm.inputState = 'valid';
        watchedState.rssForm.error = '';
      })
      .then(() => render(form, null))
      .catch((e) => {
        watchedState.rssForm.error = e.errors[0].key;
        watchedState.rssForm.inputState = 'invalid';
        watchedState.rssForm.value = formData;
      });
  });
};

export default runApp;
