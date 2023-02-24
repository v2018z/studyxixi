import { todayTotalScoreUrl, totalScoreUrl, rateScoreUrl } from './urls';
import { ipcRenderer } from 'electron';
import { retry } from './utils';

/**
 * 获取总积分
 */
const getTotalScore = async () => {
  const res = await fetch(`${totalScoreUrl}?_t=${+new Date()}` , { credentials: 'include' });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.error);
  }
	console.log(rs);
  return rs.data.score;
}

/**
 * 获取今日总积分
 */
const getTodayTotalScore = async () => {
  const res = await fetch(todayTotalScoreUrl , { credentials: 'include' });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.error);
  }
  return rs.data.score;
}

/**
 * 获取任务列表和积分信息
 */
export const getRateScore = async (): Promise<RateScoreT[]> => {
	const action = async () => {
		const res = await fetch(rateScoreUrl , { credentials: 'include' });
		const rs = await res.json();
		if (rs.code !== 200) {
			throw new Error(rs.error);
		}
		if (rs.data && rs.data.taskProgress) {
			return rs.data.taskProgress;
		}
		throw new Error('任务列表获取失败');
	}
	// @ts-ignore
	return retry(action, 10, 5000);
}

export interface RateScoreT {
	title: string;
	ruleDesc: string;
	currentScore: number;
	dayMaxScore: number;
	taskCode: string[];
}

/**
 * 单任务完成
 * @param rateScore
 */
export const isDone = (rateScore: RateScoreT) => {
  return rateScore.currentScore >= rateScore.dayMaxScore;
}

/**
 * 获取可用的任务列表
 */
export const getUsableRateScoreTasks = async () => {
  const rate = await getRateScore();
  return [['阅读文章', 1],
  ['视听学习', 2],
  ['文章时长', 1002],
  ['视听学习时长', 1003]].map(([name, ruleId]) => {
    return rate.find(r => r.title === name) || rate.find(r => r.taskCode.includes(`${ruleId}`));
  });
}

/**
 * 显示分数详情
 */
export const showScoreDetail = async () => {
  const totalScore = await getTotalScore();
  const todayTotalScore = await getTodayTotalScore();
  const time = new Date().toLocaleString('zh-CN', { hour12: false });
  const taskScore = (await getUsableRateScoreTasks()).map((rate) => {
    return `${rate.title} 积分：${rate.currentScore} / ${rate.dayMaxScore}`;
  });
  const log = `${time} 总积分：${totalScore} 今日积分：${todayTotalScore} ${taskScore.join(' ')}`;
  ipcRenderer.send('log', log);
  const score = { total: totalScore, today: todayTotalScore, types: taskScore };
  ipcRenderer.send('refresh-menu', { score });
}
