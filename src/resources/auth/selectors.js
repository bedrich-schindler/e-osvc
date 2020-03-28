import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['auth', 'apiActions']);
const getData = (state) => state.getIn(['auth', 'data']);

export const selectToken = getDataSelector(getData, 'token');

export const selectLoginIsPending = getIsPendingSelector(getApiActions, 'login');
