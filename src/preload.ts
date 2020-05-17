import { ipcRenderer, Menu } from 'electron';
import * as path from 'path';
import { domContentLoaded, getRandomElement, delay } from './utils';
import { onLogin, isLoggedIn } from './login';
import { loginUrl, homeUrl, waitImageUrl } from './urls';
import { getUsableRateScoreTasks, showScoreDetail, isDone } from './score';
import { getLgDate, articles, videos, getArticleChannels, getVideoChannels } from './channels';
import { config } from './config';

const showTaskControl = async () => {
	await delay(5000)
	let isShow = config.showTaskWindow;
	(document.querySelector('.menu .login') as HTMLElement).style.width = '100%';
	const $control = document.createElement('span');
	$control.innerHTML = `【${isShow ? '隐藏任务面板' : '显示任务面板'}】`;
	$control.style.cursor = 'pointer';
	document.querySelector('.menu .logged-text').appendChild($control);

	$control.addEventListener('click', () => {
		isShow = !isShow;
		ipcRenderer.send('toggle-task-window', isShow);
		$control.innerHTML = `【${isShow ? '隐藏任务面板' : '显示任务面板'}】`
	});
}

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
		ipcRenderer.send('close-task');
		location.href = `${loginUrl}?ref=${homeUrl}`;
		return;
	}

	
	const observer = new MutationObserver(() => {
		document.querySelectorAll('.xuexi, .menu-list, .search-icon, section, footer').forEach((element: HTMLElement) => {
			if (element.style.display === 'none') return;
			element.style.display = 'none';
		});

		if (document.getElementById('waiting-img')) {
			return;
		}
		
		(document.querySelector('.logged-link') as HTMLElement).style.fontSize = '18px';
		(document.querySelector('.menu') as HTMLElement).style.minWidth = '100%';

		const $body = document.querySelector('body');
		$body.style.overflow = 'hidden';
		$body.style.minWidth = '100%';
		$body.style.width =  '100%';

		const $img = document.createElement('img');
		$img.id = 'waiting-img';
		$img.src = waitImageUrl;
		$img.style.display = 'block';
		$img.style.margin = '0 auto';
		$img.style.marginTop = '100px';
		$img.style.width = '175px';

		const $root: HTMLElement = document.getElementById('root');

		$root.appendChild($img);

		const $tips = document.createElement('div');
		$tips.id = 'task-tips';
		$tips.innerHTML = '任务自动在后台执行, 不要着急';
		$tips.style.textAlign = 'center';
		$tips.style.marginTop = '50px';

		$root.appendChild($tips);

		// 任务面板控制
		showTaskControl();
	});

	observer.observe(document.querySelector('body'), { childList: true, subtree: true });

	const articleChannels = await getArticleChannels();
	const videoChannels = await getVideoChannels();

	ipcRenderer.send('set-article-channels', articleChannels);
	ipcRenderer.send('set-video-channels', videoChannels);

	const circleArticleTask = async () => {
		const [watchdArticleTask, , watchArticleTimeTask, ,] = await getUsableRateScoreTasks();

		if (isDone(watchdArticleTask) && isDone(watchArticleTimeTask)) {
			return;
		}

		const channel = getRandomElement(articleChannels);
		ipcRenderer.send('log', '文章地址：', channel.url);
		ipcRenderer.send('create-article-view', {
			url: channel.url,
		});
		return;
	}

	const circleVideoTask = async () => {
		const [, watchVideoTask, ,watchVideoTimeTask] = await getUsableRateScoreTasks();
		
		if (isDone(watchVideoTask) || isDone(watchVideoTimeTask)) {
			return;
		}

		const channel = getRandomElement(videoChannels);
		ipcRenderer.send('log', '视频地址：', channel.url);
		ipcRenderer.send('create-video-view', {
			url: channel.url,
		});
		return;
	}

	const circleFastVideoTask = async () => {
		const [, watchVideoTask, ,watchVideoTimeTask] = await getUsableRateScoreTasks();
		
		if (isDone(watchVideoTask)) {
			return;
		}

		const channel = getRandomElement(videoChannels);
		ipcRenderer.send('log', '快速视频地址：', channel.url);
		ipcRenderer.send('create-fast-video-view', {
			url: channel.url,
		});
		return;
	}

	const cicleTaks = async () => {
		await showScoreDetail();
		await circleArticleTask();
		await delay(2000);
		await circleVideoTask();
		await delay(2000);
		await circleFastVideoTask();
		
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
				ipcRenderer.send('close-task');
				
				const $tips: HTMLElement = document.getElementById('task-tips');
				$tips.innerHTML = '恭喜，今日积分已满';
				$tips.style.color = '#ff0000';
		}
	}
	
	ipcRenderer.on('watch-article', async () => {
		showScoreDetail();
		checkIsOver();
	});

	ipcRenderer.on('watch-video', () => {
		showScoreDetail();
		checkIsOver();
	});

	cicleTaks();
});