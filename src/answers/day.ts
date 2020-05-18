import { domContentLoaded } from '../utils';
import { queryDailyQuestions, submitDailyAnswer } from './api';
import { DailyQuestionsT, DailySubmiT } from './types';
import { ipcRenderer } from 'electron';

export const runTask = async () => {
  try {
    const data = await queryDailyQuestions();
    const { questions, uniqueId }= data;
    const submitPayload = buildCorrectAnswers(questions, uniqueId);
    try {
      const res = await submitDailyAnswer(submitPayload);
      ipcRenderer.send('log', '提交答案成功', res);
    } catch (error) {
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

  const submitParams: DailySubmiT = { questions: submitQuestions, uniqueId, usedTime: 3 * 60 };
  return submitParams;
}

domContentLoaded(() => {
  ipcRenderer.send('开始每日答题');
  runTask();
})