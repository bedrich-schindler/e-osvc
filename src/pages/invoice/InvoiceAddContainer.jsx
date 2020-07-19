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
import { selectIsOnline } from '../../resources/settings';
import {
  getTimeRecordsFiltered,
  selectGetTimeRecords,
  selectGetTimeRecordsIsPending,
} from '../../resources/timeRecord';
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
  getTimeRecordsIsPending: selectGetTimeRecordsIsPending(state),
  getUserIsPending: selectGetUserIsPending(state),
  isOnline: selectIsOnline(state),
  projects: selectGetProjects(state),
  timeRecords: selectGetTimeRecords(state),
  user: selectGetUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  addInvoice: (data) => dispatch(addInvoice(data)),
  getClients: () => dispatch(getClients()),
  getProjects: () => dispatch(getProjects()),
  getTimeRecordsFiltered: (options) => dispatch(getTimeRecordsFiltered(options)),
  getUser: () => dispatch(getUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
