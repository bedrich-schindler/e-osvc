import { combineReducers } from 'redux-immutable';
import { authReducer } from './resources/auth';
import { clientReducer } from './resources/client';
import { invoiceReducer } from './resources/invoice';
import { notificationReducer } from './resources/notification';
import { projectReducer } from './resources/project';
import { socialInsuranceReducer } from './resources/socialInsurance';
import { userReducer } from './resources/user';
import { globalReducer } from './resources/global';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  invoice: invoiceReducer,
  notification: notificationReducer,
  project: projectReducer,
  socialInsurance: socialInsuranceReducer,
  user: userReducer,
});

export default (state, action) => globalReducer(
  reducers(state, action),
  action,
);
