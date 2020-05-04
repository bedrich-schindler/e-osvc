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
  types: [
    actionTypes.API_PROJECT_ADD_REQUEST,
    actionTypes.API_PROJECT_ADD_SUCCESS,
    actionTypes.API_PROJECT_ADD_FAILURE,
  ],
});

export const deleteProject = (projectId) => createApiAction({
  endpoint: `/projects/${projectId}`,
  method: 'DELETE',
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
  types: [
    actionTypes.API_PROJECT_EDIT_REQUEST,
    actionTypes.API_PROJECT_EDIT_SUCCESS,
    actionTypes.API_PROJECT_EDIT_FAILURE,
  ],
});

export const getProject = (projectId) => createApiAction({
  endpoint: `/projects/${projectId}`,
  method: 'GET',
  types: [
    actionTypes.API_PROJECT_GET_REQUEST,
    actionTypes.API_PROJECT_GET_SUCCESS,
    actionTypes.API_PROJECT_GET_FAILURE,
  ],
});

export const getProjects = () => (dispatch, getState) => {
  const token = selectToken(getState());
  const { uid } = jwtDecode(token);

  return dispatch(createApiAction({
    endpoint: `/users/${uid}/projects`,
    method: 'GET',
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
  }));
};
