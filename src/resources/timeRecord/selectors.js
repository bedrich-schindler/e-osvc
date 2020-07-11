import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['timeRecord', 'apiActions']);
const getData = (state) => state.getIn(['timeRecord', 'data']);

export const selectAddTimeRecord = getDataSelector(getData, 'addTimeRecord');
export const selectDeleteTimeRecord = getDataSelector(getData, 'deleteTimeRecord');
export const selectEditTimeRecord = getDataSelector(getData, 'editTimeRecord');
export const selectGetTimeRecord = getDataSelector(getData, 'getTimeRecord');
export const selectGetTimeRecords = getDataSelector(getData, 'getTimeRecords');
export const selectIsTimerVisible = getDataSelector(getData, 'isTimerVisible');
export const selectTimer = getDataSelector(getData, 'timer');

export const selectAddTimeRecordIsPending = getIsPendingSelector(getApiActions, 'addTimeRecord');
export const selectDeleteTimeRecordIsPending = getIsPendingSelector(getApiActions, 'deleteTimeRecord');
export const selectEditTimeRecordIsPending = getIsPendingSelector(getApiActions, 'editTimeRecord');
export const selectGetTimeRecordIsPending = getIsPendingSelector(getApiActions, 'getTimeRecord');
export const selectGetTimeRecordsIsPending = getIsPendingSelector(getApiActions, 'getTimeRecords');
