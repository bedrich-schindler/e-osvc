import { logout } from '../resources/auth';
import { API_LOGIN_FAILURE } from '../resources/auth/actionTypes';
import history from '../routerHistory';
import routes from '../routes';

const apiErrorMiddleware = (store) => (next) => (action) => {
  if (
    action.type !== API_LOGIN_FAILURE
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
