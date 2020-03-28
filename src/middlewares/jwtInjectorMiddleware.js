import { RSAA } from 'redux-api-middleware';
import { selectToken } from '../resources/auth';

const jwtInjectorMiddleware = (store) => (next) => (action) => {
  const callApi = action[RSAA];

  if (callApi) {
    const jwt = selectToken(store.getState());

    if (jwt) {
      callApi.headers = {
        ...callApi.headers,
        Authorization: `Bearer ${jwt}`,
      };

      return next({
        ...action,
        [RSAA]: callApi,
      });
    }
  }

  return next(action);
};

export default jwtInjectorMiddleware;
