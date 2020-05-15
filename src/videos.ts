import { domContentLoaded, getRandomNumberBetween } from './utils';
import { ipcRenderer } from 'electron';

/**
 * 每个页面跳转都会执行哦
 */

domContentLoaded(async () => {
	ipcRenderer.send('log', '开始看视频');

	window.scrollBy({
		top: document.body.clientHeight / 2 + getRandomNumberBetween(-20, 20),
		behavior: 'smooth',
	});
});