import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

const prepareSocialInsuranceBody = (data) => ({
  ...data,
  amount: parseFloat(data.amount),
  date: data.date.toJSON(),
});

export const addSocialInsurance = (data) => createApiAction({
  body: prepareSocialInsuranceBody(data),
  endpoint: '/social_insurances',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání sociálního pojištění se nezdařilo.',
    success: 'Sociální pojištění bylo úspěšně přidáno.',
  },
  types: [
    actionTypes.API_SOCIAL_INSURANCE_ADD_REQUEST,
    actionTypes.API_SOCIAL_INSURANCE_ADD_SUCCESS,
    actionTypes.API_SOCIAL_INSURANCE_ADD_FAILURE,
  ],
});

export const deleteSocialInsurance = (socialInsuranceId) => createApiAction({
  endpoint: `/social_insurances/${socialInsuranceId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání sociálního pojištění se nezdařilo.',
    success: 'Sociální pojištění bylo úspěšně smazáno.',
  },
  types: [
    actionTypes.API_SOCIAL_INSURANCE_DELETE_REQUEST,
    actionTypes.API_SOCIAL_INSURANCE_DELETE_SUCCESS,
    actionTypes.API_SOCIAL_INSURANCE_DELETE_FAILURE,
  ],
});

export const editSocialInsurance = (socialInsuranceId, data) => createApiAction({
  body: prepareSocialInsuranceBody(data),
  endpoint: `/social_insurances/${socialInsuranceId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava sociálního pojištění se nezdařila.',
    success: 'Sociální pojištění bylo úspěšně upraveno.',
  },
  types: [
    actionTypes.API_SOCIAL_INSURANCE_EDIT_REQUEST,
    actionTypes.API_SOCIAL_INSURANCE_EDIT_SUCCESS,
    actionTypes.API_SOCIAL_INSURANCE_EDIT_FAILURE,
  ],
});

export const getSocialInsurance = (socialInsuranceId) => createApiAction({
  endpoint: `/social_insurances/${socialInsuranceId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu sociálního pojištění se nezdařilo.',
  },
  types: [
    actionTypes.API_SOCIAL_INSURANCE_GET_REQUEST,
    actionTypes.API_SOCIAL_INSURANCE_GET_SUCCESS,
    actionTypes.API_SOCIAL_INSURANCE_GET_FAILURE,
  ],
});

export const getSocialInsurances = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/social_insurances`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu sociálních pojištění se nezdařilo.',
    },
    types: [
      actionTypes.API_SOCIAL_INSURANCES_GET_REQUEST,
      {
        meta: {
          dataPath: ['getSocialInsurances'],
          dataTransformer: (data) => data.map((item) => ({
            ...item,
            date: new Date(item.date),
          })),
        },
        type: actionTypes.API_SOCIAL_INSURANCES_GET_SUCCESS,
      },
      actionTypes.API_SOCIAL_INSURANCES_GET_FAILURE,
    ],
  })(dispatch, getState);
};
