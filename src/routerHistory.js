import {
  createBrowserHistory,
  createHashHistory,
} from 'history';
import routes from './routes';

// eslint-disable-next-line import/no-mutable-exports
let historyImplementation;

if (IS_ELECTRON) {
  historyImplementation = createHashHistory();
  historyImplementation.push(routes.login.path);
} else {
  historyImplementation = createBrowserHistory();
}

export default historyImplementation;
