import { ipcRenderer } from 'electron';
import { delay } from './utils';
import { config } from './config';

export const onLogin = async () => {
  // 隐藏页面无用的元素
  document.body.style.overflow = 'hidden';
  document
    .querySelectorAll('.layout-header, .redflagbox, .layout-footer')
    .forEach((element: HTMLElement) => {
      element.style.display = 'none';
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

  const observer = new MutationObserver(() => {
	// 关闭闪屏页
	ipcRenderer.send('close-win-splash');
	
    const text = `${config.tipsPrefix}打开APP扫它👆`;
    const $loginText = document.querySelector('.ddlogintext');
    $loginText.innerHTML = text;
    ($loginText as HTMLElement).style.color = '#fff';
  });

  observer.observe(document.querySelector('.layout-body'), { childList: true });
};

export const isLoggedIn = () => {
  return document.cookie.includes('token=');
};
