import { action, observable } from 'mobx';
import {
  getQuestionnaireParams,
  subInfo,
  QuestionnaireDetail,
} from './interface';
import * as QuestionnaireApi from '@api/questionnaire';
class QuestionnaireStore {
  // 获取答题的数据
  @action getQuestionnaire = (params: getQuestionnaireParams) => {
    return QuestionnaireApi.getQuestionnaire(params);
  };
  @action getHealthInfo = () => {
    return QuestionnaireApi.getHealthInfo();
  };
  @observable subInfo: subInfo = {
    age: 0,
    answerReqs: [],
    code: '',
    mobile: '',
    name: '',
    serviceRecordId: '',
    sex: 0,
    bmi: 0,
    height: 0,
    weight: 0,
    answerText: '',
  };
  // 更改提交的数据
  @action setSubInfo = (obj: any) => {
    this.subInfo = {
      ...this.subInfo,
      ...obj,
    };
  };
  @action addQuestionnaire = (params: subInfo) => {
    return QuestionnaireApi.addQuestionnaire(params);
  };
  // 问券列表
  @observable questionnaire: QuestionnaireDetail[] = [];
  @action setQuestionnaire = (data: QuestionnaireDetail[]) => {
    this.questionnaire = data;
  };
  @action getCustomConfig = async (data: { questionnaireId: string }) => {
    // let res = await  QuestionnaireApi.getCustomConfig(data).then((res: any) => {
    //     this.customConfig = res
    // })
    let res = await QuestionnaireApi.getCustomConfig(data);
    res.questionnaireList =
      res.questionnaireVo && res.questionnaireVo.questionnaire[0].questions;
    this.customConfig = res;
    return Promise.resolve(res);
  };
  setCustomConfig = (data: any) => {
    console.log(data);
    this.customConfig = Object.assign({}, this.customConfig, data);
  };
  @observable customConfig = {};
  @observable postData = {};
  @action setPostData = (data: any) => {
    this.postData = Object.assign({}, this.postData, data);
    console.log(this.postData);
  };
}
export default new QuestionnaireStore();
