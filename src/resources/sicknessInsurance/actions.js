import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

const prepareSicknessInsuranceBody = (data) => ({
  ...data,
  amount: parseFloat(data.amount),
  date: data.date.toJSON(),
});

export const addSicknessInsurance = (data) => createApiAction({
  body: prepareSicknessInsuranceBody(data),
  endpoint: '/sickness_insurances',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání nemocenského pojištění se nezdařilo.',
    success: 'Nemocenské pojištění bylo úspěšně přidáno.',
  },
  types: [
    actionTypes.API_SICKNESS_INSURANCE_ADD_REQUEST,
    actionTypes.API_SICKNESS_INSURANCE_ADD_SUCCESS,
    actionTypes.API_SICKNESS_INSURANCE_ADD_FAILURE,
  ],
});

export const deleteSicknessInsurance = (sicknessInsuranceId) => createApiAction({
  endpoint: `/sickness_insurances/${sicknessInsuranceId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání nemocenského pojištění se nezdařilo.',
    success: 'Nemocenské pojištění bylo úspěšně smazáno.',
  },
  types: [
    actionTypes.API_SICKNESS_INSURANCE_DELETE_REQUEST,
    actionTypes.API_SICKNESS_INSURANCE_DELETE_SUCCESS,
    actionTypes.API_SICKNESS_INSURANCE_DELETE_FAILURE,
  ],
});

export const editSicknessInsurance = (sicknessInsuranceId, data) => createApiAction({
  body: prepareSicknessInsuranceBody(data),
  endpoint: `/sickness_insurances/${sicknessInsuranceId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava nemocenského pojištění se nezdařila.',
    success: 'Nemocenské pojištění bylo úspěšně upraveno.',
  },
  types: [
    actionTypes.API_SICKNESS_INSURANCE_EDIT_REQUEST,
    actionTypes.API_SICKNESS_INSURANCE_EDIT_SUCCESS,
    actionTypes.API_SICKNESS_INSURANCE_EDIT_FAILURE,
  ],
});

export const getSicknessInsurance = (sicknessInsuranceId) => createApiAction({
  endpoint: `/sickness_insurances/${sicknessInsuranceId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu nemocenského pojištění se nezdařilo.',
  },
  types: [
    actionTypes.API_SICKNESS_INSURANCE_GET_REQUEST,
    actionTypes.API_SICKNESS_INSURANCE_GET_SUCCESS,
    actionTypes.API_SICKNESS_INSURANCE_GET_FAILURE,
  ],
});

export const getSicknessInsurances = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/sickness_insurances`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu nemocenských pojištění se nezdařilo.',
    },
    types: [
      actionTypes.API_SICKNESS_INSURANCES_GET_REQUEST,
      {
        meta: {
          dataPath: ['getSicknessInsurances'],
          dataTransformer: (data) => data.map((item) => ({
            ...item,
            date: new Date(item.date),
          })),
        },
        type: actionTypes.API_SICKNESS_INSURANCES_GET_SUCCESS,
      },
      actionTypes.API_SICKNESS_INSURANCES_GET_FAILURE,
    ],
  })(dispatch, getState);
};
