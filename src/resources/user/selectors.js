import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['user', 'apiActions']);
const getData = (state) => state.getIn(['user', 'data']);

export const selectAddUser = getDataSelector(getData, 'addUser');

export const selectAddUserIsPending = getIsPendingSelector(getApiActions, 'addUser');
