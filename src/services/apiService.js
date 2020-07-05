import { createAction } from 'redux-api-middleware';
import { API_URL } from '../../config/config';
import {
  NOTIFICATION_TYPE_AUTO_REMOVABLE,
  NOTIFICATION_TYPE_REMOVABLE,
  NOTIFICATION_VARIANT_ERROR,
  NOTIFICATION_VARIANT_SUCCESS,
  notificationAdd,
} from '../resources/notification';

export const prepareNotification = (action, notificationMessages) => {
  const isSuccessMessagePresent = notificationMessages
    && notificationMessages.success != null;
  const isFailureMessagePresent = notificationMessages
    && notificationMessages.failure != null;

  if (action.type == null) {
    return null;
  }

  if (action.type.endsWith('success') && isSuccessMessagePresent) {
    return notificationAdd(
      NOTIFICATION_TYPE_AUTO_REMOVABLE,
      NOTIFICATION_VARIANT_SUCCESS,
      notificationMessages.success,
    );
  }

  if (action.type.endsWith('failure') && isFailureMessagePresent) {
    return notificationAdd(
      NOTIFICATION_TYPE_REMOVABLE,
      NOTIFICATION_VARIANT_ERROR,
      notificationMessages.failure,
    );
  }

  return null;
};

export const createApiAction = ({
  endpoint, method, notificationMessages, types, body = null,
}) => (
  dispatch,
) => dispatch(createAction({
  body: body
    ? JSON.stringify(body)
    : null,
  endpoint: `${API_URL}${endpoint}`,
  headers: {
    'Content-Type': 'application/json',
  },
  method,
  types,
})).then((action) => {
  const notificationToDispatch = prepareNotification(
    action,
    notificationMessages,
  );

  if (notificationToDispatch !== null) {
    dispatch(notificationToDispatch);
  }

  return action;
});
