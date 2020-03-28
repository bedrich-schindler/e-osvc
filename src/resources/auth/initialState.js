import { fromJS } from 'immutable';
import { retrieveTokenFromStorage } from './storage';

export default (useStorage = true) => fromJS({
  apiActions: {
    login: {
      isPending: false,
    },
  },
  data: {
    token: useStorage ? retrieveTokenFromStorage() : null,
  },
});
