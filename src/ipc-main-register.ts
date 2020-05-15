import { app, BrowserWindow, ipcMain, Menu, BrowserView } from 'electron';
import { win } from './browser-window';
import * as path from 'path';
import { log, refreshMenu, createArticleView, createVideoView } from './ipc-main-service';

// 注册接受渲染进程事件
ipcMain.on('log', (event: Event, message?: any, ...optionalParams: any[]) => log(event, message, ...optionalParams));

ipcMain.on('refresh-menu', (event, rate) => { refreshMenu(event, rate )});

ipcMain.on('create-article-view', (event, options) => createArticleView(event, options));

ipcMain.on('create-video-view', (event, options) => createVideoView(event, options));