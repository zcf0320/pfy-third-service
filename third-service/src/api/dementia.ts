/** @format */

import request from '@utils/request';
export const saveInfo = (data: any) => {
  return request({
    url: '/tApi/uc-old-man/saveInfo',
    method: 'post',
    data,
  });
};
export const getDayFood = () => {
  return request({
    url: '/tApi/uc-food-recommend/getDayFood',
    method: 'get',
  });
};
/**
 * 获取问卷使用记录
 * @param serviceRecordId
 * @returns
 */
export const getRecordListByServiceRecordId = (serviceRecordId: string) => {
  return request({
    url: `/tApi/questionnaire/getListByRecordId?serviceRecordId=${serviceRecordId}`,
    method: 'get',
  });
};
