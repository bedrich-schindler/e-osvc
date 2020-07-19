import { getDataSelector } from '../../services/reducerService';

const getData = (state) => state.getIn(['settings', 'data']);

export const selectIsOnline = getDataSelector(getData, 'isOnline');
