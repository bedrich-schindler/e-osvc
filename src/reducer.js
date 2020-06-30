import { combineReducers } from 'redux-immutable';
import { authReducer } from './resources/auth';
import { clientReducer } from './resources/client';
import { invoiceReducer } from './resources/invoice';
import { projectReducer } from './resources/project';
import { userReducer } from './resources/user';
import { globalReducer } from './resources/global';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  invoice: invoiceReducer,
  project: projectReducer,
  user: userReducer,
});

export default (state, action) => globalReducer(
  reducers(state, action),
  action,
);
