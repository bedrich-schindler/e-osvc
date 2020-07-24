import {
  getDataSelector,
  getIsPendingSelector,
} from '../../services/reducerService';

const getApiActions = (state) => state.getIn(['statistics', 'apiActions']);
const getData = (state) => state.getIn(['statistics', 'data']);

export const selectGetStatistics = getDataSelector(getData, 'getStatistics');

export const selectGetStatisticsIsPending = getIsPendingSelector(getApiActions, 'getStatistics');
