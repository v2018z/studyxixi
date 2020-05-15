import { todayTotalScoreUrl, totalScoreUrl, rateScoreUrl } from './urls';
import { ipcRenderer } from 'electron';

/**
 * 获取总积分
 */
const getTotalScore = async () => {
  const res = await fetch(totalScoreUrl , { credentials: 'include' });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.error);
  }
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
const getRateScore = async (): Promise<RateScoreT[]> => {
  const res = await fetch(rateScoreUrl , { credentials: 'include' });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.error);
  }
  return rs.data.dayScoreDtos;
}

export interface RateScoreT {
	ruleId: number;
	name: string;
	desc: string;
	currentScore: number;
	dayMaxScore: number;
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
    return rate.find(r => r.name === name) || rate.find(r => r.ruleId === ruleId);
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
    return `${rate.name} 积分：${rate.currentScore} / ${rate.dayMaxScore}`;
  });
  const log = `${time} 总积分：${totalScore} 今日积分：${todayTotalScore} ${taskScore.join(' ')}`;
  ipcRenderer.send('log', log);
  const score = { total: totalScore, today: todayTotalScore, types: taskScore };
  ipcRenderer.send('refresh-menu', { score });
}