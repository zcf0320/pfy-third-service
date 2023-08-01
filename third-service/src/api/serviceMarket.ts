import request from '@utils/request';

// 查询供应商信息
export const getSupplierDetail = (id: string) => {
  return request({
    url: `/sApi/market/servicePlan/item/supplier?id=${id}`,
    method: 'GET',
  });
};
