/** @format */

import React, { useState, useEffect } from 'react';
import NavBar from '@components/NavBar';
import { getUrlParams, codeMap, getNavBarTitle } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { useStores } from '@utils/useStore';
import { toJS } from 'mobx';
import './index.scss';
import bg from '@assert/introduce_bg.png';
const Start = () => {
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('');
  const commonStore = useStores('commonStore');
  const history = useHistory();
  useEffect(() => {
    let code = getUrlParams('code');
    let type = codeMap[code];
    setType(type);
    setTitle(getNavBarTitle(type));

    let token = getUrlParams('token');
    let serviceRecordId = getUrlParams('serviceRecordId');
    let env = getUrlParams('env');
    token && commonStore.setToken(token);
    serviceRecordId && commonStore.setServiceRecordId(serviceRecordId);
    env && commonStore.setEnv(env);
    document.title = getNavBarTitle(type);
    if (token) {
      // 获取用户信息
      localStorage.setItem('third_token', token);
      commonStore.getInfo().then((res: any) => {
        commonStore.setUserInfo(res);
        localStorage.setItem('third_token', token);
        localStorage.setItem('user', JSON.stringify(res));
      });
    }
  }, [commonStore]);
  return (
    <div
      className={`page start flex ${
        toJS(commonStore).env !== 'weapp' ? '' : 'weapp'
      }`}>
      {toJS(commonStore).env !== 'weapp' && <NavBar title={title} />}
      <div className='center'>
        {/* 糖尿病 */}
        {type === 2 && (
          <div className='content'>
            <img src={bg} alt='' className='bg' />
            <div className='title'>「 寰宇关爱 」邀您健康自测</div>
            <div className='common frist'>
              据报告，我国是心血管疾病大国，心血管病患病人数达
              <span className='number'>11.6%</span>
            </div>
            <div className='common'>
              糖尿病前期的患病率达到了 <span className='number'>50.1%</span>
            </div>
            <div className='common'>
              按照这一比例，我国糖尿病患者人数已达
              <span className='number'>1.14亿人</span>
            </div>
            <div className='common'>
              糖尿病前期人数接近 <span className='number'>5亿人</span>
            </div>
          </div>
        )}

        {/* 心脏病 */}
        {type === 3 && (
          <div className='content'>
            <img src={bg} alt='' className='bg' />
            <div className='title'>「 寰宇关爱 」邀您健康自测</div>
            <div className='common frist'>
              据报告，我国是心血管疾病大国，心血管病患病人数达
              <span className='number'>2.9亿人</span>
            </div>
            <div className='common'>
              其中冠心病 <span className='number'>1100万</span>
            </div>
            <div className='common'>
              卒中 <span className='number'>1300万</span>
            </div>
          </div>
        )}

        {/* 高血压 */}
        {type === 4 && (
          <div className='content'>
            <img src={bg} alt='' className='bg' />
            <div className='title'>「 寰宇关爱 」邀您健康自测</div>
            <div className='common frist'>
              2012年我国18岁及以上人口的高血压患病率为
              <span className='number'>25.20%</span>
            </div>
            <div className='common'>
              2015年上升至 <span className='number'>31.89%</span>
            </div>
            <div className='common'>
              初步估计、2019年我国18岁及以上人口中患病人数达到
              <span className='number'>3.58亿</span>人
            </div>
          </div>
        )}

        <div
          className='test flex'
          onClick={() => {
            history.push(
              `/questionnaire/info?code=${getUrlParams(
                'code'
              )}&token=${getUrlParams('token')}`
            );
          }}>
          立即测试
        </div>
        <div className='tips'>
          {type === 2 && (
            <span>
              接下来的 「 糖尿病症状自测 」可以帮助了解您得2型糖尿病的风险！
            </span>
          )}
          {type === 3 && (
            <span>
              接下来的 「 心脏病症状自测 」可以帮助您自检是否有心脏病的征兆！
            </span>
          )}
          {type === 4 && (
            <span>
              接下来的 「 高血压症状自测 」可以帮助您自检是否有高血压的征兆！
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Start;
