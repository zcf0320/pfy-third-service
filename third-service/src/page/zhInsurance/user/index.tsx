import React, { useEffect } from 'react';
import { useStores } from '@utils/useStore';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import './index.scss';
import logo1 from '@assert/logo_1.png';
import logo2 from '@assert/logo_2.png';
import logo3 from '@assert/logo_3.png';
import ServiceItem from './serviceItem';
import { observer } from 'mobx-react';
import { getUrlParams } from '@utils/filter';
function User() {
  const commonStore = useStores('commonStore');
  const zhInsuranceStore = useStores('zhInsuranceStore');
  const history = useHistory();
  useEffect(() => {
    zhInsuranceStore
      .getServiceList({
        vcPolicyNo: getUrlParams('vcPolicyNo'),
      })
      .then((res: any) => {
        zhInsuranceStore.setServiceList(res);
      })
      .catch((err: any) => {
        if (err.code === 40001) {
          localStorage.removeItem('user');
          localStorage.removeItem('third_token');
          history.replace('/zh/login?type=1');
          commonStore.setToken('');
          commonStore.setUserInfo({});
        }
      });
  }, [commonStore, history, zhInsuranceStore]);
  const exit = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('third_token');
    commonStore.setToken('');
    commonStore.setUserInfo({});
    history.replace('/zh/login?type=1');
  };
  const idCard = localStorage.getItem('idCard') || '-';
  return (
    <div className="page-user">
      <div className="top">
        <div className="user flex">
          <span>您好，</span>
          {/* <span>{toJS(commonStore).userInfo.mobile}</span> */}
          <span>用户{idCard || '-'}</span>
        </div>
        <div className="exit flex">
          <div className="exit-icon"></div>
          <span onClick={exit}>退出</span>
        </div>
      </div>
      <div className="tips">
        <div className="yellow">【温馨提示】</div>
        <div className="tips-text">
          <span>
            [重疾绿通]和[二次诊疗]服务使用前需理赔报案，您可拨打中韩保险服务热线
          </span>
          <span className="yellow">4009800800</span>
          <span>进行报案，或致电客服</span>
          <span className="yellow">0574-86713365</span>
          <span>咨询服务。</span>
        </div>
      </div>
      {toJS(zhInsuranceStore).serviceList.length &&
        toJS(zhInsuranceStore).serviceList.map((item: any) => {
          return (
            <div className="content" key={item.insuredName}>
              <div className="title">服务权益（{item.insuredName}）</div>
              {item.serviceRecords.length &&
                item.serviceRecords.map((sItem: any) => {
                  return (
                    <ServiceItem
                      data={sItem}
                      key={sItem.serviceInfoName}
                    ></ServiceItem>
                  );
                })}
            </div>
          );
        })}

      <div className="logo flex">
        <div className="logo-content flex">
          <img src={logo1} alt="" className="logo-1" />
          <img src={logo3} alt="" className="logo-3" />
          <img src={logo2} alt="" className="logo-2" />
        </div>
      </div>
    </div>
  );
}
export default observer(User);
