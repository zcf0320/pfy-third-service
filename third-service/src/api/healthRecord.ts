/** @format */

import request from '@utils/request';
import { addDailyHealthParams } from '@store/healthRecord/interface';
// 搜索疾病
export const searchDisease = (data: { searchKey: string }) => {
  return request({
    url: '/tApi/medicine/order/searchDisease',
    method: 'get',
    params: data,
  });
};
// 搜索手术
export const searchSurgery = (data: { searchKey: string }) => {
  return request({
    url: '/tApi/surgery/search',
    method: 'get',
    params: data,
  });
};
export const saveHealthyFile = (data: any) => {
  return request({
    url: '/tApi/third/user/update/healthyFile',
    method: 'post',
    data: data,
  });
};
// 保存血糖血压
export const saveBlood = (data: addDailyHealthParams) => {
  return request({
    url: '/tApi/score/task/addDailyHealth',
    method: 'post',
    data: data,
  });
};
/**
 * 获取健康档案详情
 * @param data
 * @returns
 */
export const getHealthFileDetailRecord = (data: any) => {
  return request({
    url: '/tApi/score/task/selectHealthFileDetailRecord',
    method: 'GET',
    params: data,
  });
};
/**
 * 获取图表记录
 * @param data
 * @returns
 */
export const getChartRecord = (healthRecordEnum: string) => {
  return request({
    url: '/tApi/score/task/selectHealthChartRecord',
    method: 'GET',
    params: { healthRecordEnum },
  });
};
