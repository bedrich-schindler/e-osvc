// eslint-disable-next-line
import {
  app,
  BrowserWindow,
} from 'electron';

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    height: 768,
    webPreferences: {
      nodeIntegration: true,
    },
    width: 1024,
  });

  mainWindow.loadFile('./public/index.electron.html');
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
