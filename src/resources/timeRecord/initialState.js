import { fromJS } from 'immutable';
import {
  retrieveIsTimerVisibleFromStorage,
  retrieveTimerFromStorage,
} from './storage';

export default (usePersistentStorage = true) => fromJS({
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
    isTimerVisible: usePersistentStorage
      ? (retrieveIsTimerVisibleFromStorage() || false)
      : false,
    timer: usePersistentStorage
      ? (retrieveTimerFromStorage() || null)
      : null,
  },
});
