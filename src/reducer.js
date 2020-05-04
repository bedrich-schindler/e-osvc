import { combineReducers } from 'redux-immutable';
import { authReducer } from './resources/auth';
import { clientReducer } from './resources/client';
import { projectReducer } from './resources/project';
import { userReducer } from './resources/user';
import { globalReducer } from './resources/global';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  project: projectReducer,
  user: userReducer,
});

export default (state, action) => globalReducer(
  reducers(state, action),
  action,
);
