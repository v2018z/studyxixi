import { app, BrowserWindow, ipcMain, Menu, BrowserView } from 'electron';
import { win } from './browser-window';
import * as path from 'path';
import { delay } from './utils';
import { showScoreDetail } from './score';

export const log = (event: Event, message?: any, ...optionalParams: any[]) => {
	console.log(message, ...optionalParams);
}

export const refreshMenu = (event: Event, rate: any) => {
	if (rate.score) {
		const { today, total, types } = rate.score;
		const template = [
			{ label: `总积分：${total}`},
			{ label: `今日积分：${today}`},
			...types.map((t: string) => ({ label: `${t}` }))
		]
		Menu.setApplicationMenu(Menu.buildFromTemplate(template));
	}
}

const createBrowerView = (options: any): BrowserView => {
	const view = new BrowserView({
		webPreferences: {
			// 渲染线程使用node
			nodeIntegration: false,
			// 禁用同源策略 (通常用来测试网站)
			webSecurity: true,
			preload: options.preload,
		}
	});
	
	win.addBrowserView(view);
	view.setBounds({ x: options.x, y: 0, width: 500, height: 600 });
	view.webContents.loadURL(options.url);
	return view;
}

export const createArticleView = async (event: Event, options: any) => {
	const view = createBrowerView({
		...options,
		x: 0,
		url: options.url,
		preload: path.join(__dirname, './articles.js'),
		lifeTime: options.lifeTime || 130000,
	});
	win.setBackgroundColor('#6f4f4f');
	
	await delay(options.lifeTime);
	view.destroy();
	win.removeBrowserView(view);

	win.webContents.send('watch-article');
}

export const createVideoView = async (event: Event, options: any) => {
	const view = createBrowerView({
		...options,
		x: 500,
		url: options.url,
		preload: path.join(__dirname, './videos.js'),
		lifeTime: options.lifeTime || 190000,
	});
	win.setBackgroundColor('#c8e1ff');
	
	await delay(options.lifeTime);
	view.destroy();
	win.removeBrowserView(view);

	win.webContents.send('watch-video');
}