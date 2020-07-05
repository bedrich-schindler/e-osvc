import jwtDecode from 'jwt-decode';
import { createApiAction } from '../../services/apiService';
import { selectToken } from '../auth';
import * as actionTypes from './actionTypes';

export const addProject = (data) => createApiAction({
  body: {
    ...data,
    client: `/clients/${data.client.id}`,
  },
  endpoint: '/projects',
  method: 'POST',
  notificationMessages: {
    failure: 'Přidání projektu se nezdařilo.',
    success: 'Projekt byl úspěšně přidán.',
  },
  types: [
    actionTypes.API_PROJECT_ADD_REQUEST,
    actionTypes.API_PROJECT_ADD_SUCCESS,
    actionTypes.API_PROJECT_ADD_FAILURE,
  ],
});

export const deleteProject = (projectId) => createApiAction({
  endpoint: `/projects/${projectId}`,
  method: 'DELETE',
  notificationMessages: {
    failure: 'Smazání projektu se nezdařilo.',
    success: 'Projekt byl úspěšně smazán.',
  },
  types: [
    actionTypes.API_PROJECT_DELETE_REQUEST,
    actionTypes.API_PROJECT_DELETE_SUCCESS,
    actionTypes.API_PROJECT_DELETE_FAILURE,
  ],
});

export const editProject = (projectId, data) => createApiAction({
  body: {
    ...data,
    client: `/clients/${data.client.id}`,
  },
  endpoint: `/projects/${projectId}`,
  method: 'PUT',
  notificationMessages: {
    failure: 'Úprava projektu se nezdařila.',
    success: 'Projekt byl úspěšně upraven.',
  },
  types: [
    actionTypes.API_PROJECT_EDIT_REQUEST,
    actionTypes.API_PROJECT_EDIT_SUCCESS,
    actionTypes.API_PROJECT_EDIT_FAILURE,
  ],
});

export const getProject = (projectId) => createApiAction({
  endpoint: `/projects/${projectId}`,
  method: 'GET',
  notificationMessages: {
    failure: 'Získání detailu projektu se nezdařilo.',
  },
  types: [
    actionTypes.API_PROJECT_GET_REQUEST,
    actionTypes.API_PROJECT_GET_SUCCESS,
    actionTypes.API_PROJECT_GET_FAILURE,
  ],
});

export const getProjects = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return createApiAction({
    endpoint: `/users/${uid}/projects`,
    method: 'GET',
    notificationMessages: {
      failure: 'Získání výpisu projektů se nezdařilo.',
    },
    types: [
      actionTypes.API_PROJECTS_GET_REQUEST,
      {
        meta: {
          dataPath: ['getProjects'],
        },
        type: actionTypes.API_PROJECTS_GET_SUCCESS,
      },
      actionTypes.API_PROJECTS_GET_FAILURE,
    ],
  })(dispatch, getState);
};
