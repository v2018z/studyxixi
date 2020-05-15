import { app, BrowserWindow, ipcMain, Menu, BrowserView } from 'electron';
import { win } from './browser-window';
import * as path from 'path';
import { delay } from './utils';
import { showScoreDetail } from './score';

export const log = (event: Event, message?: any, ...optionalParams: any[]) => {
	console.log(message);
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

const views: BrowserView[] = [];

const getNewViewBounds = () => {
	const lastView = views[views.length - 1];
	if (!lastView) {
		return { x: 0, y: 0 };
	}
	let { x, y } = lastView.getBounds();
	if (x >= 600) {
		// 换行
		y += 300;
		x = 0;
	} else {
		x += 300;
	}
	return { x, y};
}

const createBrowerView = (options: any): BrowserView => {
	const view = new BrowserView({
		webPreferences: {
			// 渲染线程使用node
			nodeIntegration: true,
			// 禁用同源策略 (通常用来测试网站)
			webSecurity: true,
			preload: options.preload,
			webviewTag:true
		}
	});
	win.addBrowserView(view);
	const { x, y } = getNewViewBounds();
	view.setBounds({ x, y, width: 300, height: 300 });
	view.webContents.loadURL(options.url);
	views.push(view);
	return view;
}

export const createArticleView = async (event: Event, options: any) => {
	const view = createBrowerView({
		...options,
		url: options.url,
		preload: path.join(__dirname, './articles.js'),
		lifeTime: options.lifeTime || 130000,
	});
	
	await delay(options.lifeTime);
	view.destroy();
	win.removeBrowserView(view);

	win.webContents.send('show-score');
}

export const createVideoView = async (event: Event, options: any) => {
	const view = createBrowerView({
		...options,
		url: options.url,
		preload: path.join(__dirname, './articles.js'),
		lifeTime: options.lifeTime || 190000,
	});
	
	await delay(options.lifeTime);
	view.destroy();
	win.removeBrowserView(view);

	win.webContents.send('show-score');
}