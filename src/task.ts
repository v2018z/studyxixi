import { ipcRenderer } from 'electron';
import { getArticleChannels, getVideoChannels } from './channels';
import { getUsableRateScoreTasks, isDone, showScoreDetail } from './score';
import { getRandomElement, delay, notify } from './utils';
import { config } from './config';

export default class Task {
  private articleChannels: any[] = [];
  private videoChannels: any[] = [];

  constructor() {
    this.watch();
  }

  async initialize() {
    const articleChannels = this.articleChannels = await getArticleChannels();
    const videoChannels = this.videoChannels = await getVideoChannels();
  
    ipcRenderer.send('set-article-channels', articleChannels);
    ipcRenderer.send('set-video-channels', videoChannels);
  }

  async startArticleTask() {
    const [
      watchArticleTask,
      ,
      watchArticleTimeTask,
      ,
    ] = await getUsableRateScoreTasks();
  
    if (isDone(watchArticleTask) && isDone(watchArticleTimeTask)) {
      return;
    }
  
    const channel = getRandomElement(this.articleChannels);
    ipcRenderer.send('log', '文章地址：', channel.url);
    ipcRenderer.send('create-article-view', {
      url: channel.url,
    });
  };
  
  async startVideoTask() {
    const [
      ,
      watchVideoTask,
      ,
      watchVideoTimeTask,
    ] = await getUsableRateScoreTasks();

    if (isDone(watchVideoTask) && isDone(watchVideoTimeTask)) {
      return;
    }
  
    const channel = getRandomElement(this.videoChannels);
    ipcRenderer.send('log', '视频地址：', channel.url);
    ipcRenderer.send('create-video-view', {
      url: channel.url,
    });
  };
  
  async startFastVideoTask() {
    const [
      ,
      watchVideoTask,
      ,
      watchVideoTimeTask,
    ] = await getUsableRateScoreTasks();
  
    if (isDone(watchVideoTask) && isDone(watchVideoTimeTask)) {
      return;
    }
  
    const channel = getRandomElement(this.videoChannels);
    ipcRenderer.send('log', '快速视频地址：', channel.url);
    ipcRenderer.send('create-fast-video-view', {
      url: channel.url,
    });
  };

  async checkIsOver() {
    const [
      watchArticleTask,
      watchVideoTask,
      watchArticleTimeTask,
      watchVideoTimeTask,
    ] = await getUsableRateScoreTasks();

    if (
      isDone(watchArticleTask) &&
      isDone(watchVideoTask) &&
      isDone(watchArticleTimeTask) &&
      isDone(watchVideoTimeTask)
    ) {
      ipcRenderer.send('close-task');
      // 开启，让 notification 有提示音
      ipcRenderer.send('set-app-audio-muted', false);

      notify({ body: `${config.tipsPrefix}今日积分已经满啦`});

      const $tips: HTMLElement = document.getElementById('task-tips');
      $tips.innerHTML = '恭喜，今日积分已满';
      $tips.style.color = '#ff0000';
    }
  };

  watch() {
    ipcRenderer.on('watch-article', async () => {
      showScoreDetail();
      this.checkIsOver();
    });
  
    ipcRenderer.on('watch-video', () => {
      showScoreDetail();
      this.checkIsOver();
    });
  }

  async runTask() {
    try {
      await this.initialize();
      await showScoreDetail();
      await this.startArticleTask();
      await delay(1000);
      await this.startArticleTask();
      await delay(1000);
      await this.startVideoTask();
      await delay(1000);
      await this.startFastVideoTask();
      await delay(1000);
      await this.startFastVideoTask();
      this.checkIsOver();
    } catch (error) {
      console.log(error);
    }
    
  };
}