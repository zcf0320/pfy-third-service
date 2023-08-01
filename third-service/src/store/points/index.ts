import { action, observable } from 'mobx';
import * as pointsApi from '../../api/points';
import { dateFrom } from './interface';
class pointsStore {
  @observable recordList = [];
  @action getHealthRecords = (params: dateFrom) => {
    return pointsApi.getHealthRecords(params);
  };
  @action setHealthRecords = (data: any) => {
    this.recordList = data;
  };

  @observable todayData = '';
  @action setTodayData = (data: any) => {
    this.todayData = data;
  };
}
export default new pointsStore();
