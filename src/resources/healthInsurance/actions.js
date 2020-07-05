import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

const prepareHealthInsuranceBody = (data) => ({
  ...data,
  amount: parseFloat(data.amount),
  date: data.date.toJSON(),
});

export const addHealthInsurance = (data) => createApiAction({
  body: prepareHealthInsuranceBody(data),
  endpoint: '/health_insurances',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání zdravotního pojištění se nezdařilo.',
    success: 'Zdravotní pojištění bylo úspěšně přidáno.',
  },
  types: [
    actionTypes.API_HEALTH_INSURANCE_ADD_REQUEST,
    actionTypes.API_HEALTH_INSURANCE_ADD_SUCCESS,
    actionTypes.API_HEALTH_INSURANCE_ADD_FAILURE,
  ],
});

export const deleteHealthInsurance = (healthInsuranceId) => createApiAction({
  endpoint: `/health_insurances/${healthInsuranceId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání zdravotního pojištění se nezdařilo.',
    success: 'Zdravotní pojištění bylo úspěšně smazáno.',
  },
  types: [
    actionTypes.API_HEALTH_INSURANCE_DELETE_REQUEST,
    actionTypes.API_HEALTH_INSURANCE_DELETE_SUCCESS,
    actionTypes.API_HEALTH_INSURANCE_DELETE_FAILURE,
  ],
});

export const editHealthInsurance = (healthInsuranceId, data) => createApiAction({
  body: prepareHealthInsuranceBody(data),
  endpoint: `/health_insurances/${healthInsuranceId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava zdravotního pojištění se nezdařila.',
    success: 'Zdravotní pojištění bylo úspěšně upraveno.',
  },
  types: [
    actionTypes.API_HEALTH_INSURANCE_EDIT_REQUEST,
    actionTypes.API_HEALTH_INSURANCE_EDIT_SUCCESS,
    actionTypes.API_HEALTH_INSURANCE_EDIT_FAILURE,
  ],
});

export const getHealthInsurance = (healthInsuranceId) => createApiAction({
  endpoint: `/health_insurances/${healthInsuranceId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu zdravotního pojištění se nezdařilo.',
  },
  types: [
    actionTypes.API_HEALTH_INSURANCE_GET_REQUEST,
    actionTypes.API_HEALTH_INSURANCE_GET_SUCCESS,
    actionTypes.API_HEALTH_INSURANCE_GET_FAILURE,
  ],
});

export const getHealthInsurances = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/health_insurances`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu zdravotních pojištění se nezdařilo.',
    },
    types: [
      actionTypes.API_HEALTH_INSURANCES_GET_REQUEST,
      {
        meta: {
          dataPath: ['getHealthInsurances'],
          dataTransformer: (data) => data.map((item) => ({
            ...item,
            date: new Date(item.date),
          })),
        },
        type: actionTypes.API_HEALTH_INSURANCES_GET_SUCCESS,
      },
      actionTypes.API_HEALTH_INSURANCES_GET_FAILURE,
    ],
  })(dispatch, getState);
};
