import axios from 'axios';
import parseXml from './parser.js';
import addPost from './add-post.js';

const updatePosts = (state, watchedState) => {
  console.log('5 sec');
  state.rssForm.feeds.map(({ href }) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(href)}`)
      .then((resp) => parseXml(resp.data.contents))
      .then((parsedData) => {
        Array.from(parsedData.getElementsByTagName('item')).map((item) => {
          const post = item.querySelector('title').textContent;
          const postDescription = item.querySelector('description').textContent;
          const link = item.querySelector('link').textContent;
          const posts = state.rssForm.posts.map(({ postTitle }) => postTitle);
          if (!posts.includes(post)) {
            addPost(state, state, post, postDescription, link);
          }
          return true;
        });
      })
      .catch((e) => e);
    watchedState.rssForm.posts = [...state.rssForm.posts];
    return true;
  });
  setTimeout(() => updatePosts(state, watchedState), 5000);
};

export default updatePosts;
