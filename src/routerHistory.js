import {
  createBrowserHistory,
  createHashHistory,
} from 'history';
import isElectron from 'is-electron';
import routes from './routes';

// eslint-disable-next-line import/no-mutable-exports
let historyImplementation;

if (isElectron()) {
  historyImplementation = createHashHistory();
  historyImplementation.push(routes.login.path);
} else {
  historyImplementation = createBrowserHistory();
}

export default historyImplementation;
