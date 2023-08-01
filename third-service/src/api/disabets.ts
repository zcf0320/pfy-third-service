import request from '@utils/request';
//  保存档案
export const saveDisabets = (data: any) => {
  return request({
    url: '/tApi/uc-diabetes-management/create/or/update',
    method: 'post',
    data,
  });
};
// 保存血糖
export const saveSugar = (data: any) => {
  return request({
    url: '/tApi/uc-diabetes-management/create/or/update/blood/glucose',
    method: 'post',
    data,
  });
};
//  获取档案
export const getDisabets = (serviceRecordId: string) => {
  return request({
    url: `/tApi/uc-diabetes-management/get/${serviceRecordId}`,
    method: 'get',
  });
};
//  获取血糖
export const getSugar = (params: any) => {
  return request({
    url: '/tApi/uc-diabetes-management/get/blood/glucoseDayAndTime',
    method: 'get',
    params,
  });
};
// 创建修改某日某段血糖情况
export const saveDaySugar = (data: any) => {
  return request({
    url: '/tApi/uc-diabetes-management/create/or/update/blood/glucoseDay',
    method: 'post',
    data,
  });
};
// 获取血糖趋势
export const getSugarTrend = (params: any) => {
  return request({
    url: '/tApi/uc-diabetes-management/get/blood/getBloodGlucoseTrend',
    method: 'get',
    params,
  });
};
// 获取血糖统计
export const getSugarStatics = (params: any) => {
  return request({
    url: '/tApi/uc-diabetes-management/get/blood/getBloodGlucoseCount',
    method: 'get',
    params,
  });
};
