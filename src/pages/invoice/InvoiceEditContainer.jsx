import { connect } from 'react-redux';
import {
  getClients,
  selectGetClients,
  selectGetClientsIsPending,
} from '../../resources/client';
import {
  deleteInvoice,
  editInvoice,
  getInvoice,
  selectDeleteInvoiceIsPending,
  selectEditInvoiceIsPending,
  selectGetInvoice,
  selectGetInvoiceIsPending,
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
import Component from './InvoiceEditComponent';

const mapStateToProps = (state) => ({
  clients: selectGetClients(state),
  deleteInvoiceIsPending: selectDeleteInvoiceIsPending(state),
  editInvoiceIsPending: selectEditInvoiceIsPending(state),
  getClientsIsPending: selectGetClientsIsPending(state),
  getInvoiceIsPending: selectGetInvoiceIsPending(state),
  getProjectsIsPending: selectGetProjectsIsPending(state),
  getUserIsPending: selectGetUserIsPending(state),
  invoice: selectGetInvoice(state),
  projects: selectGetProjects(state),
  user: selectGetUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteInvoice: (invoiceId) => dispatch(deleteInvoice(invoiceId)),
  editInvoice: (invoiceId, data) => dispatch(editInvoice(invoiceId, data)),
  getClients: () => dispatch(getClients()),
  getInvoice: (invoiceId) => dispatch(getInvoice(invoiceId)),
  getProjects: () => dispatch(getProjects()),
  getUser: () => dispatch(getUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
