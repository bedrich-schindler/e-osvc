import { createApiAction } from '../../services/apiService';
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
