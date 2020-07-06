import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

const prepareTaxBody = (data) => ({
  ...data,
  amount: parseFloat(data.amount),
  date: data.date.toJSON(),
});

export const addTax = (data) => createApiAction({
  body: prepareTaxBody(data),
  endpoint: '/taxes',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání daně se nezdařilo.',
    success: 'Daň byla úspěšně přidána.',
  },
  types: [
    actionTypes.API_TAX_ADD_REQUEST,
    actionTypes.API_TAX_ADD_SUCCESS,
    actionTypes.API_TAX_ADD_FAILURE,
  ],
});

export const deleteTax = (taxId) => createApiAction({
  endpoint: `/taxes/${taxId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání daňe se nezdařilo.',
    success: 'Daň byla úspěšně smazána.',
  },
  types: [
    actionTypes.API_TAX_DELETE_REQUEST,
    actionTypes.API_TAX_DELETE_SUCCESS,
    actionTypes.API_TAX_DELETE_FAILURE,
  ],
});

export const editTax = (taxId, data) => createApiAction({
  body: prepareTaxBody(data),
  endpoint: `/taxes/${taxId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava daně se nezdařila.',
    success: 'Daň byla úspěšně upravena.',
  },
  types: [
    actionTypes.API_TAX_EDIT_REQUEST,
    actionTypes.API_TAX_EDIT_SUCCESS,
    actionTypes.API_TAX_EDIT_FAILURE,
  ],
});

export const getTax = (taxId) => createApiAction({
  endpoint: `/taxes/${taxId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu daně se nezdařilo.',
  },
  types: [
    actionTypes.API_TAXES_GET_REQUEST,
    actionTypes.API_TAXES_GET_SUCCESS,
    actionTypes.API_TAXES_GET_FAILURE,
  ],
});

export const getTaxes = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/taxes`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu daní se nezdařilo.',
    },
    types: [
      actionTypes.API_TAXES_GET_REQUEST,
      {
        meta: {
          dataPath: ['getTaxes'],
          dataTransformer: (data) => data.map((item) => ({
            ...item,
            date: new Date(item.date),
          })),
        },
        type: actionTypes.API_TAXES_GET_SUCCESS,
      },
      actionTypes.API_TAXES_GET_FAILURE,
    ],
  })(dispatch, getState);
};
