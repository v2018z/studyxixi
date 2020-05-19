export interface DailySubmitT {
  uniqueId: string,
  questions: any[],
  usedTime: number,
}

export interface DailyQuestionInfoT {
  questions: DailyQuestionsT[],
  uniqueId: string,
}

export interface DailyQuestionsT {
  questionId: string,
  correct: {
    answerId: string,
    value: string,
  },
}

export interface SpecialSubmitT {
  id: number,
  type: 1,
  questions: any[],
  usedTime: number,
  uniqueId: string,
}

/**
 * 专项答题的题目
 */
export interface SpecialQuestionInfoT {
  hasDescribe: true,
  questionDesc: string,
  questionId: number,
  answers: {
    answerId: number,
    label: string,
    content: string,
  },
  body: string,
  videoUrl: string,
  questionDescOrigin: string,
}