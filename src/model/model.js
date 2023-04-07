import i18next from 'i18next';
import runApp from '../watcher.js';
import ru from '../locales/ru.js';

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
