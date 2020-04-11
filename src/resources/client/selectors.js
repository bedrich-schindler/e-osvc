import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['client', 'apiActions']);
const getData = (state) => state.getIn(['client', 'data']);

export const selectAddClient = getDataSelector(getData, 'addClient');
export const selectDeleteClient = getDataSelector(getData, 'deleteClient');
export const selectEditClient = getDataSelector(getData, 'editClient');
export const selectGetClient = getDataSelector(getData, 'getClient');
export const selectGetClients = getDataSelector(getData, 'getClients');

export const selectAddClientIsPending = getIsPendingSelector(getApiActions, 'addClient');
export const selectDeleteClientIsPending = getIsPendingSelector(getApiActions, 'deleteClient');
export const selectEditClientIsPending = getIsPendingSelector(getApiActions, 'editClient');
export const selectGetClientIsPending = getIsPendingSelector(getApiActions, 'getClient');
export const selectGetClientsIsPending = getIsPendingSelector(getApiActions, 'getClients');
