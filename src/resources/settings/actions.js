import * as actionTypes from './actionTypes';

export const setIsOnline = (isOnline) => (dispatch) => new Promise((resolve) => {
  const request = {
    meta: { dataPath: ['isOnline'] },
    payload: isOnline,
    type: actionTypes.SET_IS_ONLINE,
  };

  dispatch(request);
  resolve(request);
});
