import {
  removeFromStorage,
  retrieveFromStorage,
  storeToStorage,
} from '../../services/storageService';

const IS_TIMER_VISIBLE_KEY = 'isTimerVisible';
const TIMER_KEY = 'timer';

export const removeIsTimerVisibleFromStorage = () => removeFromStorage(IS_TIMER_VISIBLE_KEY);
export const retrieveIsTimerVisibleFromStorage = () => retrieveFromStorage(IS_TIMER_VISIBLE_KEY);
export const storeIsTimerVisibleToStorage = (isTimerVisible) => storeToStorage(
  IS_TIMER_VISIBLE_KEY,
  isTimerVisible,
);

export const removeTimerFromStorage = () => removeFromStorage(TIMER_KEY);
export const retrieveTimerFromStorage = () => retrieveFromStorage(TIMER_KEY);
export const storeTimerToStorage = (timerObj) => storeToStorage(TIMER_KEY, timerObj);
