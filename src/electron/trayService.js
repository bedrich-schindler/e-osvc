import {
  Menu,
  Tray,
} from 'electron';

export const init = (mainWindow, electronStore) => {
  electronStore.tray.parts.startButton = {
    click: () => mainWindow.webContents.send('startTimer'),
    label: 'Spustit časovač',
    type: 'normal',
  };
  electronStore.tray.parts.separator = { type: 'separator' };
  electronStore.tray.parts.stopButton = {
    click: () => {
      mainWindow.show();

      return mainWindow.webContents.send('stopTimer');
    },
    label: 'Zastavit časovač',
    type: 'normal',
  };
  electronStore.tray.parts.removeButton = {
    click: () => mainWindow.webContents.send('resetTimer'),
    label: 'Resetovat časovač',
    type: 'normal',
  };
  electronStore.tray.parts.title = {
    enabled: false,
    label: 'eOSVČ',
    type: 'normal',
  };

  electronStore.tray.instance = new Tray('./public/images/favicon-16x16.png');
  electronStore.tray.instance.setContextMenu(Menu.buildFromTemplate([
    electronStore.tray.parts.title,
    electronStore.tray.parts.separator,
    electronStore.tray.parts.startButton,
  ]));
};

export const destroy = (mainWindow, electronStore) => {
  electronStore.tray.instance.destroy();
  electronStore.tray = {
    data: {
      isStarted: false,
    },
    instance: null,
    parts: {
      removeButton: null,
      startButton: null,
      stopButton: null,
      title: null,
    },
  };
};

export const handleSetTimer = (mainWindow, electronStore, timer) => {
  electronStore.tray.instance.setTitle(timer);

  if (!electronStore.tray.data.isStarted) {
    electronStore.tray.instance.setContextMenu(Menu.buildFromTemplate([
      electronStore.tray.parts.title,
      electronStore.tray.parts.separator,
      electronStore.tray.parts.stopButton,
      electronStore.tray.parts.removeButton,
    ]));

    electronStore.touchBar.data.isStarted = true;
  }
};

export const handleResetTimer = (mainWindow, electronStore) => {
  electronStore.tray.instance.setTitle('');

  electronStore.tray.instance.setContextMenu(Menu.buildFromTemplate([
    electronStore.tray.parts.title,
    electronStore.tray.parts.separator,
    electronStore.tray.parts.startButton,
  ]));

  electronStore.touchBar.data.isStarted = false;
};
