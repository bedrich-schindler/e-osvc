import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

export const addUser = (data) => createApiAction({
  body: {
    ...data,
    cidNumber: parseInt(data.cidNumber, 10),
    postalCode: parseInt(data.postalCode, 10),
    taxNumber: data.taxNumber.length > 0 ? parseInt(data.taxNumber, 10) : null,
  },
  endpoint: '/users',
  method: 'POST',
  types: [
    actionTypes.API_USER_ADD_REQUEST,
    actionTypes.API_USER_ADD_SUCCESS,
    actionTypes.API_USER_ADD_FAILURE,
  ],
});

export const editUser = (data) => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    body: {
      ...data,
      cidNumber: parseInt(data.cidNumber, 10),
      id: uid,
      postalCode: parseInt(data.postalCode, 10),
      taxNumber: data.taxNumber?.length > 0 ? parseInt(data.taxNumber, 10) : null,
    },
    endpoint: `/users/${uid}`,
    method: 'PUT',
    notificationMessages: {
      failure: 'Uložení účtu se nezdařilo.',
      success: 'Účet byl úspěšně změněn.',
    },
    types: [
      actionTypes.API_USER_EDIT_REQUEST,
      actionTypes.API_USER_EDIT_SUCCESS,
      actionTypes.API_USER_EDIT_FAILURE,
    ],
  })(dispatch, getState);
}

export const editUserNotifications = (userNotificationsId, data) => createApiAction({
  body: data,
  endpoint: `/user_notifications/${userNotificationsId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Uložení nastavení se nezdařilo.',
    success: 'Nastavení bylo úspěšně uloženo.',
  },
  types: [
    actionTypes.API_USER_NOTIFICATIONS_EDIT_REQUEST,
    actionTypes.API_USER_NOTIFICATIONS_EDIT_SUCCESS,
    actionTypes.API_USER_NOTIFICATIONS_EDIT_FAILURE,
  ],
});

export const getUser = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}`,
    method: 'GET',
    types: [
      actionTypes.API_USER_GET_REQUEST,
      {
        meta: {
          dataPath: ['getUser'],
        },
        type: actionTypes.API_USER_GET_SUCCESS,
      },
      actionTypes.API_USER_GET_FAILURE,
    ],
  })(dispatch, getState);
};
