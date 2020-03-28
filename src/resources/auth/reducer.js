import initialState from './initialState';
import * as actionTypes from './actionTypes';

export default (state, action) => {
  if (state === undefined) {
    return initialState();
  }

  if (action.type === actionTypes.API_LOGIN_SUCCESS) {
    return state.setIn(['data', 'token'], action.payload.token);
  }

  if (action.type === actionTypes.API_LOGIN_FAILURE) {
    return state.setIn(
      ['data', 'token'],
      initialState(false).getIn(['data', 'token']),
    );
  }

  if (action.type === actionTypes.LOCAL_LOGOUT) {
    return state.setIn(
      ['data', 'token'],
      initialState(false).getIn(['data', 'token']),
    );
  }

  return state;
};
