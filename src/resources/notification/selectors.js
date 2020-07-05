import { getDataSelector } from '../../services/reducerService';

const getData = (state) => state.getIn(['notification', 'data']);

export const selectNotifications = getDataSelector(getData, 'notifications');
