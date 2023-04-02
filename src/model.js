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

  const addedFids = [];
  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path, value) => {
    if (path === 'rssForm.inputState') {
      if (value === 'invalid') {
        render(form, watchedState.rssForm.error);
      }
    }
  });

  form.addEventListener('submit', (event) => {
    const { target } = event;

    const urlSchema = string().url();
    const duplicationSchema = mixed().notOneOf(addedFids);

    urlSchema
      .validate(target.value)
      .then(() => duplicationSchema(target.value))
      .catch((e) => {
        watchedState.rssForm.error = e;
        watchedState.rssForm.inputState = 'invalid';
        return;
      })
      .then(() => state.rssForm.addedFids.push(target.value))
      .then(() => watchedState.rssForm.value === '')
      .then(() => render(form, null));
  });
};

export default app;
