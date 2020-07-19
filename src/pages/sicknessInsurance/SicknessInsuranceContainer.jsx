import { connect } from 'react-redux';
import {
  addSicknessInsurance,
  deleteSicknessInsurance,
  editSicknessInsurance,
  getSicknessInsurances,
  selectAddSicknessInsuranceIsPending,
  selectDeleteSicknessInsuranceIsPending,
  selectEditSicknessInsuranceIsPending,
  selectGetSicknessInsurances,
  selectGetSicknessInsurancesIsPending,
} from '../../resources/sicknessInsurance';
import { selectIsOnline } from '../../resources/settings';
import Component from './SicknessInsuranceComponent';

const mapStateToProps = (state) => ({
  addSicknessInsuranceIsPending: selectAddSicknessInsuranceIsPending(state),
  deleteSicknessInsuranceIsPending: selectDeleteSicknessInsuranceIsPending(state),
  editSicknessInsuranceIsPending: selectEditSicknessInsuranceIsPending(state),
  getSicknessInsurancesIsPending: selectGetSicknessInsurancesIsPending(state),
  isOnline: selectIsOnline(state),
  sicknessInsurances: selectGetSicknessInsurances(state),
});

const mapDispatchToProps = (dispatch) => ({
  addSicknessInsurance: (data) => dispatch(addSicknessInsurance(data)),
  deleteSicknessInsurance: (userId) => dispatch(deleteSicknessInsurance(userId)),
  editSicknessInsurance: (userId, data) => dispatch(editSicknessInsurance(userId, data)),
  getSicknessInsurances: () => dispatch(getSicknessInsurances()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
