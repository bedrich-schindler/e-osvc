// eslint-disable-next-line
import {
  app,
  BrowserWindow,
  ipcMain,
  session,
} from 'electron';
import { API_URL } from '../config/config';
import * as touchBarService from './electron/touchBarService';
import * as trayService from './electron/trayService';

let mainWindow;

const electronStore = {
  touchBar: {
    data: {
      isStarted: false,
    },
    instance: null,
    parts: {
      removeButton: null,
      separator: null,
      startButton: null,
      stopButton: null,
      timer: null,
    },
  },
  tray: {
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
  },
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 960,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1600,
  });

  mainWindow.loadFile('./public/index.electron.html');

  session.defaultSession.webRequest.onBeforeSendHeaders({ urls: [`${API_URL}/*`] }, (details, callback) => {
    details.requestHeaders.Origin = 'file://';
    details.requestHeaders['User-Agent'] = 'eOSVC Electron App';
    callback({
      cancel: false,
      requestHeaders: details.requestHeaders,
    });
  });

  touchBarService.init(mainWindow, electronStore);
  trayService.init(mainWindow, electronStore);

  mainWindow.on('closed', () => {
    trayService.destroy(mainWindow, electronStore);
  });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('setTimer', (event, timer) => {
  touchBarService.handleSetTimer(mainWindow, electronStore, timer);
  trayService.handleSetTimer(mainWindow, electronStore, timer);
});

ipcMain.handle('resetTimer', () => {
  touchBarService.handleResetTimer(mainWindow, electronStore);
  trayService.handleResetTimer(mainWindow, electronStore);
});
