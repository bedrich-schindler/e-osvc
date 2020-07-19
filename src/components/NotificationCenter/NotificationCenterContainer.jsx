import { connect } from 'react-redux';
import {
  selectNotifications,
  notificationRemove,
} from '../../resources/notification';
import { selectIsOnline } from '../../resources/settings';
import Component from './NotificationCenterComponent';

const mapStateToProps = (state) => ({
  isOnline: selectIsOnline(state),
  notifications: selectNotifications(state),
});

const mapDispatchToProps = (dispatch) => ({
  notificationRemove: (id) => dispatch(notificationRemove(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
