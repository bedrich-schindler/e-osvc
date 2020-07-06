import { combineReducers } from 'redux-immutable';
import { authReducer } from './resources/auth';
import { clientReducer } from './resources/client';
import { healthInsuranceReducer } from './resources/healthInsurance';
import { invoiceReducer } from './resources/invoice';
import { notificationReducer } from './resources/notification';
import { projectReducer } from './resources/project';
import { sicknessInsuranceReducer } from './resources/sicknessInsurance';
import { socialInsuranceReducer } from './resources/socialInsurance';
import { taxReducer } from './resources/tax';
import { userReducer } from './resources/user';
import { globalReducer } from './resources/global';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  healthInsurance: healthInsuranceReducer,
  invoice: invoiceReducer,
  notification: notificationReducer,
  project: projectReducer,
  sicknessInsurance: sicknessInsuranceReducer,
  socialInsurance: socialInsuranceReducer,
  tax: taxReducer,
  user: userReducer,
});

export default (state, action) => globalReducer(
  reducers(state, action),
  action,
);
