import { fromJS } from 'immutable';

export default (/* useStorage = true */) => fromJS({
  data: {
    isOnline: window.navigator.onLine,
  },
});
