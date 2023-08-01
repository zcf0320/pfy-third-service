export interface getQuestionnaireParams {
  code: String;
}
export interface subInfo {
  age?: number;
  answerReqs?: answerReqs[];
  code?: string;
  mobile?: string;
  name?: string;
  serviceRecordId?: string;
  sex?: number;
  bmi?: number;
  height?: number;
  weight?: number;
  answerText?: string;
}
export interface answerReqs {
  answerIds: number[];
  answerText?: string;
  questionId: number;
}
export interface Questionnaire {
  questionnaire?: [];
}
export interface QuestionnaireDetail {
  partId: number;
  partName: string;
  questions: questions[];
}
export interface questions {
  answerType: number;
  answers: answers[];
  questionId: number;
  questionName: string;
  questionRemark: string;
}
export interface answers {
  answerId: number;
  answerName: string;
  select?: boolean;
}
export interface isTimeLegalParams {
  channelCode: string;
  questionnaireCode: string;
}
