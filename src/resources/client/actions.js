import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

export const addClient = (data) => createApiAction({
  body: {
    ...data,
    cidNumber: data.cidNumber.length > 0 ? parseInt(data.cidNumber, 10) : null,
    postalCode: parseInt(data.postalCode, 10),
    taxNumber: data.taxNumber.length > 0 ? parseInt(data.taxNumber, 10) : null,
  },
  endpoint: '/clients',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání klienta se nezdařilo.',
    success: 'Klient byl úspěšně přidán.',
  },
  types: [
    actionTypes.API_CLIENT_ADD_REQUEST,
    actionTypes.API_CLIENT_ADD_SUCCESS,
    actionTypes.API_CLIENT_ADD_FAILURE,
  ],
});

export const deleteClient = (clientId) => createApiAction({
  endpoint: `/clients/${clientId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání klienta se nezdařilo.',
    success: 'Klient byl úspěšně smazán.',
  },
  types: [
    actionTypes.API_CLIENT_DELETE_REQUEST,
    actionTypes.API_CLIENT_DELETE_SUCCESS,
    actionTypes.API_CLIENT_DELETE_FAILURE,
  ],
});

export const editClient = (clientId, data) => createApiAction({
  body: {
    ...data,
    cidNumber: data.cidNumber.length > 0 ? parseInt(data.cidNumber, 10) : null,
    postalCode: parseInt(data.postalCode, 10),
    taxNumber: data.taxNumber.length > 0 ? parseInt(data.taxNumber, 10) : null,
  },
  endpoint: `/clients/${clientId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava klienta se nezdařila.',
    success: 'Klient byl úspěšně upraven.',
  },
  types: [
    actionTypes.API_CLIENT_EDIT_REQUEST,
    actionTypes.API_CLIENT_EDIT_SUCCESS,
    actionTypes.API_CLIENT_EDIT_FAILURE,
  ],
});

export const getClient = (clientId) => createApiAction({
  endpoint: `/clients/${clientId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu klienta se nezdařilo.',
  },
  types: [
    actionTypes.API_CLIENT_GET_REQUEST,
    actionTypes.API_CLIENT_GET_SUCCESS,
    actionTypes.API_CLIENT_GET_FAILURE,
  ],
});

export const getClients = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/clients`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu klientů se nezdařilo.',
    },
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
  })(dispatch, getState);
};
