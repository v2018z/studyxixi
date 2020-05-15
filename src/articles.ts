// import './login';
import { domContentLoaded, getRandomNumberBetween } from './utils';
import { onLogin, isLoggedIn } from './login';
import { loginUrl, homeUrl } from './urls';
import { getUsableRateScoreTasks, showScoreDetail } from './score';
import { ipcRenderer } from 'electron';

/**
 * 每个页面跳转都会执行哦
 */

domContentLoaded(async () => {
	console.log('页面加载完成');

	window.scrollBy({
		top: window.innerHeight + getRandomNumberBetween(-20, 20),
		behavior: 'smooth',
	});

	const timer = setInterval(() => {
		window.scrollBy({
			top: getRandomNumberBetween(-5, 10),
			behavior: 'smooth',
		});
	}, 1000);
});