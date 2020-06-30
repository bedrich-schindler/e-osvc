import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['invoice', 'apiActions']);
const getData = (state) => state.getIn(['invoice', 'data']);

export const selectAddInvoice = getDataSelector(getData, 'addInvoice');
export const selectDeleteInvoice = getDataSelector(getData, 'deleteInvoice');
export const selectEditInvoice = getDataSelector(getData, 'editInvoice');
export const selectGetInvoice = getDataSelector(getData, 'getInvoice');
export const selectGetInvoices = getDataSelector(getData, 'getInvoices');

export const selectAddInvoiceIsPending = getIsPendingSelector(getApiActions, 'addInvoice');
export const selectDeleteInvoiceIsPending = getIsPendingSelector(getApiActions, 'deleteInvoice');
export const selectEditInvoiceIsPending = getIsPendingSelector(getApiActions, 'editInvoice');
export const selectGetInvoiceIsPending = getIsPendingSelector(getApiActions, 'getInvoice');
export const selectGetInvoicesIsPending = getIsPendingSelector(getApiActions, 'getInvoices');
