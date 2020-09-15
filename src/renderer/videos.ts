import { domContentLoaded, getRandomNumberBetween, getRandomElement, delay } from '../utils';
import { ipcRenderer } from 'electron';

/**
 * 每个页面跳转都会执行哦
 */
domContentLoaded(async () => {
	ipcRenderer.send('log', '开始看视频');

	const videoChannels = await ipcRenderer.invoke('get-video-channels');

	let currentVideo: any = null;

	const refreshLoad = () => {
		ipcRenderer.send('watch-video');
		const channel = getRandomElement(videoChannels);
		ipcRenderer.send('log', '视频地址：', channel.url);
		location.href = channel.url || location.href;
	}

	const observer = new MutationObserver(() => {
		const $video = document.querySelector('video');

		if ($video == null || currentVideo != null ) return;

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

		currentVideo = $video;

		$video.addEventListener('durationchange', async () => {
			ipcRenderer.send('log', '视频时长: ', $video.duration);
			const duration = $video.duration;
			const minute = Math.floor(duration / 60);
			if (minute < 3) {
				refreshLoad();
			}
		});

		$video.addEventListener('ended', async() => {
			refreshLoad();
		});

		$video.addEventListener('error', async() => {
			refreshLoad();
		});
	});

	observer.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });
});