import { ipcRenderer } from 'electron';
import { delay } from './utils';
import { config } from './config';
import { userInfoUrl, examIndexUrl } from './urls';
import { ElementObserver } from './elementObserver';

export const getUserInfo = async () => {
	const res = await fetch(userInfoUrl, {
		credentials: 'include',
		referrer: examIndexUrl,
	});
	const rs = await res.json();
	if (rs.code !== 200) {
		throw new Error(rs.error);
	}
	return rs.data;
}

export const onLogin = async () => {

	const elementObserver = new ElementObserver('.ddlogintext', callback);

	async function callback() {
		const $layoutBody = document.querySelector('.layout-body') as HTMLElement;
		// 隐藏页面无用的元素
		document.body.style.overflow = 'hidden';
		document
			.querySelectorAll('.layout-header, .redflagbox, .layout-footer, .oath')
			.forEach((element: HTMLElement) => {
				element.style.display = 'none';
			});

		$layoutBody.classList.remove('login-page-bg');

		document
			.querySelectorAll('.login-page-bg')
			.forEach((element: HTMLElement) => {
				console.log(element)
				element.style.backgroundImage = '';
			});

		// 调整页面样式
		[document.documentElement, document.body].forEach((element: HTMLElement) => {
			element.style.minWidth = 'unset';
			element.style.display = 'flex';
			element.style.justifyContent = 'center';
			element.style.alignItems = 'center';
			element.style.background = '#333333';
			element.style.backgroundRepeat = 'no-repeat';
			element.style.backgroundSize = 'cover';
		});
		const text = `${config.tipsPrefix}打开APP扫它👆`;
		const $loginText = document.querySelector('.ddlogintext');
		console.log($loginText, 'loginText')
		if ($loginText) {
			$loginText.innerHTML = text;
			($loginText as HTMLElement).style.color = '#fff';
		}
		// 关闭闪屏页
		ipcRenderer.send('close-win-splash');
		elementObserver.disconnectObserver();
	}
};

export const isLoggedIn = () => {
	return document.cookie.includes('token=');
};
