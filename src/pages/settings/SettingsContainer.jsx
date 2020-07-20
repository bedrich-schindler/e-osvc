import { connect } from 'react-redux';
import {
  editUserNotifications,
  getUser,
  selectEditUserNotificationsIsPending,
  selectGetUser,
  selectGetUserIsPending,
} from '../../resources/user';
import Component from './SettingsComponent';

const mapStateToProps = (state) => ({
  editUserNotificationsIsPending: selectEditUserNotificationsIsPending(state),
  getUserIsPending: selectGetUserIsPending(state),
  user: selectGetUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  editUserNotifications: (
    userNotificationsId,
    data,
  ) => dispatch(editUserNotifications(userNotificationsId, data)),
  getUser: () => dispatch(getUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
