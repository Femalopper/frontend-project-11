const addPost = (state, postTitle, postDescription, href) => {
  state.rssForm.posts.push({
    id: state.rssForm.posts.length + 1,
    feedId: state.rssForm.feeds.length + 1,
    href,
    postTitle,
    postDescription,
    status: 'unread',
  });
};

export default addPost;
