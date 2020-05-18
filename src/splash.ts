
  import { ipcRenderer } from 'electron';

  setTimeout(() => {
    ipcRenderer.send('set-splash-complete');
  }, 3000);
