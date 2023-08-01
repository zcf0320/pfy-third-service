/** @format */

import React, { useState, useEffect } from 'react';
import { getUrlParams, codeMap, checkPhone } from '@utils/filter';
import { useStores } from '@utils/useStore';
import { Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import './index.scss';

import Page from '@components/Page';
import { isTimeLegal } from '@api/questionnaire';
const selectIcon = require('@assert/select.png');
const nameIcon = require('@assert/name.png');
const mobileIcon = require('@assert/mobile.png');
const ageIcon = require('@assert/age.png');
const sexIcon = require('@assert/sex.png');
const manIcon = require('@assert/man.png');
const womanIcon = require('@assert/woman.png');
const Info = () => {
  const commonStore = useStores('commonStore');
  const store = useStores('questionnaireStore');
  const history = useHistory();
  const [info, setInfo] = useState<any>({
    name: '',
    mobile: '',
    sex: '',
    age: '',
  });
  const [type, setType] = useState(0);
  const [select, setSelect] = useState(false);
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
    setType(codeMap[code]);
    let env = getUrlParams('env');
    let token = getUrlParams('token');
    let serviceRecordId = getUrlParams('serviceRecordId');
    serviceRecordId && commonStore.setServiceRecordId(serviceRecordId);

    env && commonStore.setEnv(env);
    document.title = '确认信息';
    if (token) {
      // 获取用户信息
      commonStore.setToken(token);
      localStorage.setItem('third_token', token);
      commonStore.getInfo().then((res: any) => {
        commonStore.setUserInfo(res);
        localStorage.setItem('user', JSON.stringify(res));
        setInfo({
          name: res.name || '',
          mobile: res.mobile || '',
          sex: res.sex,
          age: res.age || '',
        });
      });
    } else {
      localStorage.removeItem('third_token');
    }
  }, [commonStore]);
  // 监听数据是否填完信息
  const watchInfo = () => {
    const { name, mobile, sex, age } = info;
    let result = !!(name.length && mobile.length);
    if (type !== 1 && type !== 2) {
      result = result && !!(sex !== '' && String(age).length);
    }
    result = result && select;
    return result;
  };
  // 提交数据
  const subInfo = () => {
    if (!watchInfo()) {
      return;
    }
    const { sex, name, mobile, age } = info;
    // 校验手机号
    let error = '';
    if (!checkPhone(mobile)) {
      error = '请输入正确的手机号';
    }
    // if ( sex !== '男' && sex !== '女' && (type !== 1 && type !== 2) ){
    //     error = '性别请输入男或女'
    //     Toast.info('性别请输入男或女', 3)
    //     return
    // }
    if ((Number(age) < 0 || !age) && type !== 1 && type !== 2) {
      error = '请输入正确的年龄';
    }
    if (error) {
      Toast.info(error, 3);
      return;
    }
    store.setSubInfo({
      code: getUrlParams('code'),
      name,
      mobile,
      age: Number(age),
      sex: sex,
    });
    if (!getUrlParams('channelId')) {
      commonStore.agreeNotification().then(() => {});
    }
    history.push(
      `/questionnaire/newAnswer?code=${getUrlParams('code')}&channelId=${
        getUrlParams('channelId') || ''
      }`
    );
  };

  return (
    <Page title='确认信息'>
      {isAjax && isLegal ? (
        <div className='page-info flex'>
          <div className='center flex'>
            <div className='info-content'>
              <div className='item'>
                <div className='title'>真实姓名</div>
                <div className='input-content flex'>
                  <img alt='' src={nameIcon} className='icon'></img>
                  <input
                    type='text'
                    name=''
                    id=''
                    className='text'
                    placeholder='请输入真实姓名'
                    value={info.name}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className='item'>
                <div className='title'>手机号</div>
                <div className='input-content flex'>
                  <img alt='' src={mobileIcon} className='icon'></img>
                  <input
                    type='text'
                    name=''
                    id=''
                    className='text'
                    placeholder='请输入手机号'
                    maxLength={11}
                    value={info.mobile}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        mobile: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {type > 2 && (
                <div className='item'>
                  <div className='title'>年龄</div>
                  <div className='input-content flex'>
                    <img alt='' src={ageIcon} className='icon'></img>
                    <input
                      type='number'
                      name=''
                      id=''
                      className='text'
                      placeholder='请输入您的年龄'
                      value={info.age}
                      onChange={(e) =>
                        setInfo({
                          ...info,
                          age: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
              {type > 2 && (
                <div className='item'>
                  <div className='item-sex flex'>
                    <img src={sexIcon} alt='' sizes='' className='sex' />
                    <span className='sex-title'>选择性别</span>
                    <div
                      className={`sex-item man flex ${
                        info.sex === 1 ? 'active' : ''
                      }`}
                      onClick={() => {
                        setInfo({
                          ...info,
                          sex: 1,
                        });
                      }}>
                      <div className='sex-item-centent flex'>
                        <img src={manIcon} alt='' className='sex-icon' />
                      </div>
                    </div>
                    <div
                      className={`sex-item flex ${
                        info.sex === 0 ? 'active' : ''
                      }`}
                      onClick={() => {
                        setInfo({
                          ...info,
                          sex: 0,
                        });
                      }}>
                      <div className='sex-item-centent flex'>
                        <img src={womanIcon} alt='' className='sex-icon' />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {type <= 2 ? (
              <img
                alt=''
                src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/start_logo.png'
                className='logo'
              />
            ) : null}
          </div>
          <div
            className={`answer flex ${watchInfo() ? '' : 'disable'}  ${
              type >= 2 ? '' : 'less'
            }`}
            onClick={subInfo}>
            确认并开始答题
          </div>
          <div className='proto flex'>
            <div
              className='area'
              onClick={() => {
                setSelect(!select);
              }}>
              <div className={`select-content flex ${select ? 'active' : ''}`}>
                {select && <img src={selectIcon} alt='' className='select' />}
              </div>
            </div>

            <span className='proto-text'>
              我已阅读并已同意
              <span
                className='text'
                onClick={() => {
                  history.push('/questionnaire/protocal');
                }}>
                《寰宇关爱用户授权使用协议》
              </span>
            </span>
          </div>
        </div>
      ) : null}
      {isAjax && !isLegal ? (
        <div className='none flex'>
          <div className='none-content flex'>
            <div className='none-bg'></div>
            <span>权益已过期</span>
          </div>
        </div>
      ) : null}
      <div className='notice'>
        此（诊断）仅作为自我检测管理的参考，不可替代医疗诊断
      </div>
    </Page>
  );
};
export default Info;
