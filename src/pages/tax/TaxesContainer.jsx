import { connect } from 'react-redux';
import {
  addTax,
  deleteTax,
  editTax,
  getTaxes,
  selectAddTaxIsPending,
  selectDeleteTaxIsPending,
  selectEditTaxIsPending,
  selectGetTaxes,
  selectGetTaxesIsPending,
} from '../../resources/tax';
import Component from './TaxesComponent';

const mapStateToProps = (state) => ({
  addTaxIsPending: selectAddTaxIsPending(state),
  deleteTaxIsPending: selectDeleteTaxIsPending(state),
  editTaxIsPending: selectEditTaxIsPending(state),
  getTaxesIsPending: selectGetTaxesIsPending(state),
  taxes: selectGetTaxes(state),
});

const mapDispatchToProps = (dispatch) => ({
  addTax: (data) => dispatch(addTax(data)),
  deleteTax: (userId) => dispatch(deleteTax(userId)),
  editTax: (userId, data) => dispatch(editTax(userId, data)),
  getTaxes: () => dispatch(getTaxes()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
