import runApp from './controller.js';
import i18next from 'i18next';
import { ru } from './ru.js';

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

  const i18nextInstance = i18next.createInstance();

  i18nextInstance
    .init({
      lng: 'ru',
      resources: {
        ru,
      },
    })
    .then(() => runApp(i18nextInstance, state));
};

export default app;
