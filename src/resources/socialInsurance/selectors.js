import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['socialInsurance', 'apiActions']);
const getData = (state) => state.getIn(['socialInsurance', 'data']);

export const selectAddSocialInsurance = getDataSelector(getData, 'addSocialInsurance');
export const selectDeleteSocialInsurance = getDataSelector(getData, 'deleteSocialInsurance');
export const selectEditSocialInsurance = getDataSelector(getData, 'editSocialInsurance');
export const selectGetSocialInsurance = getDataSelector(getData, 'getSocialInsurance');
export const selectGetSocialInsurances = getDataSelector(getData, 'getSocialInsurances');

export const selectAddSocialInsuranceIsPending = getIsPendingSelector(getApiActions, 'addSocialInsurance');
export const selectDeleteSocialInsuranceIsPending = getIsPendingSelector(getApiActions, 'deleteSocialInsurance');
export const selectEditSocialInsuranceIsPending = getIsPendingSelector(getApiActions, 'editSocialInsurance');
export const selectGetSocialInsuranceIsPending = getIsPendingSelector(getApiActions, 'getSocialInsurance');
export const selectGetSocialInsurancesIsPending = getIsPendingSelector(getApiActions, 'getSocialInsurances');
