import { action, observable } from 'mobx';
import * as commonApi from '@api/common';
import * as perfectRecordApi from '@api/perfectRecord';

class PerfectRecordStore {
  @observable healthData: any = {};
  @observable allRegionList: any = [];

  // 保存数据
  @action setHealthData = (data: any) => {
    this.healthData = Object.assign({}, this.healthData, data);
  };
  // 删除数据
  @action deleteHealthDataKey = (key: string) => {
    delete this.healthData[key];
  };

  @action getAllRegion = () => {
    // 处理级联地区数据
    commonApi.getAllRegion().then((res: any) => {
      res.forEach((province: any) => {
        province.label = province.provinceName;
        province.value = province.provinceId;
        province.children = province.cities;
        province.children.forEach((city: any) => {
          city.label = city.cityName;
          city.value = city.cityId;
          city.children = city.districts;
          city.children.forEach((region: any) => {
            region.label = region.districtName;
            region.value = region.districtId;
          });
        });
      });
      this.allRegionList = res || [];
    });
  };

  // 获取健康档案数据
  @action getHealthData = async () => {
    await perfectRecordApi.getHealth().then((res: any) => {
      this.healthData = Object.assign({}, res);
    });
  };
}
export default new PerfectRecordStore();
