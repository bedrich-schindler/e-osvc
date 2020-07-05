import {
  removeFromStorage,
  retrieveFromStorage,
  storeToStorage,
} from '../../services/storageService';

const NOTIFICATIONS_KEY = 'notifications';

export const removeNotificationsFromStorage = () => removeFromStorage(NOTIFICATIONS_KEY);
export const retrieveNotificationsFromStorage = () => retrieveFromStorage(NOTIFICATIONS_KEY);
export const storeNotificationsToStorage = (notificationsObj) => storeToStorage(
  NOTIFICATIONS_KEY,
  notificationsObj,
);
