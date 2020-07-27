// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import {
  resetTimer,
  selectTimer,
  setTimer,
} from '../resources/timeRecord';
import { getTimeDifferenceString } from './dateTimeService';

export const registerTimerService = async (store) => {
  ipcRenderer.on('startTimer', () => {
    store.dispatch(setTimer(Date.now()));
  });

  ipcRenderer.on('resetTimer', () => {
    store.dispatch(resetTimer());
  });

  return setInterval(() => {
    const timer = selectTimer(store.getState());

    if (timer) {
      ipcRenderer.invoke('setTimer', getTimeDifferenceString(timer, Date.now()));
    }
  }, 1000);
};

export const handleStopTimer = (stopTimerFunc) => ipcRenderer.on('stopTimer', () => {
  stopTimerFunc();
});

export const invokeResetTimer = () => ipcRenderer.invoke('resetTimer');
export const invokeSetTimer = (dateTime) => ipcRenderer.invoke(
  'setTimer',
  getTimeDifferenceString(dateTime, Date.now()),
);
