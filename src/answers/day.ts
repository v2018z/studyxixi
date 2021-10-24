import { domContentLoaded, notify } from '../utils';
import { queryDailyQuestions, submitDailyAnswer } from './api';
import { DailyQuestionsT, DailySubmitT } from './types';
import { ipcRenderer, remote } from 'electron';
import { config } from '../config';
import { showScoreDetail, getRateScore } from '../score';

export const runTask = async () => {
  try {
    const data = await queryDailyQuestions();
    const { questions, uniqueId }= data;
    const submitPayload = buildCorrectAnswers(questions, uniqueId);
    try {
      const res = await submitDailyAnswer(submitPayload);
      ipcRenderer.send('log', '提交答案成功', res);
    } catch (error) {
      ipcRenderer.send('log', '提交答案失败', error);
      throw new Error(error);
    }
  } catch (error) {
    throw new Error('每日题目获取失败');
  }
}

const buildCorrectAnswers = (questions: DailyQuestionsT[], uniqueId: string) => {
  const submitQuestions = questions.map((q) => {
    return {
      questionId: q.questionId,
      answers: q.correct,
      correct: true,
    };
  });

  const userTime = 180 + Math.floor(Math.random() * 180);
  const submitParams: DailySubmitT = { questions: submitQuestions, uniqueId, usedTime: 3 * 60 + userTime };
  return submitParams;
}

domContentLoaded(async () => {
  ipcRenderer.send('log', '开始每日答题');

  const rates = await getRateScore();
  const rate = rates.find((r) => (r.taskCode.includes('6')));

  if (rate.currentScore !== 0) {
    notify({ body: `${config.tipsPrefix}今日已答题完毕！`});
    return;
  }

  runTask().then(() => {
    notify({ body: `${config.tipsPrefix}每日答题任务完成！`});
    showScoreDetail();
  }).catch((error) => {
    notify({ body: error.message});
  });
});
