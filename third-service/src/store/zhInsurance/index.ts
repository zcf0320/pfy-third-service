/** @format */

import { timeFormat } from '@utils/filter';
import { action, observable } from 'mobx';
import * as zhInsuranceApi from '../../api/zhInsurance';
import {
  loginForm,
  proviceForm,
  reserveDetailForm,
  reserveForm,
  siteForm,
  timeForm,
  serviceForm,
  ServiceInfoForm,
  authForm,
  dateForm,
} from './interface';
class zhInsuranceStore {
  @action login = (data: loginForm) => {
    return zhInsuranceApi.login(data);
  };
  @action idCardLogin = (data: loginForm) => {
    return zhInsuranceApi.idCardLogin(data);
  };
  @action auth = (data: authForm) => {
    return zhInsuranceApi.auth(data);
  };
  @observable serviceList = [];
  @action getServiceList = (data: serviceForm) => {
    return zhInsuranceApi.getServiceRecord(data);
    // .then((res: any) => {
    //     this.serviceList = res
    // }).catch((err: any) => {

    // })
  };
  @action setServiceList = (data: any) => {
    this.serviceList = data;
  };
  @observable priviceList = [];
  @observable comePriviceList = [];
  @action getProviceList = (data: proviceForm) => {
    zhInsuranceApi.proviceAndCity(data).then((res: any) => {
      // 处理数据
      res &&
        res.length &&
        res.forEach((item: any, index: number) => {
          item.label = item.provinceName;
          item.value = index;
          item.cities &&
            item.cities.forEach((cItem: any, cIndex: number) => {
              cItem.label = cItem.cityName;
              cItem.value = cIndex;
            });
          item.children = item.cities || [];
        });
      this.priviceList = res || [];
    });
  };
  @observable siteList = [];
  @action getSiteList = (data: siteForm) => {
    zhInsuranceApi.sites(data).then((res: any) => {
      res.length &&
        res.forEach((item: any, index: number) => {
          item.label = item.serviceSiteName;
          item.value = index;
        });
      this.siteList = res || [];
    });
  };
  @action setSiteList = (data: any) => {
    this.siteList = data;
  };
  @observable timeList = [];
  @action getTimeList = (data: timeForm) => {
    zhInsuranceApi.times(data).then((res: any) => {
      let result: any = [];
      res.length &&
        res.forEach((item: any, index: number) => {
          result.push({
            label: item,
            value: index,
          });
        });
      this.timeList = result;
    });
  };
  @action setTimeList = (data: any) => {
    this.timeList = data;
  };
  @action save = (data: reserveForm) => {
    return zhInsuranceApi.mouseReserve(data);
  };
  @action reserveDetail = (data: reserveDetailForm) => {
    return zhInsuranceApi.getReserve(data);
  };
  @observable allSiteList = [];
  @action getServiceInfo = (data: ServiceInfoForm) => {
    zhInsuranceApi.getServiceInfo(data).then((res: any) => {
      res.provinces &&
        res.provinces.length &&
        res.provinces.forEach((item: any, index: number) => {
          item.label = item.provinceName;
          item.value = index;
          item.cities &&
            item.cities.forEach((cItem: any, cIndex: number) => {
              cItem.label = cItem.cityName;
              cItem.value = cIndex;
            });
          item.children = item.cities || [];
        });
      this.priviceList = res.provinces;
      res.comeCitys &&
        res.comeCitys.length &&
        res.comeCitys.forEach((item: any, index: number) => {
          item.label = item.provName;
          item.value = index;
          item.cityList &&
            item.cityList.forEach((cItem: any, cIndex: number) => {
              cItem.label = cItem.cityName;
              cItem.value = cIndex;
            });
          item.children = item.cityList || [];
        });
      this.comePriviceList = res.comeCitys;

      // res.sites.length && res.sites.map((item: any, index: number) => {
      //     item.label = item.address
      //     item.value = index
      // })
      this.allSiteList = res.sites;
    });
  };
  @action add = (data: any) => {
    return zhInsuranceApi.add(data);
  };
  @observable commitUserdemand = false;
  @observable userDetailCodeList = [];
  @action getMaterialList = (data: { serviceRecordId: string }) => {
    zhInsuranceApi.getNeedMaterials(data).then((res: any) => {
      const { materialList, commitUserdemand, userDetailCodeList } = res;
      materialList.forEach((item: any) => {
        item.files = [];
      });
      this.materialList = materialList || [];
      this.commitUserdemand = commitUserdemand || false;
      this.userDetailCodeList = userDetailCodeList || [];
    });
  };
  @observable materialList = [];
  @action setMaterialList = (data: any) => {
    this.materialList = data;
  };
  @observable dateList = [];

  @action getDateList = (data: dateForm) => {
    zhInsuranceApi.getDate(data).then((res: any) => {
      if (res && res.length) {
        res.forEach((item: any) => {
          item.appDate = timeFormat(
            new Date(item.AppDate).getTime(),
            'y年m月d日'
          );
          item.label = item.appDate;
          item.value = item.AppDate;
        });
      }
      this.dateList = res || [];
    });
  };
  @action setDateList = (data: any) => {
    this.dateList = data;
  };
  @observable reserveConfigRelationVo = [];
  @observable reseverMaterialConfigVos = [];
  @action setReseverMaterialConfigVos = (data: any) => {
    this.reseverMaterialConfigVos = data;
  };
  @action getReserveConfig = (id: string) => {
    zhInsuranceApi.getReserveConfig(id).then((res: any) => {
      this.reserveConfigRelationVo = res.reserveConfigRelationVo;
      res.reseverMaterialConfigVos.forEach((item: any) => {
        item.files = [];
      });
      this.reseverMaterialConfigVos = res.reseverMaterialConfigVos;
    });
  };
}
export default new zhInsuranceStore();
