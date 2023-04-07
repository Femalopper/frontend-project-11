import onChange from 'on-change';
import { formRender, feedsRender, postsRender, errorsRender } from './view/view.js';
import updatePosts from './updater.js';
import addReviewHandler from './controllers/review-controller.js';
import addSubmitHandler from './controllers/form-controller.js';

const runApp = (i18nextInstance, state) => {
  const form = document.querySelector('.rss-form');

  const watchedState = onChange(state, (path) => {
    const choosePath = {
      'rssForm.feeds': () => {
        formRender(i18nextInstance, form);
        feedsRender(state);
        postsRender(i18nextInstance, state);
        addReviewHandler(state, watchedState);
        if (state.rssForm.feeds.length === 1) {
          setTimeout(() => updatePosts(state, watchedState), 5000);
        }
        return true;
      },
      'rssForm.posts': () => {
        postsRender(i18nextInstance, state);
        addReviewHandler(state, watchedState);
        return true;
      },
      'rssForm.error': () => errorsRender(i18nextInstance, state, form),
    };

    return (path === 'rssForm.value') ? true : choosePath[path]();
  });

  addSubmitHandler(state, watchedState, form);
};

export default runApp;
