import { createSelector } from 'reselect';

export const getIsPendingSelector = (state, apiActionName) => createSelector(
  [state],
  (data) => data.getIn([apiActionName, 'isPending']),
);

export const getDataSelector = (state, resourceName) => createSelector(
  [state],
  (data) => {
    const value = data.get(resourceName);

    if (value && value.toJS) {
      return value.toJS();
    }

    return value;
  },
);
