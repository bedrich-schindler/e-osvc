import {
  dialog,
  Notification,
} from 'electron';
import { autoUpdater } from 'electron-updater';

export const init = () => {
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', (info) => {
    if (!Notification.isSupported()) {
      return;
    }

    new Notification({
      title: 'eOSVČ',
      body: `Nová verze ${info.version} je k dispozici. Probíhá stahování.`,
    }).show();
  });

  autoUpdater.on('error', (e) => {
    if (!Notification.isSupported()) {
      return;
    }

    new Notification({
      title: 'eOSVČ',
      body: 'Nastala chyba při stahování nové verze aplikace.',
    }).show();
  });

  autoUpdater.on('update-downloaded', (info) => {
    const clickedButtonIndex = dialog.showMessageBoxSync({
      type: 'info',
      title: 'Nová verze aplikace',
      message: `Nová verze ${info.version} je k dispozici. Chcete ji nainstalovat?`,
      buttons: ['Ano', 'Ne']
    });

    if (clickedButtonIndex === 0) {
      autoUpdater.quitAndInstall(true, true);
    }
  });
};
