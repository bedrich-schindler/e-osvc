import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['project', 'apiActions']);
const getData = (state) => state.getIn(['project', 'data']);

export const selectAddProject = getDataSelector(getData, 'addProject');
export const selectDeleteProject = getDataSelector(getData, 'deleteProject');
export const selectEditProject = getDataSelector(getData, 'editProject');
export const selectGetProject = getDataSelector(getData, 'getProject');
export const selectGetProjects = getDataSelector(getData, 'getProjects');

export const selectAddProjectIsPending = getIsPendingSelector(getApiActions, 'addProject');
export const selectDeleteProjectIsPending = getIsPendingSelector(getApiActions, 'deleteProject');
export const selectEditProjectIsPending = getIsPendingSelector(getApiActions, 'editProject');
export const selectGetProjectIsPending = getIsPendingSelector(getApiActions, 'getProject');
export const selectGetProjectsIsPending = getIsPendingSelector(getApiActions, 'getProjects');
