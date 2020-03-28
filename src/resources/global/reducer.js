import { fromJS } from 'immutable';

export default (state, action) => {
  const {
    meta,
    payload,
    type,
  } = action;

  const [actionType, actionNamespace, actionName, actionStatus] = type.split('/');

  if (actionType === 'api') {
    const isPendingPath = [actionNamespace, 'apiActions', actionName, 'isPending'];

    if (actionStatus === 'request') {
      return state.setIn(isPendingPath, true);
    }

    if (actionStatus === 'success') {
      const newState = meta && meta.dataPath
        ? state.setIn([actionNamespace, 'data'].concat(meta.dataPath), fromJS(payload))
        : state;

      return newState.setIn(isPendingPath, false);
    }

    if (actionStatus === 'failure') {
      return state.setIn(isPendingPath, false);
    }
  }

  return state;
};
