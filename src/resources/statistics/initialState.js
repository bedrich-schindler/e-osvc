import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    getStatistics: {
      isPending: false,
    },
  },
  data: {
    getStatistics: null,
  },
});
