export interface loginForm {
  mobile: string;
  vcPolicyNo: string;
}
export interface serviceForm {
  vcPolicyNo: string;
}
export interface siteForm {
  cityId: string;
  serviceInfoId: string;
}
export interface timeForm {
  appDate: string;
  serviceSiteId: string;
}
export interface dateForm {
  serviceSiteId: string;
}
export interface proviceForm {
  // providerId: string,
  serviceInfoId: string;
}
export interface reserveForm {
  addressId: string;
  mobile: string;
  serviceRecordId: string;
  time: number;
  name: string;
  channelId?: string;
}
export interface reserveDetailForm {
  id: string;
}
export interface ServiceInfoForm {
  serviceRecordId: string;
}
export interface authForm {
  idCard: string;
  mobile: string;
  validCode: string;
}
export interface zhInsuranceStore {
  login: (data: loginForm) => any;
  auth: (data: authForm) => any;
  serviceList: any;
  getServiceList: (data: serviceForm) => any;
  priviceList: any;
  comePriviceList: any;
  getProviceList: (data: proviceForm) => any;
  siteList: any;
  getSiteList: (data: siteForm) => any;
  timeList: any;
  allSiteList: any;
  setSiteList: (data: any) => any;
  getTimeList: (data: timeForm) => any;
  setTimeList: (data: any) => any;
  save: (data: reserveForm) => any;
  add: (data: any) => any;
  reserveDetail: (data: reserveDetailForm) => any;
  getServiceInfo: (data: ServiceInfoForm) => any;
  getMaterialList: (data: ServiceInfoForm) => any;
  setMaterialList: (data: any) => any;
  materialList: Array<any>;
  commitUserdemand: boolean;
  userDetailCodeList: Array<string>;
  dateList: Array<any>;
  setDateList: (data: any) => any;
  getDateList: (data: dateForm) => any;
  reserveConfigRelationVo: Array<any>;
  reseverMaterialConfigVos: Array<any>;
  getReserveConfig: (id: string) => any;
  setReseverMaterialConfigVos: (data: any) => any;
}
