import request from '@utils/request';

import { ConclusionParams } from '@store/healthyHeight/interface';

export const getConclusion = (params: ConclusionParams) => {
  return request({
    url: '/tApi/height/weight/getConclusion',
    method: 'get',
    params,
  });
};
