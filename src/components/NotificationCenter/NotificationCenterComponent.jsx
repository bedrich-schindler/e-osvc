import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import {
  NOTIFICATION_TYPE_AUTO_REMOVABLE,
  NOTIFICATION_TYPE_REMOVABLE,
  NOTIFICATION_TYPES,
  NOTIFICATION_VARIANTS,
} from '../../resources/notification';
import styles from './styles.scss';

const isRemovable = (notification) => [
  NOTIFICATION_TYPE_AUTO_REMOVABLE,
  NOTIFICATION_TYPE_REMOVABLE,
].includes(notification.type);

export const NotificationCenterComponent = (props) => {
  const {
    notifications,
    notificationRemove,
  } = props;

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      {notifications.map((notification, index) => (
        <Box
          key={notification.id}
          mb={(notifications.length - 1) !== index ? 2 : 6}
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
  notificationRemove: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(NOTIFICATION_TYPES).isRequired,
    variant: PropTypes.oneOf(NOTIFICATION_VARIANTS).isRequired,
  })),
};

export default NotificationCenterComponent;
