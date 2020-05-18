import { Base64 } from 'js-base64';
import { dailyAnswresQueryAPIUrl, dailyAnswresSubmitAPIUrl, dailyAnswersUrl } from '../urls';
import { DailyQuestionInfoT, DailySubmiT } from './types';

/**
 * 获取每日答题相关信息
 */
export const queryDailyQuestions = async() => {
  const res = await fetch(dailyAnswresQueryAPIUrl , { 
    credentials: 'include',
    referrer: dailyAnswersUrl,
  });
  const rs = await res.json();
  if (rs.code !== 200) {
      throw new Error(rs.error);
  }
  const { data_str } = rs;
  const questionInfo: DailyQuestionInfoT = JSON.parse(Base64.decode(data_str));
  return questionInfo;
}

/**
 * 提交每日答案
 * @param uniqueId 
 * @param questions 答案
 * @param usedTime 使用时间
 */
export const submitDailyAnswer = async(params: DailySubmiT) => {
  const payload = {
    activityCode: 'QUIZ_ALL',
    ...params,
  }
  const res = await fetch(dailyAnswresSubmitAPIUrl, {
    method: 'POST',
    credentials: 'include',
    referrer: dailyAnswersUrl,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.error);
  }
  return rs;
}