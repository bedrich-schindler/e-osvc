import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['user', 'apiActions']);
const getData = (state) => state.getIn(['user', 'data']);

export const selectAddUser = getDataSelector(getData, 'addUser');
export const selectEditUser = getDataSelector(getData, 'editUser');
export const selectGetUser = getDataSelector(getData, 'getUser');

export const selectAddUserIsPending = getIsPendingSelector(getApiActions, 'addUser');
export const selectEditUserIsPending = getIsPendingSelector(getApiActions, 'editUser');
export const selectEditUserNotificationsIsPending = getIsPendingSelector(getApiActions, 'editUserNotifications');
export const selectGetUserIsPending = getIsPendingSelector(getApiActions, 'getUser');
