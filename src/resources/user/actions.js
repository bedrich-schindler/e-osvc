import { createApiAction } from '../../services/apiService';
import * as actionTypes from './actionTypes';

export const addUser = (data) => createApiAction({
  body: data,
  endpoint: '/users',
  method: 'POST',
  types: [
    actionTypes.API_USER_ADD_REQUEST,
    actionTypes.API_USER_ADD_SUCCESS,
    actionTypes.API_USER_ADD_FAILURE,
  ],
});
