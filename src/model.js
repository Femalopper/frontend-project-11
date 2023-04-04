import runApp from './controller.js';

const app = () => {
  const state = {
    rssForm: {
      inputState: 'valid',
      value: '',
      feeds: [],
      posts: [],
      error: '',
    },
  };

  runApp(state);
};

export default app;
