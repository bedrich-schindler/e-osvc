import { connect } from 'react-redux';
import {
  deleteInvoice,
  getInvoices,
  selectDeleteInvoiceIsPending,
  selectGetInvoices,
  selectGetInvoicesIsPending,
} from '../../resources/invoice';
import { selectIsOnline } from '../../resources/settings';
import Component from './InvoicesComponent';

const mapStateToProps = (state) => ({
  deleteInvoiceIsPending: selectDeleteInvoiceIsPending(state),
  getInvoicesIsPending: selectGetInvoicesIsPending(state),
  invoices: selectGetInvoices(state),
  isOnline: selectIsOnline(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteInvoice: (userId) => dispatch(deleteInvoice(userId)),
  getInvoices: () => dispatch(getInvoices()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
