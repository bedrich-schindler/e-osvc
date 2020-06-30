import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addUser: {
      isPending: false,
    },
    getUser: {
      isPending: false,
    },
  },
  data: {
    addUser: null,
    getUser: null,
  },
});
