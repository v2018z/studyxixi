export interface DailySubmiT{
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