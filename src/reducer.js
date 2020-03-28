import { combineReducers } from 'redux-immutable';
import { authReducer } from './resources/auth';
import { userReducer } from './resources/user';
import { globalReducer } from './resources/global';

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default (state, action) => globalReducer(
  reducers(state, action),
  action,
);
