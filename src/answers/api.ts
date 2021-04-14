import { Base64 } from 'js-base64';
import * as qs from 'qs';
import * as Cookies from 'js-cookie';
import { dailyQuestionUrl, dailyQuestionQueryAPIUrl, dailyAnswerSubmitAPIUrl,
  specialQuestionAPIUrl, specialQuestionListUrl, specialQuestionUrl,
  specialQuestionListAPIUrl, specialAnswerSubmitAPIUrl, weeklyQuestionAPIUrl, weeklyQuestionListAPIUrl, weeklyQuestionListUrl, weeklyQuestionUrl, weeklyAnswerSubmitAPIUrl, pcHomeUrl } from '../urls';
import { DailyQuestionInfoT, DailySubmitT, SpecialQuestionInfoT, SpecialSubmitT, WeeklySubmitT } from './types';

/**
 * 获取每日答题相关信息
 */
export const queryDailyQuestions = async() => {
  const res = await fetch(dailyQuestionQueryAPIUrl , {
    credentials: 'include',
    referrer: dailyQuestionUrl,
    headers: {
      'Referer': dailyQuestionUrl,
    }
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
      'Referer': dailyQuestionUrl,
    },
    body: JSON.stringify(payload),
  });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.message);
  }
  return rs;
}

/**
 * 查询专项答题列表
 */
export const querySpecialInfo = async (pageNo: number = 1, pageSize: number = 50): Promise<any> => {
  const payload = { pageNo, pageSize };
  const res = await fetch(`${specialQuestionListAPIUrl}?${qs.stringify(payload)}` , {
    credentials: 'include',
    referrer: specialQuestionListUrl,
    headers: {
      'Referer': specialQuestionListUrl,
    }
  });
  const rs = await res.json();
  if (rs.code !== 200) {
      throw new Error(rs.error);
  }
  const { data_str } = rs;
  const specialInfo = JSON.parse(Base64.decode(data_str));
  return specialInfo;
}

/**
 * 查询专项答题题目
 * @param params
 */
export const querySpecialQuestions = async (params: { type: number, id: number }) => {
  const payload = {
    forced: true,
    ...params,
  };
  const url  = `${specialQuestionAPIUrl}?${qs.stringify(payload)}`
  const res = await fetch(url, {
    credentials: 'include',
    referrer: `${specialQuestionUrl}?id=${payload.id}`,
    headers: {
      'Referer': `${specialQuestionUrl}?id=${payload.id}`,
    },
  });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.errors);
  }
  const { data_str } = rs;
  const questionInfo: SpecialQuestionInfoT = JSON.parse(Base64.decode(data_str));
  return questionInfo;
}

/**
 * 提交专项答题答案
 */
export const submitSpecialAnswer = async(params: SpecialSubmitT) => {
  const payload = {
    ...params,
  }
  const uaToken = Cookies.get('uaToken');
  const webUmidToken = Cookies.get('webUmidToken');
  const res = await fetch(specialAnswerSubmitAPIUrl, {
    method: 'POST',
    credentials: 'include',
    referrer: `${specialQuestionUrl}?id=${payload.id}`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'uaToken': uaToken,
      'webUmidToken': webUmidToken,
      'Referer': `${specialQuestionUrl}?id=${payload.id}`,
      'User-Agent': navigator.userAgent,
    },
    mode: 'cors',
    body: JSON.stringify(payload),
  });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.message);
  }
  return rs;
}

/**
 * 查询每周答题列表
 */
 export const queryWeeklyInfo = async (pageNo: number = 1, pageSize: number = 50): Promise<any> => {
  const payload = { pageNo, pageSize };
  const res = await fetch(`${weeklyQuestionListAPIUrl}?${qs.stringify(payload)}` , {
    credentials: 'include',
    referrer: weeklyQuestionListUrl,
    headers: {
      'Referer': weeklyQuestionListUrl,
    }
  });
  const rs = await res.json();
  if (rs.code !== 200) {
      throw new Error(rs.error);
  }
  const { data_str } = rs;
  const data = JSON.parse(Base64.decode(data_str));
  return data;
}

export const queryWeeklyQuestions = async (params: { type: number, id: number }) => {
  const payload = {
    forced: true,
    ...params,
  };
  const url  = `${weeklyQuestionAPIUrl}?${qs.stringify(payload)}`
  const res = await fetch(url, {
    credentials: 'include',
    referrer: `${weeklyQuestionUrl}?id=${payload.id}`,
    headers: {
      'Referer': `${weeklyQuestionUrl}?id=${payload.id}`,
    },
  });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.errors);
  }
  const { data_str } = rs;
  const questionInfo: DailyQuestionInfoT = JSON.parse(Base64.decode(data_str));
  return questionInfo;
}

/**
 * 提交每周答题答案
 */
 export const submitWeeklyAnswer = async(params: WeeklySubmitT) => {
  const payload = {
    ...params,
  }
  const uaToken = Cookies.get('uaToken');
  const webUmidToken = Cookies.get('webUmidToken');
  const res = await fetch(weeklyAnswerSubmitAPIUrl, {
    method: 'POST',
    credentials: 'include',
    referrer: pcHomeUrl,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'uaToken': uaToken,
      'webUmidToken': webUmidToken,
      'Referer': pcHomeUrl,
      'User-Agent': navigator.userAgent,
    },
    mode: 'cors',
    body: JSON.stringify(payload),
  });
  const rs = await res.json();
  if (rs.code !== 200) {
    throw new Error(rs.message);
  }
  return rs;
}
