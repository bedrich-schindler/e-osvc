import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

export const getStatistics = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/statistics`,
    method: 'GET',
    types: [
      actionTypes.API_STATISTICS_GET_SUCCESS,
      {
        meta: {
          dataPath: ['getStatistics'],
        },
        type: actionTypes.API_STATISTICS_GET_SUCCESS,
      },
      actionTypes.API_STATISTICS_GET_FAILURE,
    ],
  })(dispatch, getState);
};
