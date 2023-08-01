/** @format */

import React, { useState, useEffect } from 'react';
import { getUrlParams, codeMap, getNavBarTitle } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { useStores } from '@utils/useStore';
import './index.scss';
import Page from '@components/Page';
import { isTimeLegal } from '@api/questionnaire';
const Start = () => {
  const [type, setType] = useState(0);
  const [title, setTitle] = useState('');
  const commonStore = useStores('commonStore');
  const history = useHistory();
  const [isAjax, setIsAjax] = useState(false);
  const [isLegal, setIsLegal] = useState(true);
  useEffect(() => {
    let questionnaireCode = getUrlParams('code');
    let channelId = getUrlParams('channelId');
    channelId &&
      isTimeLegal({
        questionnaireCode,
        channelCode: channelId,
      }).then((res: any) => {
        setIsLegal(res);
        setIsAjax(true);
      });
    !channelId && setIsAjax(true);
  }, []);
  useEffect(() => {
    let code = getUrlParams('code');
    let type = codeMap[code];
    setType(type);
    setTitle(getNavBarTitle(type));

    let token = getUrlParams('token');
    let serviceRecordId = getUrlParams('serviceRecordId');
    let env = getUrlParams('env');
    serviceRecordId && commonStore.setServiceRecordId(serviceRecordId);
    env && commonStore.setEnv(env);
    document.title = getNavBarTitle(type);
    if (token) {
      // 获取用户信息
      commonStore.setToken(token);
      localStorage.setItem('third_token', token);
      commonStore.getInfo().then((res: any) => {
        commonStore.setUserInfo(res);
        localStorage.setItem('user', JSON.stringify(res));
      });
    } else {
      localStorage.removeItem('third_token');
    }
  }, [commonStore]);
  return (
    <Page title={title}>
      {isAjax && isLegal ? (
        <div className='page-new-start flex'>
          <div className='center'>
            {/* 糖尿病 */}
            {type === 2 && (
              <div className='content flex'>
                <div className='title'>「 寰宇关爱 」邀您健康自测</div>
                <img
                  alt=''
                  src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/start_logo.png'
                  className='logo'
                />
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
              <div className='content flex'>
                <div className='title'>「 寰宇关爱 」邀您健康自测</div>
                <img
                  alt=''
                  src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/start_logo.png'
                  className='logo'
                />
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
                <div className='title'>「 寰宇关爱 」邀您健康自测</div>
                <img
                  alt=''
                  src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/start_logo.png'
                  className='logo'
                />
                <div className='common frist'>
                  2012年我国18岁及以上人口的高血压患病率为
                  <span className='number'>25.20%</span>
                </div>
                <div className='common'>
                  2015年上升至 <span className='number'>27.90%</span>
                </div>
                <div className='common'>
                  2019年中国高血压患病率达到
                  <span className='number'>31.89%</span>
                </div>
                <div className='common'>
                  初步估计、2019年我国18岁及以上人口中患病人数达到
                  <span className='number'>3.58亿</span>人
                </div>
              </div>
            )}

            {/* 膳食 */}
            {type === 1 && (
              <div className='content'>
                <div className='title-food'>「 寰宇关爱 」邀您健康自测</div>
                <img
                  alt=''
                  src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/start_logo.png'
                  className='logo-food'
                />
              </div>
            )}
          </div>
          <div
            className='test flex'
            onClick={() => {
              history.push(
                `/questionnaire/newInfo?code=${getUrlParams(
                  'code'
                )}&token=${getUrlParams('token')}&channelId=${
                  getUrlParams('channelId') || ''
                }`
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
      ) : null}
      <div className='notice'>
        此（诊断）仅作为自我检测管理的参考，不可替代医疗诊断
      </div>
      {isAjax && !isLegal ? (
        <div className='none flex'>
          <div className='none-content flex'>
            <div className='none-bg'></div>
            <span>权益已过期</span>
          </div>
        </div>
      ) : null}
    </Page>
  );
};
export default Start;
