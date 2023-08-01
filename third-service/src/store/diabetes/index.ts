import { action, observable } from 'mobx';
import * as disabetsApi from '../../api/disabets';
import { getHealthRecords } from '../../api/points';
// import { dateFrom } from './interface';
class DiabetsStore {
  @observable diabetsData = {};
  @action saveDisabets = (params: any) => {
    return disabetsApi.saveDisabets(params);
  };
  @action saveSugar = (params: any) => {
    return disabetsApi.saveSugar(params);
  };
  @action getDisabets = (params: any) => {
    return disabetsApi.getDisabets(params);
  };
  @action getSugar = (params: any) => {
    return disabetsApi.getSugar(params);
  };
  @action getCharts = (params: any) => {
    return getHealthRecords(params);
  };
  @action updataData = (data: any) => {
    this.diabetsData = Object.assign(this.diabetsData, data);
  };
}
export default new DiabetsStore();
