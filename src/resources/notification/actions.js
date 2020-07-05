import { generate } from 'shortid';
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_TYPE_AUTO_REMOVABLE,
  NOTIFICATION_VARIANTS,
} from './constants';
import {
  selectNotifications,
} from './selectors';
import {
  removeNotificationsFromStorage,
  storeNotificationsToStorage,
} from './storage';
import * as actionTypes from './actionTypes';

const AUTO_REMOVABLE_TIMEOUT = 10000;

export const notificationRemove = (id) => (dispatch, getState) => new Promise((resolve) => {
  const request = {
    payload: { result: { id } },
    type: actionTypes.NOTIFICATION_REMOVE,
  };

  dispatch(request);
  resolve(request);
}).then((response) => {
  storeNotificationsToStorage({
    notifications: selectNotifications(getState()),
  });

  return response;
});

export const notificationAdd = (
  type,
  variant,
  message,
) => (dispatch, getState) => new Promise((resolve) => {
  if (!NOTIFICATION_TYPES.includes(type)) {
    throw new Error(`Notification type \`${type}\` is not supported`);
  }

  if (!NOTIFICATION_VARIANTS.includes(variant)) {
    throw new Error(`Notification variant \`${type}\` is not supported`);
  }

  const id = generate();
  const request = {
    payload: {
      result: {
        id,
        message,
        type,
        variant,
      },
    },
    type: actionTypes.NOTIFICATION_ADD,
  };

  if (type === NOTIFICATION_TYPE_AUTO_REMOVABLE) {
    setTimeout(() => {
      notificationRemove(id)(dispatch, getState);
    }, AUTO_REMOVABLE_TIMEOUT);
  }

  dispatch(request);
  resolve(request);
}).then((response) => {
  storeNotificationsToStorage({
    notifications: selectNotifications(getState()),
  });

  return response;
});

export const notificationsReset = () => (dispatch) => new Promise((resolve) => {
  const request = {
    meta: { dataPath: ['notifications'] },
    type: actionTypes.NOTIFICATIONS_RESET,
  };

  dispatch(request);
  resolve(request);
}).then((response) => {
  removeNotificationsFromStorage();

  return response;
});
