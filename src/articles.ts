import { domContentLoaded, getRandomNumberBetween, delay } from './utils';
import { ipcRenderer } from 'electron';

/**
 * 每个页面跳转都会执行哦
 */

domContentLoaded(async () => {
	console.log('页面加载完成');
	ipcRenderer.send('log', '开始看文章');
	window.scrollBy({
		top: document.body.clientHeight / 2 + getRandomNumberBetween(-20, 20),
		behavior: 'smooth',
	});

	const timer = setInterval(() => {
		window.scrollBy({
			top: getRandomNumberBetween(-15, 15),
			behavior: 'smooth',
		});
	}, 1000);
});