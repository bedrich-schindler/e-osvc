import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import initialState from './initialState';

export default (state, action) => {
  if (typeof state === 'undefined') {
    return initialState();
  }

  const {
    payload,
    type,
  } = action;

  if (type === actionTypes.NOTIFICATION_ADD) {
    const { result } = payload;
    const notifications = state.getIn(['data', 'notifications']);
    const notificationsChanged = notifications.push(fromJS(result));

    return state.setIn(['data', 'notifications'], notificationsChanged);
  }

  if (type === actionTypes.NOTIFICATION_REMOVE) {
    const { result } = payload;
    const notifications = state.getIn(['data', 'notifications']);
    const notificationsChanged = notifications.filter((n) => n.get('id') !== result.id);

    return state.setIn(['data', 'notifications'], notificationsChanged);
  }

  return state;
};
