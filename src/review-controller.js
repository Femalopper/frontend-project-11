import { modalRender } from './view.js';

const addReviewHandler = (state, watchedState) => {
  const changePostStatus = (reviewLinkId) => {
    watchedState.rssForm.posts = state.rssForm.posts.map((post) => {
      if (+post.id === +reviewLinkId) {
        return { ...post, status: 'read' };
      }
      return post;
    });
  };

  const reviewBtns = document.querySelectorAll('[data-bs-target="#modal"]');
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const reviewLinkId = e.target.dataset.id;
      changePostStatus(reviewLinkId);
    });
  });

  reviewBtns.forEach((reviewBtn) => {
    reviewBtn.addEventListener('click', (e) => {
      const reviewLink = e.target.parentNode.firstChild;
      const reviewLinkId = reviewLink.parentNode.firstChild.dataset.id;
      changePostStatus(reviewLinkId);
      modalRender(state, reviewLinkId);
    });
  });
};

export default addReviewHandler;
