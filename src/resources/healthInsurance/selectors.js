import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['healthInsurance', 'apiActions']);
const getData = (state) => state.getIn(['healthInsurance', 'data']);

export const selectAddHealthInsurance = getDataSelector(getData, 'addHealthInsurance');
export const selectDeleteHealthInsurance = getDataSelector(getData, 'deleteHealthInsurance');
export const selectEditHealthInsurance = getDataSelector(getData, 'editHealthInsurance');
export const selectGetHealthInsurance = getDataSelector(getData, 'getHealthInsurance');
export const selectGetHealthInsurances = getDataSelector(getData, 'getHealthInsurances');

export const selectAddHealthInsuranceIsPending = getIsPendingSelector(getApiActions, 'addHealthInsurance');
export const selectDeleteHealthInsuranceIsPending = getIsPendingSelector(getApiActions, 'deleteHealthInsurance');
export const selectEditHealthInsuranceIsPending = getIsPendingSelector(getApiActions, 'editHealthInsurance');
export const selectGetHealthInsuranceIsPending = getIsPendingSelector(getApiActions, 'getHealthInsurance');
export const selectGetHealthInsurancesIsPending = getIsPendingSelector(getApiActions, 'getHealthInsurances');
