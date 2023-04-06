import onChange from 'on-change';
import { formRender, feedsRender, postsRender, errorsRender } from './view.js';
import updatePosts from './updater.js';
import addReviewHandler from './review-controller.js';
import addSubmitHandler from './form-controller.js';

const runApp = (i18nextInstance, state) => {
  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path) => {
    if (path === 'rssForm.feeds') {
      formRender(i18nextInstance, form);
      feedsRender(state);
      postsRender(i18nextInstance, state);
      addReviewHandler(state, watchedState);
      setTimeout(() => updatePosts(state, watchedState, addPost), 5000);
    }
    if (path === 'rssForm.posts') {
      postsRender(i18nextInstance, state);
      addReviewHandler(state, watchedState);
    }
    if (path === 'rssForm.error') {
      errorsRender(i18nextInstance, state, form);
    }
  });

  addSubmitHandler(state, watchedState, form);
};

export default runApp;
