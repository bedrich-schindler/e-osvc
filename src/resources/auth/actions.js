import { createApiAction } from '../../services/apiService';
import { selectToken } from './selectors';
import {
  removeTokenFromStorage,
  storeTokenToStorage,
} from './storage';
import * as actionTypes from './actionTypes';

export const login = (username, password) => async (dispatch, getState) => {
  const action = await dispatch(createApiAction({
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
  }));

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

  removeTokenFromStorage();

  return action;
};
