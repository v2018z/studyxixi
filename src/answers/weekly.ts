import { ipcRenderer } from "electron";
import _ = require("lodash");
import { config } from "../config";
import { getRateScore, showScoreDetail } from "../score";
import { domContentLoaded, notify } from "../utils";
import { queryWeeklyInfo, queryWeeklyQuestions, submitWeeklyAnswer } from "./api";
import { DailyQuestionInfoT, DailyQuestionsT, DailySubmitT, WeeklySubmitT } from "./types";

const getWeeklyList = async (): Promise<any> => {
  try {
    const weeklyInfo = await queryWeeklyInfo(1, 200);
    const weeklyList = weeklyInfo.list;
		const practices = weeklyList.map((item: any) => {
			return item.practices;
		});
		const flattenDeeps = _.flattenDeep(practices);
		ipcRenderer.send('log', flattenDeeps);
    const pendingList = flattenDeeps.filter((special: any) => special.status !== 2);
    return pendingList;
  } catch (error) {
    return [];
  }
}

export const runTask = async () => {
	const weeklyList = await getWeeklyList();

	ipcRenderer.send('log', 'weeklyList', weeklyList);

	return new Promise(async (resolve, reject) => {
		if (weeklyList.length === 0) {
			reject(new Error('每周答题没有新题目'));
		}

		const subject = weeklyList[0];
		if (!subject) {
			reject(new Error('每周答题题目获取失败'));
			return;
		};

		const params = { type: 2, id: subject.id };
		const subjectInfo: DailyQuestionInfoT = await queryWeeklyQuestions(params);
		const submitPayload = buildCorrectAnswers(subjectInfo.questions, subjectInfo.uniqueId);
		ipcRenderer.send('log', '构建答案完毕');
		try {
			const correctAnswer:WeeklySubmitT = { ...submitPayload, id: params.id, type: params.type };
			const res = await submitWeeklyAnswer(correctAnswer);
			ipcRenderer.send('log', '提交每周答题答案成功', res);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
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
  ipcRenderer.send('log', '开始每周答题');

  const rates = await getRateScore();
  const rate = rates.find((r) => (r.taskCode.includes('5')));

  if (rate.currentScore !== 0) {
    notify({ body: `${config.tipsPrefix}每周答题已完毕！`});
    return;
  }

  runTask().then(() => {
    notify({ body: `${config.tipsPrefix}每周答题任务完成！`});
    showScoreDetail();
  }).catch((error) => {
    notify({ body: error.message});
  });
});


