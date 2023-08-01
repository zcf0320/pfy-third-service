import request from '@utils/request';
import {
  loginForm,
  authForm,
  siteForm,
  timeForm,
  dateForm,
  proviceForm,
  reserveForm,
  reserveDetailForm,
  serviceForm,
  ServiceInfoForm,
} from '@store/zhInsurance/interface';
export const login = (data: loginForm) => {
  return request({
    url: '/tApi/zhonghang/login',
    method: 'post',
    data,
  });
};
//身份证后六位登录
export const idCardLogin = (data: loginForm) => {
  return request({
    url: '/tApi/zhonghang/loginByIdCardEnd',
    method: 'post',
    data,
  });
};
//中韩认证
export const auth = (data: authForm) => {
  return request({
    url: '/tApi/zhonghang/auth',
    method: 'post',
    data,
  });
};
export const getServiceRecord = (params: serviceForm) => {
  return request({
    url: '/tApi/zhonghang/records',
    method: 'get',
    params,
  });
};
export const proviceAndCity = (params: proviceForm) => {
  return request({
    url: '/tApi/zhonghang/mouse/cities',
    method: 'get',
    params,
  });
};
export const sites = (params: siteForm) => {
  return request({
    url: '/tApi/zhonghang/mouse/sites',
    method: 'get',
    params,
  });
};
export const times = (params: timeForm) => {
  return request({
    url: '/tApi/zhonghang/mouse/times',
    method: 'get',
    params,
  });
};
// 口腔预约
export const mouseReserve = (data: reserveForm) => {
  return request({
    url: '/tApi/zhonghang/mouse/reserve',
    method: 'post',
    data,
  });
};
// 获取预约凭证
export const getReserve = (data: reserveDetailForm) => {
  return request({
    url: '/tApi/zhonghang/mouse/reserve/getResult',
    method: 'get',
    params: data,
  });
};
// 获取服务的城市
export const getServiceInfo = (data: ServiceInfoForm) => {
  return request({
    url: '/tApi/reserve/provider/site',
    method: 'get',
    params: data,
  });
};
export const add = (data: any) => {
  return request({
    url: '/tApi/reserve/add',
    method: 'post',
    data,
  });
};
export const createMobile = (data: any) => {
  return request({
    url: '/tApi/mobile/diagnose/create',
    method: 'post',
    data,
  });
};
// 获取记录列表
export const getRecordList = (data: any) => {
  return request({
    url: '/tApi/reserve/record',
    method: 'get',
    params: data,
  });
};
export const getNeedMaterials = (data: { serviceRecordId: string }) => {
  return request({
    url: '/tApi/second/treatment/needMaterials',
    method: 'get',
    params: data,
  });
};
export const getReport = (data: ServiceInfoForm) => {
  return request({
    url: '/tApi/second/treatment/getReport',
    method: 'get',
    params: data,
  });
};
export const saveMaterials = (data: any) => {
  return request({
    url: '/tApi/second/treatment/create',
    method: 'post',
    data,
  });
};
export const userSecond = (data: any) => {
  return request({
    url: '/tApi/second/treatment/use',
    method: 'post',
    data,
  });
};
export const getTreatmentList = () => {
  return request({
    url: '/tApi/second/treatment/list',
    method: 'get',
  });
};
export const getFailReason = (data: ServiceInfoForm) => {
  return request({
    url: '/tApi/zhonghang/getFailReason',
    method: 'get',
    params: data,
  });
};
export const getDate = (data: dateForm) => {
  return request({
    url: '/tApi/zhonghang/mouse/date',
    method: 'get',
    params: data,
  });
};

export const getReserveConfig = (id: string) => {
  return request({
    url: `/tApi/reserve/getReserveConfig?id=${id}`,
    method: 'get',
  });
};
