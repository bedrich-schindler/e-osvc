import { connect } from 'react-redux';
import {
  deleteInvoice,
  getInvoices,
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
  deleteInvoiceIsPending: selectDeleteInvoiceIsPending(state),
  getInvoicesIsPending: selectGetInvoicesIsPending(state),
  getProjectsIsPending: selectGetProjectsIsPending(state),
  invoices: selectGetInvoices(state),
  isOnline: selectIsOnline(state),
  projects: selectGetProjects(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteInvoice: (userId) => dispatch(deleteInvoice(userId)),
  getInvoices: () => dispatch(getInvoices()),
  getProjects: () => dispatch(getProjects()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
