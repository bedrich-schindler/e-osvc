import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

export const addClient = (data) => createApiAction({
  body: data,
  endpoint: '/clients',
  method: 'POST',
  types: [
    actionTypes.API_CLIENT_ADD_REQUEST,
    actionTypes.API_CLIENT_ADD_SUCCESS,
    actionTypes.API_CLIENT_ADD_FAILURE,
  ],
});

export const deleteClient = (clientId) => createApiAction({
  endpoint: `/clients/${clientId}`,
  method: 'DELETE',
  types: [
    actionTypes.API_CLIENT_DELETE_REQUEST,
    actionTypes.API_CLIENT_DELETE_SUCCESS,
    actionTypes.API_CLIENT_DELETE_FAILURE,
  ],
});

export const editClient = (clientId, data) => createApiAction({
  body: data,
  endpoint: `/clients/${clientId}`,
  method: 'PUT',
  types: [
    actionTypes.API_CLIENT_EDIT_REQUEST,
    actionTypes.API_CLIENT_EDIT_SUCCESS,
    actionTypes.API_CLIENT_EDIT_FAILURE,
  ],
});

export const getClient = (clientId) => createApiAction({
  endpoint: `/clients/${clientId}`,
  method: 'GET',
  types: [
    actionTypes.API_CLIENT_GET_REQUEST,
    actionTypes.API_CLIENT_GET_SUCCESS,
    actionTypes.API_CLIENT_GET_FAILURE,
  ],
});

export const getClients = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return dispatch(createApiAction({
    endpoint: `/users/${uid}/clients`,
    method: 'GET',
    types: [
      actionTypes.API_CLIENTS_GET_REQUEST,
      {
        meta: {
          dataPath: ['getClients'],
        },
        type: actionTypes.API_CLIENTS_GET_SUCCESS,
      },
      actionTypes.API_CLIENTS_GET_FAILURE,
    ],
  }));
};
