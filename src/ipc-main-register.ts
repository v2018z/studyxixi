import { app, BrowserWindow, ipcMain, Menu, BrowserView, ipcRenderer } from 'electron';
import { win } from './browser-window';
import * as path from 'path';
import { log, refreshMenu, createArticleView, createVideoView, watchVideo, 
    closeTask, watchArticle, toggleTaskWindow, createFastVideoView } from './ipc-main-service';
import { setArticleChannels, setVideoChannes, getArticleChannels, getVideoChannels } from './store';

// 注册接受渲染进程事件
ipcMain.on('log', (event: Event, message?: any, ...optionalParams: any[]) => log(event, message, ...optionalParams));

ipcMain.on('refresh-menu', (event, rate) => { refreshMenu(event, rate )});

ipcMain.on('create-article-view', (event, options) => createArticleView(event, options));

ipcMain.on('create-video-view', (event, options) => createVideoView(event, options));

ipcMain.on('create-fast-video-view', (event, options) => createFastVideoView(event, options));

ipcMain.on('watch-article', watchArticle);

ipcMain.on('watch-video', watchVideo);

ipcMain.on('toggle-task-window', (event: Event, isShow: boolean) => toggleTaskWindow(isShow));

ipcMain.on('close-task', closeTask);

ipcMain.on('set-article-channels', (event, channels: []) => setArticleChannels(channels));

ipcMain.on('set-video-channels', (event, channels: []) => setVideoChannes(channels));

ipcMain.handle('get-article-channels', getArticleChannels);

ipcMain.handle('get-video-channels', getVideoChannels);
