import { app, BrowserWindow, ipcMain, Menu, BrowserView, dialog } from 'electron';
import { win, splash } from './browser-window';
import * as path from 'path';
import { delay, notify } from './utils';
import { showScoreDetail } from './score';
import { config } from './config';
import { splashComplete, getSplashIsComplete } from './store';
import { myStudyUrl } from './urls';

export const log = (event: Event, message?: any, ...optionalParams: any[]) => {
  console.log(message, ...optionalParams);
};

export const setSplashComplete = () => {
  splashComplete();
}

export const closeWinPlash = async () => {
  const timer = setInterval(() => {
    if (getSplashIsComplete()) {
      // tslint:disable-next-line:no-unused-expression
      splash && splash.destroy && splash.destroy();
      clearInterval(timer);
    }
  }, 500);
}

export const refreshMenu = (event: Event, rate: any) => {
  if (rate.score) {
    const { today, total, types } = rate.score;
    const template = [
      { label: `总积分：${total}` },
      { label: `今日积分：${today}` },
      ...types.map((t: string) => ({ label: `${t}` })),
    ];

    template.unshift({
      label: `答题`,
      submenu: [
        {
          label: '今日答题',
          click() {
            notify({ body: `${config.tipsPrefix}今日答题任务执行中，请稍等！`});
            createAnswerBrowser('day');
          }
        },
        {
          label: '每周答题',
          click() {
            notify({ body: `${config.tipsPrefix}每周答题任务执行中，请稍等！`});
            createAnswerBrowser('weekly');
          }
        },
        {
          label: '专项答题',
          click() {
            notify({ body: `${config.tipsPrefix}专项答题任务执行中，请稍等！`});
            createAnswerBrowser('special');
          },
        },
      ]
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  }
};

export const setAppAudioMuted = (isMuted: boolean) => {
  win.webContents.audioMuted = isMuted;
};

const createBrowserView = (options: any): BrowserWindow => {
  let view = new BrowserWindow({
    parent: win,
    closable: false,
    x: win.getBounds().x + options.x,
    y: win.getBounds().y + 120,
    width: 500,
    height: 600,
    show: false,
    webPreferences: {
      // 渲染线程禁止使用node
      nodeIntegration: false,
      // 禁用同源策略 (通常用来测试网站)
      webSecurity: true,
      preload: options.preload,
      backgroundThrottling: false,
    },
  });
  view.webContents.loadURL(options.url);
  view.webContents.audioMuted = true;

  view.once('ready-to-show', () => {
    if (config.showTaskWindow) {
      view.show();
    }
  });

  view.on('closed', () => {
    view = null;
  });
  return view;
};

export const createArticleView = async (event: Event, options: any) => {
  const view = createBrowserView({
    ...options,
    x: 0,
    url: options.url,
    preload: path.join(__dirname, './renderer/articles.js'),
  });
  view.setBackgroundColor('#6f4f4f');
};

export const createVideoView = async (event: Event, options: any) => {
  const view = createBrowserView({
    ...options,
    x: 250,
    url: options.url,
    preload: path.join(__dirname, './renderer/videos.js'),
  });
  view.setBackgroundColor('#c8e1ff');
};

export const createFastVideoView = async (event: Event, options: any) => {
  const view = createBrowserView({
    ...options,
    x: 500,
    url: options.url,
    preload: path.join(__dirname, './renderer/videos-fast.js'),
  });
  view.setBackgroundColor('#c8e1ff');
};

export const watchVideo = async (event?: Event) => {
  win.webContents.send('watch-video');
};

export const watchArticle = async (event?: Event) => {
  win.webContents.send('watch-article');
};

export const closeTask = () => {
  win.getChildWindows().forEach((view: BrowserWindow) => {
    view.destroy();
  });
};

export const toggleTaskWindow = (isShow: boolean) => {
  win.getChildWindows().forEach((view: BrowserWindow) => {
    if (isShow) {
      view.show();
    } else {
      view.hide();
    }
  });
};

/**
 * 创建答题窗口
 */
export const createAnswerBrowser = (taskName: string) => {
  let view = new BrowserWindow({
    parent: win,
    closable: true,
    x: win.getBounds().x,
    y: win.getBounds().y,
    width: 500,
    height: 600,
    show: false,
    webPreferences: {
      // 渲染线程禁止使用node
      nodeIntegration: false,
      // 禁用同源策略 (通常用来测试网站)
      webSecurity: true,
      preload: path.join(__dirname, `./answers/${taskName}`),
      backgroundThrottling: false,
    },
  });
  view.loadURL(myStudyUrl);
  view.webContents.audioMuted = true;

  if (config.openDevTools) {
    view.webContents.openDevTools();
  }

  view.on('closed', () => {
    view = null;
  });
}
