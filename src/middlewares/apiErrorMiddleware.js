import { matchPath } from 'react-router';
import { logout } from '../resources/auth';
import history from '../routerHistory';
import routes from '../routes';

const apiErrorMiddleware = (store) => (next) => (action) => {
  if (
    !matchPath(
      history.location.pathname,
      {
        exact: true,
        path: routes.login.path,
      },
    )
    && typeof action.payload !== 'undefined'
    && action.error
    && (action.payload.status === 401 || action.payload.status === 403)
  ) {
    store.dispatch(logout());
    history.push(routes.login);

    return false;
  }
  return next(action);
};

export default apiErrorMiddleware;
