import { modalRender } from './view.js';

const addReviewHandler = (state, watchedState) => {
  console.log('ge');
  const reviewBtns = document.querySelectorAll('[data-bs-target="#modal"]');
  const links = document.querySelectorAll('a');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const reviewLinkId = e.target.dataset.id;
      watchedState.rssForm.posts = state.rssForm.posts.map((post) => {
        if (+post.id === +reviewLinkId) {
          console.log({ ...post, status: 'read' });
          return { ...post, status: 'read' };
        }
        return post;
      });
    });
  });

  reviewBtns.forEach((reviewBtn) => {
    reviewBtn.addEventListener('click', (e) => {
      console.log('review ck');
      const reviewBtn = e.target;
      console.log(reviewBtn);
      const reviewLink = reviewBtn.parentNode.firstChild;
      const reviewLinkId = reviewLink.parentNode.firstChild.dataset.id;
      console.log(reviewLinkId);
      watchedState.rssForm.posts = state.rssForm.posts.map((post) => {
        if (+post.id === +reviewLinkId) {
          console.log({ ...post, status: 'read' });
          return { ...post, status: 'read' };
        }
        return post;
      });
      modalRender(state, reviewLinkId);
    });
  });
};

export default addReviewHandler;
