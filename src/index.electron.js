import { render } from 'react-dom';
import history from './routerHistory';

import store from './store';
import app from './app';

// Install service worker
window.addEventListener('load', () => {
  navigator.serviceWorker
    .register('./sw.electron.js')
    .then((registration) => {
      registration.addEventListener('updatefound', () => {
        window.location.reload();
      });

      return registration;
    });
});

render(
  app(store, history),
  document.getElementById('app'),
);
