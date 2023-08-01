/** @format */

import request from '@utils/request';
// 保存健康档案
export const saveHealth = (data: any) => {
  return request({
    url: '/tApi/healthFile/save',
    method: 'post',
    data,
  });
};

// 获取健康档案
export const getHealth = () => {
  return request({
    url: '/tApi/healthFile/getAllFiles',
    method: 'get',
  });
};
/**
 * 跳过更新步数
 * @param step
 * @returns
 */
export const updateStep = (step: number) => {
  return request({
    url: '/tApi/healthFile/updateStep',
    method: 'post',
    data: {
      step,
    },
  });
};
