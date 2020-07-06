import { fromJS } from 'immutable';

export default () => fromJS({
  apiActions: {
    addTimeRecord: {
      isPending: false,
    },
    deleteTimeRecord: {
      isPending: false,
    },
    editTimeRecord: {
      isPending: false,
    },
    getTimeRecord: {
      isPending: false,
    },
    getTimeRecords: {
      isPending: false,
    },
  },
  data: {
    addTimeRecord: null,
    deleteTimeRecord: null,
    editTimeRecord: null,
    getTimeRecord: null,
    getTimeRecords: null,
  },
});
