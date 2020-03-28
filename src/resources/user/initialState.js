import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addUser: {
      isPending: false,
    },
  },
  data: {
    addUser: null,
  },
});
