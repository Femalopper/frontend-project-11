import runApp from './controller.js';

const app = () => {
  const state = {
    rssForm: {
      inputState: 'valid',
      value: '',
      addedFids: [],
      error: '',
    },
  };

  runApp(state);
};

export default app;
