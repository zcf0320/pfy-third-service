import { IStore } from './interface';
import commonStore from './common';
import questionnaireStore from './questionnaire';
import healthyHeightStore from './healthyHeight';
import zhInsuranceStore from './zhInsurance';
import pointsStore from './points';
import HealthRecordStore from './healthRecord/index';
import serviceMarketStore from './serviceMarket';
import perfectRecordStore from './perfectRecord';
import diabetsStore from './diabetes';

const Store: IStore = {
  commonStore,
  questionnaireStore,
  healthyHeightStore,
  zhInsuranceStore,
  pointsStore,
  HealthRecordStore,
  serviceMarketStore,
  perfectRecordStore,
  diabetsStore,
};
export default Store;
