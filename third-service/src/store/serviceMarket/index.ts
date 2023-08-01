import { action, observable } from 'mobx';
import * as serviceMarketApi from '../../api/serviceMarket';
class serviceMarketStore {
  // 查询供应商信息
  @observable detail = {};
  @action getSupplierDetail = (data: string) => {
    return serviceMarketApi.getSupplierDetail(data);
  };
  @action setSupplierDetail = (data: any) => {
    this.detail = Object.assign({}, data);
  };
}
export default new serviceMarketStore();
