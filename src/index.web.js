import {
  applyUpdate,
  install,
} from 'offline-plugin/runtime';
import { render } from 'react-dom';
import history from './routerHistory';

import store from './store';
import app from './app';

// Install offline-plugin service worker
install({
  onUpdateReady: () => {
    applyUpdate();
  },
  onUpdated: () => {
    window.location.reload();
  },
});

render(
  app(store, history),
  document.getElementById('app'),
);
