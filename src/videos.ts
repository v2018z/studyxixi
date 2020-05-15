// import './login';
import { domContentLoaded } from './utils';
import { onLogin, isLoggedIn } from './login';
import { loginUrl, homeUrl } from './urls';
import { getUsableRateScoreTasks, showScoreDetail } from './score';
import { ipcRenderer } from 'electron';

/**
 * 每个页面跳转都会执行哦
 */

domContentLoaded(async () => {
  console.log('页面加载完成');
    
	ipcRenderer.send('log', '看视频');
});