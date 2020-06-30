import { connect } from 'react-redux';
import {
  getInvoice,
  selectGetInvoice,
  selectGetInvoiceIsPending,
} from '../../resources/invoice';
import Component from './InvoiceDetailComponent';

const mapStateToProps = (state) => ({
  getInvoiceIsPending: selectGetInvoiceIsPending(state),
  invoice: selectGetInvoice(state),
});

const mapDispatchToProps = (dispatch) => ({
  getInvoice: (clientId) => dispatch(getInvoice(clientId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
