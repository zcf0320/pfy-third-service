import { sendMessageParams } from '../common/interface';
import {
  getQuestionnaireParams,
  QuestionnaireDetail,
  subInfo,
} from '../questionnaire/interface';
import { ConclusionParams } from '../healthyHeight/interface';
import { ServiceMarketStore } from '../serviceMarket/interface';
import { zhInsuranceStore } from '../zhInsurance/interface';
import { addDailyHealthParams } from '../healthRecord/interface';
import { dateFrom } from '../points/interface';
import { listItem } from 'page/healthRecord/data';
export interface CommonStore {
  sendMessage: (params: sendMessageParams) => any;
  serviceRecordId: string;
  setEnv: (env: string) => any;
  env: string;
  userInfo: any;
  setUserInfo: (data: any) => any;
  setToken: (data: string) => void;
  getInfo: () => any;
  checkMobileAndValidCode: (data: any) => void;
  getProtocol: (data: string) => void;
  getConfig: () => any;
  setServiceRecordId: (data: string) => any;
}
export interface QuestionnaireStore {
  getQuestionnaire: (params: getQuestionnaireParams) => any;
  setQuestionnaire: (data: QuestionnaireDetail[]) => any;
  addQuestionnaire: (data: subInfo) => any;
  questionnaire: QuestionnaireDetail[];
  subInfo: subInfo;
  postData: any;
  setCustomConfig: (data: any) => any;
  setPostData: (data: any) => any;
}

export interface HealthyHeightStore {
  getConclusion: (params: ConclusionParams) => any;
}
export interface pointsStore {
  getHealthRecords: (params: dateFrom) => any;
  setHealthRecords: (data: any) => any;
  recordList: any;
  setTodayData: (data: any) => any;
  todayData: any;
}
export interface healthRecordStore {
  healthyFile: any;
  setHealthyFile: (data: any) => void;
  delHealthyFile: (data: string) => void;
  currentIndex: number;
  setCurrentIndex: (data: number) => void;
  healthList: Array<listItem>;
  setHealthList: (data: Array<listItem>) => void;
  fileType: string | null;
  setFileType: (data: string) => void;
  saveBlood: (data: addDailyHealthParams) => void;
}

export interface PerfectRecordStore {
  healthData: any;
  allRegionList: any;
  deleteHealthDataKey: (key: string) => void;
  setHealthData: (data: any) => void;
  getAllRegion: () => void;
  getHealthData: () => void;
}

export interface DiabetsStore {
  diabetsData: any;
  updataData: (data: any) => void;
  saveDisabets: (data: any) => any;
  saveSugar: (data: any) => any;
  getDisabets: (data: any) => any;
  getSugar: (data: any) => any;
  getCharts: (data: any) => any;
}

export interface IStore {
  commonStore: CommonStore;
  questionnaireStore: QuestionnaireStore;
  healthyHeightStore: HealthyHeightStore;
  zhInsuranceStore: zhInsuranceStore;
  pointsStore: pointsStore;
  HealthRecordStore: healthRecordStore;
  serviceMarketStore: ServiceMarketStore;
  perfectRecordStore: PerfectRecordStore;
  diabetsStore: DiabetsStore;
}
