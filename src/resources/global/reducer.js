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

  if (actionType === 'local') {
    if (actionStatus === 'set') {
      if (meta && meta.dataPath) {
        return state.setIn(
          [actionNamespace, 'data'].concat(meta.dataPath),
          fromJS(payload.result),
        );
      }
    }

    if (actionStatus === 'reset') {
      if (meta && meta.dataPath) {
        // eslint-disable-next-line
        const module = require(`../${actionNamespace}/initialState`);
        const getInitialState = module.default;

        return state.setIn(
          [actionNamespace, 'data'].concat(meta.dataPath),
          getInitialState(false).getIn(['data'].concat(meta.dataPath)),
        );
      }
    }
  }

  return state;
};
