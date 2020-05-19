import { Base64 } from 'js-base64';
import * as qs from 'qs';
import { dailyQuestionUrl, dailyQuestionQueryAPIUrl, dailyAnswerSubmitAPIUrl, 
  specialQuestionAPIUrl, specialQuestionListUrl, specialQuestionUrl, specialQuestionListAPIUrl } from '../urls';
import { DailyQuestionInfoT, DailySubmitT, SpecialQuestionInfoT } from './types';

/**
 * 获取每日答题相关信息
 */
export const queryDailyQuestions = async() => {
  const res = await fetch(dailyQuestionQueryAPIUrl , { 
    credentials: 'include',
    referrer: dailyQuestionUrl,
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
export const submitDailyAnswer = async(params: DailySubmitT) => {
  const payload = {
    activityCode: 'QUIZ_ALL',
    ...params,
  }
  const res = await fetch(dailyAnswerSubmitAPIUrl, {
    method: 'POST',
    credentials: 'include',
    referrer: dailyQuestionUrl,
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

/**
 * 查询专项答题列表
 */
export const querySpecialQuestionList = async () => {
  const payload = {
    pageSize: 50,
    pageNo: 1,
  };
  const res = await fetch(`${specialQuestionListAPIUrl}?${qs.stringify(payload)}` , { 
    credentials: 'include',
    referrer: specialQuestionListUrl,
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
 * 查询专项答题题目
 * @param params 
 */
export const querySpecialQuestions = async (params: { type: number, id: number }) => {
  const payload = {
    ...params,
    force: true,
  };
  const res = await fetch(specialQuestionAPIUrl, {
    credentials: 'include',
    referrer: `${specialQuestionUrl}?id=${payload.id}`,
  });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.errors);
  }
  const { data_str } = rs;
  const questionInfo: SpecialQuestionInfoT = JSON.parse(Base64.decode(data_str));
  return questionInfo;
}