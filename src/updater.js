import axios from 'axios';
import parseXml from './parser.js';
import addPost from './add-post.js';

const updatePosts = (state, watchedState) => {
  state.rssForm.feeds.forEach(({ href }) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(href)}`)
      .then((resp) => parseXml(resp.data.contents))
      .then((parsedData) => {
        Array.from(parsedData.getElementsByTagName('item')).forEach((item) => {
          const post = item.querySelector('title').textContent;
          const postDescription = item.querySelector('description').textContent;
          const link = item.querySelector('link').textContent;
          const posts = state.rssForm.posts.map(({ postTitle }) => postTitle);
          if (!posts.includes(post)) {
            addPost(state, post, postDescription, link);
          }
        });
      })
      .catch((e) => e);
  });
  watchedState.rssForm.posts = state.rssForm.posts;
  setTimeout(() => {
    updatePosts(state, watchedState);
  }, 5000);
};

export default updatePosts;
