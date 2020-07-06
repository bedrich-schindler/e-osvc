import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['tax', 'apiActions']);
const getData = (state) => state.getIn(['tax', 'data']);

export const selectAddTax = getDataSelector(getData, 'addTax');
export const selectDeleteTax = getDataSelector(getData, 'deleteTax');
export const selectEditTax = getDataSelector(getData, 'editTax');
export const selectGetTax = getDataSelector(getData, 'getTax');
export const selectGetTaxes = getDataSelector(getData, 'getTaxes');

export const selectAddTaxIsPending = getIsPendingSelector(getApiActions, 'addTax');
export const selectDeleteTaxIsPending = getIsPendingSelector(getApiActions, 'deleteTax');
export const selectEditTaxIsPending = getIsPendingSelector(getApiActions, 'editTax');
export const selectGetTaxIsPending = getIsPendingSelector(getApiActions, 'getTax');
export const selectGetTaxesIsPending = getIsPendingSelector(getApiActions, 'getTaxes');
