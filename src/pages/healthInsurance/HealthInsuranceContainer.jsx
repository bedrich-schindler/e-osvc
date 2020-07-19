import { connect } from 'react-redux';
import {
  addHealthInsurance,
  deleteHealthInsurance,
  editHealthInsurance,
  getHealthInsurances,
  selectAddHealthInsuranceIsPending,
  selectDeleteHealthInsuranceIsPending,
  selectEditHealthInsuranceIsPending,
  selectGetHealthInsurances,
  selectGetHealthInsurancesIsPending,
} from '../../resources/healthInsurance';
import { selectIsOnline } from '../../resources/settings';
import Component from './HealthInsuranceComponent';

const mapStateToProps = (state) => ({
  addHealthInsuranceIsPending: selectAddHealthInsuranceIsPending(state),
  deleteHealthInsuranceIsPending: selectDeleteHealthInsuranceIsPending(state),
  editHealthInsuranceIsPending: selectEditHealthInsuranceIsPending(state),
  getHealthInsurancesIsPending: selectGetHealthInsurancesIsPending(state),
  healthInsurances: selectGetHealthInsurances(state),
  isOnline: selectIsOnline(state),
});

const mapDispatchToProps = (dispatch) => ({
  addHealthInsurance: (data) => dispatch(addHealthInsurance(data)),
  deleteHealthInsurance: (userId) => dispatch(deleteHealthInsurance(userId)),
  editHealthInsurance: (userId, data) => dispatch(editHealthInsurance(userId, data)),
  getHealthInsurances: () => dispatch(getHealthInsurances()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
