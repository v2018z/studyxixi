import { ipcRenderer, Menu, MessageBoxReturnValue, } from 'electron';
import * as path from 'path';
import { domContentLoaded, delay } from '../utils';
import { onLogin, isLoggedIn, getUserInfo } from '../login';
import { loginUrl, homeUrl, waitImageUrl } from '../urls';
import { config } from '../config';
import Task from '../task';
import { showScoreDetail } from '../score';

const showTaskControl = async (task: Task) => {
  let isShow = config.showTaskWindow;
  (document.querySelector('.menu .login') as HTMLElement).style.width = '100%';
  const $control = document.createElement('span');
  $control.innerHTML = `【${isShow ? '隐藏任务面板' : '显示任务面板'}】`;
  $control.style.cursor = 'pointer';
  document.querySelector('.menu .logged-text').appendChild($control);

	renderAutoAnswer(task);

	const $retry = document.createElement('a');
	$retry.innerHTML = `【重启任务】`;
  $retry.style.cursor = 'pointer';
	$retry.style.color = '#ff0000';
  document.querySelector('.menu .logged-text').appendChild($retry);

  $control.addEventListener('click', () => {
    isShow = !isShow;
    ipcRenderer.send('toggle-task-window', isShow);
    $control.innerHTML = `【${isShow ? '隐藏任务面板' : '显示任务面板'}】`;
  });

	$retry.addEventListener('click', async() => {
		const result: MessageBoxReturnValue = await ipcRenderer.invoke('show-dialog-message', {
			type:'info',
			title:'重启任务',
			message:'任务卡住？试试重启任务吧',
			detail: '不要频繁使用，防止完成任务时间过长',
			buttons:['确定','取消'],
		})
		if (result.response == 0) {
			const $tips: HTMLElement = document.getElementById('task-tips');
			$tips.innerHTML = '任务已重启，自动在后台执行, 不要着急';
			$tips.style.color = '#000';
			task.retry();
		}
  });
};

const renderAutoAnswer = async (task: Task) => {
	const answerAutoState = localStorage.getItem('answer-auto-state');
	const isAuto = answerAutoState != '2';
	const $auto = document.getElementById('answer-auto') || document.createElement('a');
	$auto.id = 'answer-auto';
	let h = isAuto ? `【取消自动答题】` : '【自动答题】';
	$auto.innerHTML = h;
  $auto.style.cursor = 'pointer';
  document.querySelector('.menu .logged-text').appendChild($auto);

	if (isAuto && !task.answerRunning) {
		task.answer();
	}

	async function t() {
		const result: MessageBoxReturnValue = await ipcRenderer.invoke('show-dialog-message', {
			type:'info',
			title:'关于自动答题',
			message:`${'是否要' + h} ${isAuto ? '\n（每日答题不受影响）': ''}`,
			detail: isAuto ? '下次启动生效' : '',
			buttons:['确定','取消'],
		})
		if (result.response == 0) {
			localStorage.setItem('answer-auto-state',  isAuto ? '2' : '1');
			renderAutoAnswer(task);
			$auto.removeEventListener('click',t);
		}
	}
	$auto.addEventListener('click',t);
}


/**
 * 重新绘制页面
 */
const reRenderPage = async () => {
  const userInfo = await getUserInfo();

  const observer = new MutationObserver(async () => {
    document
      .querySelectorAll('.xuexi, .menu-list, .search-icon, section, footer')
      .forEach((element: any) => {
        if (element.style.display === 'none') return;
        element.style.display = 'none';
      });

    if (document.getElementById('waiting-img')) {
      return;
    }

    // 关闭闪屏页
    ipcRenderer.send('close-win-splash');

    (document.querySelector('.logged-link') as HTMLElement).style.fontSize ='18px';
    (document.querySelector('.menu') as HTMLElement).style.minWidth = '100%';

    // 替换用户名
    if (userInfo.nick) {
      (document.querySelector('.menu .login') as HTMLElement).style.width = '400px';
      document.querySelector('.logged-text > span').innerHTML = `${userInfo.nick}，欢迎您`
    }

    const $body = document.querySelector('body');
    $body.style.overflow = 'hidden';
    $body.style.minWidth = '100%';
    $body.style.width = '100%';

    const $img = document.createElement('img');
    $img.id = 'waiting-img';
    $img.src = `file://${path.join(__dirname, '../../tasking.gif')}`;
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
  });

  observer.observe(document.querySelector('body'), {
    childList: true,
    subtree: true,
  });
}

/**
 * 每个页面跳转都会执行哦
 */

domContentLoaded(async () => {
  console.log('页面加载完成');

  // 默认静音
  ipcRenderer.send('set-app-audio-muted', true);

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

  const task = new Task();

  reRenderPage();

  showScoreDetail();

  task.runTask().then(() => showTaskControl(task));

	setTimeout(() => {
		location.href = location.href;
	}, 60 * 1000 * 60 * 6);
});
