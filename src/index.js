// @ts-check

import 'bootstrap/dist/css/bootstrap.css';
import './style.scss';
import app from './model.js';
import i18next from 'i18next';
import { ru } from './ru.js';

i18next
  .init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  })
  .then(() => app());
