/**
 * 专项答题
 */
import { ipcRenderer, remote } from 'electron';
import { querySpecialInfo, querySpecialQuestions, submitSpecialAnswer } from './api';
import { SpecialQuestionInfoT, SpecialQuestionsT, SpecialQuestionAnswerT } from './types';
import { getStrCount, domContentLoaded, notify } from '../utils';
import { config } from '../config';
import { showScoreDetail, getRateScore } from '../score';

const getSpecialList = async () => {
  try {
    const specialInfo = await querySpecialInfo(1, 200);
    const specialList = specialInfo.list;
    const pendingList = specialList.filter((special: any) => special.status !== 2);
    return pendingList;
  } catch (error) {
    return [];
  }
}

export const runTask = async () => {
  const specialList = await getSpecialList();
  return new Promise(async (resolve, reject) => {
    if (specialList.length === 0) {
      reject(new Error('专项答题没有新题目'));
      return;
    }
    const special = specialList[0];
    if (special) {
      const params = { type: 1, id: special.id };
      const questionInfo: SpecialQuestionInfoT = await querySpecialQuestions({ ...params });
      const correctAnswer = buildCorrectAnswer({ id: params.id, type: params.type, questionInfo});
      ipcRenderer.send('log', '构建答案完毕');
      try {
        const res = await submitSpecialAnswer(correctAnswer);
        ipcRenderer.send('log', '提交专项答题答案成功', res);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    }
  })
}

const buildCorrectAnswer = (params: { id: number, type: number, questionInfo: SpecialQuestionInfoT}) => {
  const { id, type, questionInfo} = params;
  const { uniqueId, questions } = questionInfo;
  const correctAnswers = questions.map((question: SpecialQuestionsT) => {
    return checkCorrectAnswer(question);
  });
  const usedTime = 200 + Math.floor(Math.random() * 200);
  return { id, type, uniqueId, questions: correctAnswers, usedTime };
}


const checkCorrectAnswer = (question: SpecialQuestionsT): any => {
  const {
    hasDescribe,
    questionDesc,
    questionId,
    answers,
    body,
    videoUrl,
    questionDescOrigin
  } = question;
  const $corrects = Array.from(new DOMParser().parseFromString(questionDesc, 'text/html')
  .querySelectorAll('font[color=red]')).map((red: HTMLElement) => red.innerText);

  let rs: SpecialQuestionAnswerT[] = [];

  if (hasDescribe) {
    // 选择题
    if(answers.length > 1 && answers[0].label !== '') {
      const questionItemLength = getStrCount(body, '（）') || getStrCount(body, '()');
      if (questionItemLength === answers.length) {
        rs = answers.map((answer) => ({ answerId: answer.answerId, label: answer.label }));
      } else {
        $corrects.forEach((content, index) => {
          const answer = answers.find((as) => as.content === content);
          if (answer && answer.answerId) {
            rs.push({
              answerId: answer.answerId,
              label: answer.label,
            });
          }
        });
      }
      // 没有任何匹配, 就随缘
      if (rs.length === 0) {
        Array(questionItemLength).fill('').forEach((v, index) => {
          const descAnswer = answers[answers.length - index - 1];
          rs.push({
            answerId: descAnswer.answerId,
            label: descAnswer.label,
          });
        });
      }
    }

    // 填空题
    if(answers[0].label === '') {
      rs = answers.map((answer, index) => {
        return {
          answerId: answer.answerId,
          value: $corrects[index] || 'xx',
        }
      });
    }
  } else {
    if (videoUrl === '') {
      rs = [...answers];
    }
  }
  return { questionId, answers: rs };
}

domContentLoaded(async () => {
  ipcRenderer.send('log', '开始专项答题');

  const rates = await getRateScore();
  const rate = rates.find((r) => (r.taskCode.includes('4')));

  if (rate.currentScore !== 0) {
    notify({ body: `${config.tipsPrefix}今日专项已答题完毕！`});
    return;
  }

  runTask().then(() => {
    notify({ body: `${config.tipsPrefix}专项答题任务完成！`});
    showScoreDetail();
  }).catch((error) => {
    ipcRenderer.send('log', error);
    notify({ body: error.message});
  });
})
