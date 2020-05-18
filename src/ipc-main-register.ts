import { ipcMain } from 'electron';
import { log, refreshMenu, createArticleView, createVideoView, watchVideo, 
    closeTask, watchArticle, toggleTaskWindow, createFastVideoView, setAppAudioMuted, 
    closeWinPlash, setSplashComplete 
} from './ipc-main-service';
import { setArticleChannels, setVideoChannels, getArticleChannels, getVideoChannels } from './store';

// 注册接受渲染进程事件
ipcMain.on('log', (event: Event, message?: any, ...optionalParams: any[]) => log(event, message, ...optionalParams));

ipcMain.on('set-app-audio-muted', (event, isMuted: boolean ) => setAppAudioMuted(isMuted));

ipcMain.on('close-win-splash', closeWinPlash);

ipcMain.on('set-splash-complete', setSplashComplete);

ipcMain.on('refresh-menu', (event, rate) => { refreshMenu(event, rate )});

ipcMain.on('create-article-view', (event, options) => createArticleView(event, options));

ipcMain.on('create-video-view', (event, options) => createVideoView(event, options));

ipcMain.on('create-fast-video-view', (event, options) => createFastVideoView(event, options));

ipcMain.on('watch-article', watchArticle);

ipcMain.on('watch-video', watchVideo);

ipcMain.on('toggle-task-window', (event, isShow: boolean) => toggleTaskWindow(isShow));

ipcMain.on('close-task', closeTask);

ipcMain.on('set-article-channels', (event, channels: []) => setArticleChannels(channels));

ipcMain.on('set-video-channels', (event, channels: []) => setVideoChannels(channels));

ipcMain.handle('get-article-channels', getArticleChannels);

ipcMain.handle('get-video-channels', getVideoChannels);
