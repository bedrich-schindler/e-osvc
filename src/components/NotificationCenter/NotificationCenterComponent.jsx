import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  NOTIFICATION_TYPE_AUTO_REMOVABLE,
  NOTIFICATION_TYPE_NON_REMOVABLE,
  NOTIFICATION_TYPE_REMOVABLE,
  NOTIFICATION_TYPES,
  NOTIFICATION_VARIANT_WARNING,
  NOTIFICATION_VARIANTS,
} from '../../resources/notification';
import styles from './styles.scss';

const isRemovable = (notification) => [
  NOTIFICATION_TYPE_AUTO_REMOVABLE,
  NOTIFICATION_TYPE_REMOVABLE,
].includes(notification.type);

export const NotificationCenterComponent = (props) => {
  const {
    isOnline,
    notifications,
    notificationRemove,
  } = props;

  let modifiedNotifications = notifications;

  if (!isOnline) {
    modifiedNotifications = [
      {
        id: 'offline',
        message: 'Jste offline. K dispozici je pouze omezená funkcionalita.',
        type: NOTIFICATION_TYPE_NON_REMOVABLE,
        variant: NOTIFICATION_VARIANT_WARNING,
      },
      ...modifiedNotifications,
    ];
  }

  if (modifiedNotifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      {modifiedNotifications.map((notification, index) => (
        <Box
          key={notification.id}
          mb={(modifiedNotifications.length - 1) !== index ? 2 : 6}
        >
          <Alert
            onClose={
              isRemovable(notification)
                ? () => notificationRemove(notification.id)
                : null
            }
            variant="filled"
            severity={notification.variant}
          >
            {notification.message}
          </Alert>
        </Box>
      ))}
    </div>
  );
};

NotificationCenterComponent.defaultProps = {
  notifications: [],
};

NotificationCenterComponent.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  notificationRemove: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(NOTIFICATION_TYPES).isRequired,
    variant: PropTypes.oneOf(NOTIFICATION_VARIANTS).isRequired,
  })),
};

export default NotificationCenterComponent;
