import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

const prepareTimeRecordBody = (data) => ({
  ...data,
  endDateTime: data.endDateTime.toJSON(),
  project: `/projects/${data.project.id}`,
  startDateTime: data.startDateTime.toJSON(),
});

export const addTimeRecord = (data) => createApiAction({
  body: prepareTimeRecordBody(data),
  endpoint: '/time_records',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání odpracovanéno času se nezdařilo.',
    success: 'Odpracovaný čas byl úspěšně přidán.',
  },
  types: [
    actionTypes.API_TIME_RECORD_ADD_REQUEST,
    actionTypes.API_TIME_RECORD_ADD_SUCCESS,
    actionTypes.API_TIME_RECORD_ADD_FAILURE,
  ],
});

export const deleteTimeRecord = (timeRecordId) => createApiAction({
  endpoint: `/time_records/${timeRecordId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání odpracovanéno času se nezdařilo.',
    success: 'Odpracovaný čas byl úspěšně smazán.',
  },
  types: [
    actionTypes.API_TIME_RECORD_DELETE_REQUEST,
    actionTypes.API_TIME_RECORD_DELETE_SUCCESS,
    actionTypes.API_TIME_RECORD_DELETE_FAILURE,
  ],
});

export const editTimeRecord = (timeRecordId, data) => createApiAction({
  body: prepareTimeRecordBody(data),
  endpoint: `/time_records/${timeRecordId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava odpracovanéno času se nezdařila.',
    success: 'Odpracovaný čas byl úspěšně upraven.',
  },
  types: [
    actionTypes.API_TIME_RECORD_EDIT_REQUEST,
    actionTypes.API_TIME_RECORD_EDIT_SUCCESS,
    actionTypes.API_TIME_RECORD_EDIT_FAILURE,
  ],
});

export const getTimeRecord = (timeRecordId) => createApiAction({
  endpoint: `/time_records/${timeRecordId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu odpracovaného času se nezdařilo.',
  },
  types: [
    actionTypes.API_TIME_RECORD_GET_REQUEST,
    actionTypes.API_TIME_RECORD_GET_SUCCESS,
    actionTypes.API_TIME_RECORD_GET_FAILURE,
  ],
});

export const getTimeRecords = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/time_records`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu odpracovaných časů se nezdařilo.',
    },
    types: [
      actionTypes.API_TIME_RECORDS_GET_REQUEST,
      {
        meta: {
          dataPath: ['getTimeRecords'],
          dataTransformer: (data) => data.map((item) => ({
            ...item,
            endDateTime: new Date(item.endDateTime),
            startDateTime: new Date(item.startDateTime),
          })),
        },
        type: actionTypes.API_TIME_RECORDS_GET_SUCCESS,
      },
      actionTypes.API_TIME_RECORDS_GET_FAILURE,
    ],
  })(dispatch, getState);
};
