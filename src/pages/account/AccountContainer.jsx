import { connect } from 'react-redux';
import {
  editUser,
  getUser,
  selectEditUserIsPending,
  selectGetUser,
  selectGetUserIsPending,
} from '../../resources/user';
import Component from './AccountComponent';

const mapStateToProps = (state) => ({
  editUserIsPending: selectEditUserIsPending(state),
  getUserIsPending: selectGetUserIsPending(state),
  user: selectGetUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  editUser: (data) => dispatch(editUser(data)),
  getUser: () => dispatch(getUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
