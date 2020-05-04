import { connect } from 'react-redux';
import {
  getClients,
  selectGetClients,
  selectGetClientsIsPending,
} from '../../resources/client';
import {
  addProject,
  deleteProject,
  editProject,
  getProjects,
  selectAddProjectIsPending,
  selectDeleteProjectIsPending,
  selectEditProjectIsPending,
  selectGetProjects,
  selectGetProjectsIsPending,
} from '../../resources/project';
import Component from './ProjectsComponent';

const mapStateToProps = (state) => ({
  addProjectIsPending: selectAddProjectIsPending(state),
  clients: selectGetClients(state),
  deleteProjectIsPending: selectDeleteProjectIsPending(state),
  editProjectIsPending: selectEditProjectIsPending(state),
  getClientsIsPending: selectGetClientsIsPending(state),
  getProjectsIsPending: selectGetProjectsIsPending(state),
  projects: selectGetProjects(state),
});

const mapDispatchToProps = (dispatch) => ({
  addProject: (data) => dispatch(addProject(data)),
  deleteProject: (userId) => dispatch(deleteProject(userId)),
  editProject: (userId, data) => dispatch(editProject(userId, data)),
  getClients: () => dispatch(getClients()),
  getProjects: () => dispatch(getProjects()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
