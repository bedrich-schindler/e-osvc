import { connect } from 'react-redux';
import {
  deleteInvoice,
  getInvoice,
  selectDeleteInvoiceIsPending,
  selectGetInvoice,
  selectGetInvoiceIsPending,
} from '../../resources/invoice';
import { selectIsOnline } from '../../resources/settings';
import Component from './InvoiceDetailComponent';

const mapStateToProps = (state) => ({
  deleteInvoiceIsPending: selectDeleteInvoiceIsPending(state),
  getInvoiceIsPending: selectGetInvoiceIsPending(state),
  invoice: selectGetInvoice(state),
  isOnline: selectIsOnline(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteInvoice: (userId) => dispatch(deleteInvoice(userId)),
  getInvoice: (clientId) => dispatch(getInvoice(clientId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
