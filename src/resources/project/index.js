export {
  addProject,
  deleteProject,
  editProject,
  getProject,
  getProjects,
} from './actions';

export { default as projectReducer } from './reducer';

export {
  selectAddProject,
  selectAddProjectIsPending,
  selectDeleteProject,
  selectDeleteProjectIsPending,
  selectEditProject,
  selectEditProjectIsPending,
  selectGetProject,
  selectGetProjectIsPending,
  selectGetProjects,
  selectGetProjectsIsPending,
} from './selectors';
