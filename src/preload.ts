// import './login';
import { domContentLoaded, getRandomElement } from './utils';
import { onLogin, isLoggedIn } from './login';
import { loginUrl, homeUrl } from './urls';
import { getUsableRateScoreTasks, showScoreDetail, isDone } from './score';
import { ipcRenderer } from 'electron';
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

	// 显示分数
	await showScoreDetail();

	ipcRenderer.on('show-score', () => {
		showScoreDetail();
	});

	const [watchdArticleTask, watchVideoTask, watchArticleTimeTask, watchVideoTimeTask] = await getUsableRateScoreTasks();

	const articleChannels = await getArticleChannels();
	const videoChannels = await getVideoChannels();

	if (!isDone(watchdArticleTask) || !isDone(watchArticleTimeTask)) {
		new Array(6).fill('').map(() => {
			const channel = getRandomElement(articleChannels);
			ipcRenderer.send('create-article-view', {
				url: channel.url,
				lifeTime: 10000,
			});
		});
	}

	if (!isDone(watchVideoTask) || !isDone(watchVideoTimeTask)) {
		new Array(6).fill('').map(() => {
			const channel = getRandomElement(videoChannels);
			ipcRenderer.send('create-video-view', {
				url: channel.url,
				lifeTime: 190000,
			});
		});
	}
});