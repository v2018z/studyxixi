import { BrowserWindow, Menu, app } from 'electron';
import * as path from 'path';
import { homeUrl } from './urls';
import { config } from './config';
import { delay } from './utils';

let win: BrowserWindow = null;
let splash: BrowserWindow;

const createWindow = () => {
  if (win) return;


  win = new BrowserWindow({
    width: 800,
    height: 650,
    show: false,
    webPreferences: {
      // 渲染线程使用node
      nodeIntegration: true,
      // 禁用同源策略 (通常用来测试网站)
      webSecurity: true,
      preload: path.join(__dirname, './preload.js'),
      backgroundThrottling: false,
      webviewTag: true,
    },
  });

  splash = new BrowserWindow({ 
    width: 800, 
    height: 650, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true, 
    webPreferences: {
      preload: path.join(__dirname, './splash.js'),
    } 
  });

  splash.loadFile(path.join(__dirname, '../splash.html'));

  win.loadURL(homeUrl);

  win.once('ready-to-show', () => {
    win.show();
  });

  win.on('closed', () => {
    win = null;
  });

  win.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    win.webContents.loadURL(url);
  });

  if (config.openDevTools) {
    win.webContents.openDevTools();
  }

  // 静音
  win.webContents.audioMuted = config.audioMuted;

  // 移除菜单栏
  Menu.setApplicationMenu(Menu.buildFromTemplate([{ label: '加载中...' }]));
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 CMD + D 确定退出
  // 否则绝大部分应用及其菜单栏会保持激活
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.allowRendererProcessReuse = true;

export { win, splash };
