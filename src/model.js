import { string, mixed } from 'yup';
import onChange from 'on-change';
import render from './view.js';

const app = () => {
  const state = {
    rssForm: {
      inputState: 'valid',
      value: '',
      addedFids: [],
      error: '',
    },
  };

  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path, value) => {
    console.log(state);
    if (path === 'rssForm.inputState') {
      if (value === 'invalid') {
        render(form, watchedState.rssForm.error);
      }
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form).get('url');

    const urlSchema = string().required().url();
    const duplicationSchema = mixed().notOneOf(state.rssForm.addedFids);

    urlSchema
      .validate(formData)
      .then((result) => duplicationSchema.validate(result))
      .then(() => watchedState.rssForm.addedFids.push(formData))
      .then(() => (watchedState.rssForm.value = ''))
      .then(() => (watchedState.rssForm.inputState = 'valid'))
      .then(() => render(form, null))
      .catch((e) => {
        watchedState.rssForm.error = e;
        watchedState.rssForm.inputState = 'invalid';
        watchedState.rssForm.value = formData;
      });
  });
};

export default app;
