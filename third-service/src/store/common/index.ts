import { action, observable } from 'mobx';
import { sendMessageParams, ModalData, LoginForm } from './interface';
import * as CommonApi from '@api/common';
import professionList from '@assert/professionList';
const initCustomModal: ModalData = {
  show: false,
  title: '提示',
  content: '',
  subTitle: '',
  showCancel: true,
  cancelText: '取消',
  cancelActive: false,
  confirmActive: true,
  showConfirm: true,
  confirmText: '确定',
  clickCancel: () => {},
  clickConfirm: () => {},
};
professionList.root.forEach((item: any, index: number) => {
  item.value = index;
  item.children.forEach((cItem: any, cIndex: number) => {
    cItem.value = cIndex;
  });
});
class CommonStore {
  @observable token = '';
  @observable serviceRecordId = '';
  // user = localStorage.getItem('user') || ''
  @observable userInfo = {};
  // 判断环境 来显示tab栏
  @observable env = '';

  @action sendMessage = (params: sendMessageParams) => {
    return CommonApi.sendMessage(params);
  };
  @action setToken = async (token: string) => {
    localStorage.setItem('third_token', token);
    this.token = token;
    let res = await this.getInfo();
    this.setUserInfo(res);
    localStorage.setItem('user', JSON.stringify(res));
  };
  @action login = (data: LoginForm) => {
    return CommonApi.login(data);
  };
  @action setServiceRecordId = (serviceRecordId: string) => {
    this.serviceRecordId = serviceRecordId;
  };
  @action setUserInfo = (userInfo: any) => {
    this.userInfo = userInfo;
  };
  @action getInfo = () => {
    return CommonApi.getInfo();
  };
  @action setEnv = (env: string) => {
    this.env = env;
  };
  @observable customModal = initCustomModal;
  @action setModal = (data: ModalData) => {
    this.customModal = Object.assign({}, initCustomModal, data);
    console.log(this.customModal);
  };
  @action initModal = () => {
    this.customModal = initCustomModal;
  };
  @action checkMobileAndValidCode = (data: {
    mobile: string;
    validCode: string;
  }) => {
    return CommonApi.checkMobileAndValidCode(data);
  };
  @action getProtocol = (data: string) => {
    return CommonApi.getProtocol(data);
  };
  @action agreeNotification = () => {
    return CommonApi.agreeNotification();
  };
  @observable proviceList = [];
  @action getProviceList = () => {
    CommonApi.getAllProvice().then((res: any) => {
      res &&
        res.length &&
        res.forEach((item: any, index: number) => {
          item.label = item.provinceName;
          item.value = index;
          item.cities &&
            item.cities.forEach((cItem: any, cIndex: number) => {
              cItem.label = cItem.cityName;
              cItem.value = cIndex;
            });
          item.children = item.cities || [];
        });
      this.proviceList = res || [];
    });
  };
  @observable professionList = professionList.root;
  @action getConfig = () => {
    return CommonApi.getConfig();
  };
}
export default new CommonStore();
