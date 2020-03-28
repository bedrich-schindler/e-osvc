import { render } from 'react-dom';
import history from './routerHistory';

import store from './store';
import app from './app';

render(
  app(store, history),
  document.getElementById('app'),
);
