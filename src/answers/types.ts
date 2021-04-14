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
  type: number,
  questions: any[],
  usedTime: number,
  uniqueId: string,
}

export interface SpecialQuestionInfoT {
  questions: SpecialQuestionsT[],
  uniqueId: string,
}

export interface SpecialQuestionAnswerT {
  answerId: number,
  label?: string,
  content?: string,
  value?: string,
}

/**
 * 专项答题的题目
 */
export interface SpecialQuestionsT {
  hasDescribe: true,
  questionDesc: string,
  questionId: number,
  answers: SpecialQuestionAnswerT[],
  body: string,
  videoUrl: string,
  questionDescOrigin: string,
}

export interface WeeklySubmitT extends SpecialSubmitT {}
