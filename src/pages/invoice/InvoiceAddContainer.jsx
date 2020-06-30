import { connect } from 'react-redux';
import {
  getClients,
  selectGetClients,
  selectGetClientsIsPending,
} from '../../resources/client';
import {
  addInvoice,
  selectAddInvoiceIsPending,
} from '../../resources/invoice';
import {
  getProjects,
  selectGetProjects,
  selectGetProjectsIsPending,
} from '../../resources/project';
import {
  getUser,
  selectGetUser,
  selectGetUserIsPending,
} from '../../resources/user';
import Component from './InvoiceAddComponent';

const mapStateToProps = (state) => ({
  addInvoiceIsPending: selectAddInvoiceIsPending(state),
  clients: selectGetClients(state),
  getClientsIsPending: selectGetClientsIsPending(state),
  getProjectsIsPending: selectGetProjectsIsPending(state),
  getUserIsPending: selectGetUserIsPending(state),
  projects: selectGetProjects(state),
  user: selectGetUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addInvoice(data)),
  getClients: () => dispatch(getClients()),
  getProjects: () => dispatch(getProjects()),
  getUser: () => dispatch(getUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
