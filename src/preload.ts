import { ipcRenderer } from 'electron';
import * as path from 'path';
import { domContentLoaded, getRandomElement, delay } from './utils';
import { onLogin, isLoggedIn } from './login';
import { loginUrl, homeUrl } from './urls';
import { getUsableRateScoreTasks, showScoreDetail, isDone } from './score';
import { getLgDate, articles, videos, getArticleChannels, getVideoChannels } from './channels';

/**
 * 每个页面跳转都会执行哦
 */

domContentLoaded(async () => {
	console.log('页面加载完成');

	/**
	 * 如果当前是登录页
	 * 执行等待扫码登录逻辑
	 */
	if (location.href.startsWith(loginUrl)) {
		onLogin();
		return;
	}

	/**
	 * 未登录强制跳到登录页
	 */
	if (!isLoggedIn()) {
		location.href = `${loginUrl}?ref=${homeUrl}`;
		return;
	}

	const articleChannels = await getArticleChannels();
	const videoChannels = await getVideoChannels();

	const circleArticleTask = async () => {
		const [watchdArticleTask, , watchArticleTimeTask, ,] = await getUsableRateScoreTasks();

		if (!isDone(watchdArticleTask) || !isDone(watchArticleTimeTask)) {
			const channel = getRandomElement(articleChannels);
			ipcRenderer.send('log', 'article', channel.url);
			ipcRenderer.send('create-article-view', {
				url: channel.url,
				lifeTime: 130000,
			});
			return;
		}
	}

	const circleVideoTask = async () => {
		const [, watchVideoTask, ,watchVideoTimeTask] = await getUsableRateScoreTasks();

		if (!isDone(watchVideoTask) || !isDone(watchVideoTimeTask)) {
			const channel = getRandomElement(videoChannels);
			ipcRenderer.send('log', 'video', channel.url);
			ipcRenderer.send('create-video-view', {
				url: channel.url,
				lifeTime: 190000,
			});
			return;
		}
	}

	const cicleTaks = async () => {
		await showScoreDetail();
		await circleArticleTask();
		await delay(2000);
		await circleVideoTask();
		
		checkIsOver();
	}

	const checkIsOver = async () => {
		const [watchdArticleTask, watchVideoTask, watchArticleTimeTask, watchVideoTimeTask] = await getUsableRateScoreTasks();
		if (isDone(watchdArticleTask) 
			&& isDone(watchVideoTask) 
			&& isDone(watchArticleTimeTask) 
			&& isDone(watchVideoTimeTask)) {
				const n = new Notification('温馨提示', {
				body: '希希同学，今日积分已经满啦',
				silent: false,
				icon: 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
			});
		}
	}
	
	ipcRenderer.on('watch-article', async () => {
		showScoreDetail();
		await circleArticleTask();

		checkIsOver();
	});

	ipcRenderer.on('watch-video', () => {
		showScoreDetail();
		checkIsOver();
	});

	cicleTaks();
});