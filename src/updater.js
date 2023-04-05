import axios from 'axios';

const updatePosts = (state, watchedState) => {
  console.log('5 sec');
  state.rssForm.feeds.map(({ href }) => {
    axios
      .get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(href)}`)
      .then((resp) => parseXml(resp.data.contents))
      .then((parsedData) => {
        Array.from(parsedData.getElementsByTagName('item')).map((item, index) => {
          const postTitle = item.querySelector('title').textContent;
          const postDescription = item.querySelector('description').textContent;
          const href = item.querySelector('link').textContent;
          const posts = state.rssForm.posts.map(({ postTitle }) => postTitle);
          if (!posts.includes(postTitle)) {
            state.rssForm.posts.push({
              id: state.rssForm.posts.length + 1,
              feedId: state.rssForm.feeds.length + 1,
              href,
              postTitle,
              postDescription,
              status: 'unread',
            });
          }
        });
      })
      .catch((e) => e);
  });
  watchedState.rssForm.posts = [...state.rssForm.posts];
  setTimeout(() => updatePosts(state, watchedState), 5000);
};

export default updatePosts;
