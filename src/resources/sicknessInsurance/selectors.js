import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['sicknessInsurance', 'apiActions']);
const getData = (state) => state.getIn(['sicknessInsurance', 'data']);

export const selectAddSicknessInsurance = getDataSelector(getData, 'addSicknessInsurance');
export const selectDeleteSicknessInsurance = getDataSelector(getData, 'deleteSicknessInsurance');
export const selectEditSicknessInsurance = getDataSelector(getData, 'editSicknessInsurance');
export const selectGetSicknessInsurance = getDataSelector(getData, 'getSicknessInsurance');
export const selectGetSicknessInsurances = getDataSelector(getData, 'getSicknessInsurances');

export const selectAddSicknessInsuranceIsPending = getIsPendingSelector(getApiActions, 'addSicknessInsurance');
export const selectDeleteSicknessInsuranceIsPending = getIsPendingSelector(getApiActions, 'deleteSicknessInsurance');
export const selectEditSicknessInsuranceIsPending = getIsPendingSelector(getApiActions, 'editSicknessInsurance');
export const selectGetSicknessInsuranceIsPending = getIsPendingSelector(getApiActions, 'getSicknessInsurance');
export const selectGetSicknessInsurancesIsPending = getIsPendingSelector(getApiActions, 'getSicknessInsurances');
