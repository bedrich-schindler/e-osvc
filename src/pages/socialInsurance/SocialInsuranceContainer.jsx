import { connect } from 'react-redux';
import { selectIsOnline } from '../../resources/settings';
import {
  addSocialInsurance,
  deleteSocialInsurance,
  editSocialInsurance,
  getSocialInsurances,
  selectAddSocialInsuranceIsPending,
  selectDeleteSocialInsuranceIsPending,
  selectEditSocialInsuranceIsPending,
  selectGetSocialInsurances,
  selectGetSocialInsurancesIsPending,
} from '../../resources/socialInsurance';
import Component from './SocialInsuranceComponent';

const mapStateToProps = (state) => ({
  addSocialInsuranceIsPending: selectAddSocialInsuranceIsPending(state),
  deleteSocialInsuranceIsPending: selectDeleteSocialInsuranceIsPending(state),
  editSocialInsuranceIsPending: selectEditSocialInsuranceIsPending(state),
  getSocialInsurancesIsPending: selectGetSocialInsurancesIsPending(state),
  isOnline: selectIsOnline(state),
  socialInsurances: selectGetSocialInsurances(state),
});

const mapDispatchToProps = (dispatch) => ({
  addSocialInsurance: (data) => dispatch(addSocialInsurance(data)),
  deleteSocialInsurance: (userId) => dispatch(deleteSocialInsurance(userId)),
  editSocialInsurance: (userId, data) => dispatch(editSocialInsurance(userId, data)),
  getSocialInsurances: () => dispatch(getSocialInsurances()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
