import { combineReducers } from 'redux-immutable';
import { authReducer } from './resources/auth';
import { clientReducer } from './resources/client';
import { healthInsuranceReducer } from './resources/healthInsurance';
import { invoiceReducer } from './resources/invoice';
import { notificationReducer } from './resources/notification';
import { projectReducer } from './resources/project';
import { settingsReducer } from './resources/settings';
import { sicknessInsuranceReducer } from './resources/sicknessInsurance';
import { socialInsuranceReducer } from './resources/socialInsurance';
import { statisticsReducer } from './resources/statistics';
import { taxReducer } from './resources/tax';
import { timeRecordReducer } from './resources/timeRecord';
import { userReducer } from './resources/user';
import { globalReducer } from './resources/global';

const reducers = combineReducers({
  auth: authReducer,
  client: clientReducer,
  healthInsurance: healthInsuranceReducer,
  invoice: invoiceReducer,
  notification: notificationReducer,
  project: projectReducer,
  settings: settingsReducer,
  sicknessInsurance: sicknessInsuranceReducer,
  socialInsurance: socialInsuranceReducer,
  statistics: statisticsReducer,
  tax: taxReducer,
  timeRecord: timeRecordReducer,
  user: userReducer,
});

export default (state, action) => globalReducer(
  reducers(state, action),
  action,
);
