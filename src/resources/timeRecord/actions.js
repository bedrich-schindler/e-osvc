import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';
import {
  removeIsTimerVisibleFromStorage,
  removeTimerFromStorage,
  storeIsTimerVisibleToStorage,
  storeTimerToStorage,
} from './storage';

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

export const getTimeRecordsFiltered = (filter = null) => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  let queryString = '';
  if (filter) {
    let projectIdsString = '';
    let invoiceIdString = '';

    if (filter.projectIds) {
      projectIdsString = filter.projectIds
        .map((projectId) => `project.id[]=${projectId}`)
        .join('&');
    }

    if (filter.invoiceId) {
      invoiceIdString = `in_or_null_invoice[]=${filter.invoiceId}`;
    } else {
      invoiceIdString = 'in_or_null_invoice[]';
    }

    queryString = `?owner.id=${uid}&${projectIdsString}&${invoiceIdString}`;
  } else {
    queryString = `?owner.id=${uid}`;
  }

  return createApiAction({
    endpoint: `/time_records${queryString}`,
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

export const resetIsTimerVisible = () => (dispatch) => new Promise((resolve) => {
  const request = {
    meta: { dataPath: ['isTimerVisible'] },
    type: actionTypes.LOCAL_IS_TIMER_VISIBLE_RESET,
  };

  dispatch(request);
  resolve(request);
}).then((response) => {
  removeIsTimerVisibleFromStorage();

  return response;
});

export const resetTimer = () => (dispatch) => new Promise((resolve) => {
  const request = {
    meta: { dataPath: ['timer'] },
    type: actionTypes.LOCAL_TIMER_RESET,
  };

  dispatch(request);
  resolve(request);
}).then((response) => {
  removeTimerFromStorage();

  return response;
});

export const setIsTimerVisible = (data) => (dispatch) => new Promise((resolve) => {
  const request = {
    meta: { dataPath: ['isTimerVisible'] },
    payload: data,
    type: actionTypes.LOCAL_IS_TIMER_VISIBLE_SET,
  };

  dispatch(request);
  resolve(request);
}).then((response) => {
  storeIsTimerVisibleToStorage(data);

  return response;
});

export const setTimer = (data) => (dispatch) => new Promise((resolve) => {
  const request = {
    meta: { dataPath: ['timer'] },
    payload: data,
    type: actionTypes.LOCAL_TIMER_SET,
  };

  dispatch(request);
  resolve(request);
}).then((response) => {
  storeTimerToStorage(data);

  return response;
});
