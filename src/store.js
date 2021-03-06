import thunkMiddleware from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwtInjectorMiddleware from './middlewares/jwtInjectorMiddleware';
import apiErrorMiddleware from './middlewares/apiErrorMiddleware';
import reducer from './reducer';

const middlewares = [
  thunkMiddleware,
  jwtInjectorMiddleware,
  createMiddleware(),
  apiErrorMiddleware,
];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
