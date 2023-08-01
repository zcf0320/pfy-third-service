import { action, observable } from 'mobx';
import { listItem } from 'page/healthRecord/data';
import * as healthRecordApi from '@api/healthRecord';
import { addDailyHealthParams } from '@store/healthRecord/interface';
class HealthRecordStore {
  @observable healthyFile: any = {};

  @action delHealthyFile = (data: string) => {
    delete this.healthyFile[data];
  };
  @action setHealthyFile = (data: any) => {
    this.healthyFile = Object.assign({}, this.healthyFile, data);
    // console.log(this.healthyFile)
  };
  // 当前的数组下标
  @observable currentIndex: number = 0;
  @action setCurrentIndex = (data: number) => {
    this.currentIndex = data;
  };
  // 健康问卷list
  @observable healthList: Array<listItem> = [];
  @action setHealthList = (data: Array<listItem>) => {
    this.healthList = data;
  };
  // 1男性 2 女性 3 老人 4 儿童,
  @observable fileType: string | null = null;
  @action setFileType = (data: string) => {
    this.fileType = data;
  };
  @action saveBlood = (data: addDailyHealthParams) => {
    return healthRecordApi.saveBlood(data);
  };
}
export default new HealthRecordStore();
