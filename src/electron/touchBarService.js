import { TouchBar } from 'electron';
import { getIcon } from './iconService';

const {
  TouchBarLabel,
  TouchBarButton,
} = TouchBar;

export const init = (mainWindow, electronStore) => {
  electronStore.touchBar.parts.startButton = new TouchBarButton({
    click: () => mainWindow.webContents.send('startTimer'),
    icon: getIcon('start_icon'),
  });
  electronStore.touchBar.parts.stopButton = new TouchBarButton({
    click: () => {
      mainWindow.show();

      return mainWindow.webContents.send('stopTimer');
    },
    icon: getIcon('stop_icon'),
  });
  electronStore.touchBar.parts.removeButton = new TouchBarButton({
    click: () => mainWindow.webContents.send('resetTimer'),
    icon: getIcon('remove_icon'),
  });
  electronStore.touchBar.parts.timer = new TouchBarLabel({
    label: '',
  });

  electronStore.touchBar.instance = new TouchBar({
    items: [
      electronStore.touchBar.parts.startButton,
    ],
  });

  mainWindow.setTouchBar(electronStore.touchBar.instance);
};

export const handleSetTimer = (mainWindow, electronStore, timer) => {
  electronStore.touchBar.parts.timer.label = timer;

  if (!electronStore.touchBar.data.isStarted) {
    electronStore.touchBar.instance = new TouchBar({
      items: [
        electronStore.touchBar.parts.timer,
        electronStore.touchBar.parts.stopButton,
        electronStore.touchBar.parts.removeButton,
      ],
    });
    mainWindow.setTouchBar(electronStore.touchBar.instance);

    electronStore.touchBar.data.isStarted = true;
  }
};

export const handleResetTimer = (mainWindow, electronStore) => {
  electronStore.touchBar.instance = new TouchBar({
    items: [
      electronStore.touchBar.parts.startButton,
    ],
  });
  mainWindow.setTouchBar(electronStore.touchBar.instance);

  electronStore.touchBar.data.isStarted = false;
};
