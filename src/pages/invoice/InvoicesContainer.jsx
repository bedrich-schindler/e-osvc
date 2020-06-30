import { connect } from 'react-redux';
import {
  deleteInvoice,
  getInvoices,
  selectDeleteInvoiceIsPending,
  selectGetInvoices,
  selectGetInvoicesIsPending,
} from '../../resources/invoice';
import Component from './InvoicesComponent';

const mapStateToProps = (state) => ({
  deleteInvoiceIsPending: selectDeleteInvoiceIsPending(state),
  getInvoicesIsPending: selectGetInvoicesIsPending(state),
  invoices: selectGetInvoices(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteInvoice: (userId) => dispatch(deleteInvoice(userId)),
  getInvoices: () => dispatch(getInvoices()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
