import runApp from './controller.js';

const app = () => {
  const state = {
    rssForm: {
      inputState: 'empty',
      value: '',
      feeds: [],
      posts: [],
      error: '',
    },
  };

  runApp(state);
};

export default app;
