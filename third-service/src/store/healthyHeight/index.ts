import { action } from 'mobx';
import * as healthyHeightApi from '../../api/healthyHeight';
import { ConclusionParams } from './interface';

class healthyHeightStore {
  @action getConclusion = (params: ConclusionParams) => {
    return healthyHeightApi.getConclusion(params);
  };
}
export default new healthyHeightStore();
