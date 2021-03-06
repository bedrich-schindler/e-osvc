import { notificationsReset } from '../notification';
import {
  resetIsTimerVisible,
  resetTimer,
} from '../timeRecord';
import { createApiAction } from '../../services/apiService';
import { selectToken } from './selectors';
import {
  removeTokenFromStorage,
  storeTokenToStorage,
} from './storage';
import * as actionTypes from './actionTypes';

export const login = (username, password) => async (dispatch, getState) => {
  const action = await createApiAction({
    body: {
      password,
      username,
    },
    endpoint: '/auth',
    method: 'POST',
    types: [
      actionTypes.API_LOGIN_REQUEST,
      actionTypes.API_LOGIN_SUCCESS,
      actionTypes.API_LOGIN_FAILURE,
    ],
  })(dispatch, getState);

  // Reset notifications
  dispatch(notificationsReset());

  if (action.type === actionTypes.API_LOGIN_SUCCESS) {
    storeTokenToStorage(selectToken(getState()));
  } else if (action.action === actionTypes.API_LOGIN_FAILURE) {
    removeTokenFromStorage();
  }

  return action;
};

export const logout = () => async (dispatch) => {
  const action = await dispatch({
    type: actionTypes.LOCAL_LOGOUT,
  });

  // Delete cached API requests
  await window.caches.delete('webpack-offline:e-osvc-api');

  // Reset notifications
  dispatch(notificationsReset());

  // Reset other resources
  dispatch(resetIsTimerVisible());
  dispatch(resetTimer());

  removeTokenFromStorage();

  return action;
};
