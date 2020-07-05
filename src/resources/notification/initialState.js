import { fromJS } from 'immutable';
import { retrieveNotificationsFromStorage } from './storage';

const notificationsDefaultState = {
  notifications: [],
};

export default (usePersistentStorage = true) => fromJS({
  data: usePersistentStorage
    ? (retrieveNotificationsFromStorage() || notificationsDefaultState)
    : notificationsDefaultState,
});
