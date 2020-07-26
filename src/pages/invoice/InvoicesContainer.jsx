import { connect } from 'react-redux';
import {
  getClients,
  selectGetClients,
  selectGetClientsIsPending,
} from '../../resources/client';
import {
  deleteInvoice,
  getInvoicesFiltered,
  selectDeleteInvoiceIsPending,
  selectGetInvoices,
  selectGetInvoicesIsPending,
} from '../../resources/invoice';
import {
  getProjects,
  selectGetProjects,
  selectGetProjectsIsPending,
} from '../../resources/project';
import { selectIsOnline } from '../../resources/settings';
import Component from './InvoicesComponent';

const mapStateToProps = (state) => ({
  clients: selectGetClients(state),
  deleteInvoiceIsPending: selectDeleteInvoiceIsPending(state),
  getClientsIsPending: selectGetClientsIsPending(state),
  getInvoicesIsPending: selectGetInvoicesIsPending(state),
  getProjectsIsPending: selectGetProjectsIsPending(state),
  invoices: selectGetInvoices(state),
  isOnline: selectIsOnline(state),
  projects: selectGetProjects(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteInvoice: (userId) => dispatch(deleteInvoice(userId)),
  getClients: () => dispatch(getClients()),
  getInvoicesFiltered: (options) => dispatch(getInvoicesFiltered(options)),
  getProjects: () => dispatch(getProjects()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
