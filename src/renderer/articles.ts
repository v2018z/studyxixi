import {
  domContentLoaded,
  getRandomNumberBetween,
  delay,
  getRandomElement,
} from '../utils';
import { ipcRenderer, ipcMain } from 'electron';

/**
 * 每个页面跳转都会执行哦
 */

domContentLoaded(async () => {
  ipcRenderer.send('log', '开始看文章');

  const articleChannels = await ipcRenderer.invoke('get-article-channels');

  await delay(5000);

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

  const refreshLoad = () => {
    ipcRenderer.send('watch-article');
    const channel = getRandomElement(articleChannels);
    ipcRenderer.send('log', '文章地址：', channel.url);
    location.href = channel.url || location.href;
  };

  await delay(130000);

  refreshLoad();
});
