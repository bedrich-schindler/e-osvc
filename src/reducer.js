import { combineReducers } from 'redux-immutable';
import { authReducer } from './resources/auth';
import { clientReducer } from './resources/client';
import { userReducer } from './resources/user';
import { globalReducer } from './resources/global';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  user: userReducer,
});

export default (state, action) => globalReducer(
  reducers(state, action),
  action,
);
