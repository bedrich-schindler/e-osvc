import thunkMiddleware from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import { createMiddleware } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const middlewares = [
  thunkMiddleware,
  createMiddleware(),
];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
