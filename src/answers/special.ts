/**
 * 专项答题
 */

import { querySpecialQuestionList, querySpecialQuestions } from './api';
import { SpecialQuestionInfoT, SpecialQuestionsT } from './types';

const getSpecialQuestionList = async () => {
  const data = await querySpecialQuestionList();
  return data;
}

const runTask = async (params: { type: number, id: number }) => {
  const data: SpecialQuestionInfoT = await querySpecialQuestions({ ...params });
  const { uniqueId, questions } = data;
}

const buildCorrectAnswers = (questions: SpecialQuestionsT[], uniqueId: string) => {
  questions.map((question: SpecialQuestionsT) => {
    checkCorrectAnswer(question);
  });
} 

const checkCorrectAnswer = (question: SpecialQuestionsT) => {
  const { 
    hasDescribe, 
    questionDesc, 
    questionId, 
    answers, 
    body, 
    videoUrl, 
    questionDescOrigin 
  } = question;

  // 选择题
}