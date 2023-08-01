/** @format */

import React, { useState, useEffect } from 'react';
import NavBar from '@components/NavBar';
import { getUrlParams, codeMap, checkPhone } from '@utils/filter';
import { useStores } from '@utils/useStore';
import { Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import './index.scss';
const selectIcon = require('@assert/select.png');
const Info = () => {
  const commonStore = useStores('commonStore');
  const store = useStores('questionnaireStore');
  const history = useHistory();
  const [info, setInfo] = useState({
    name: '',
    mobile: '',
    sex: '',
    age: '',
  });
  const [type, setType] = useState(0);
  const [select, setSelect] = useState(false);
  useEffect(() => {
    let code = getUrlParams('code');
    setType(codeMap[code]);
    let env = getUrlParams('env');
    let token = getUrlParams('token');
    let serviceRecordId = getUrlParams('serviceRecordId');
    serviceRecordId && commonStore.setServiceRecordId(serviceRecordId);
    token && commonStore.setToken(token);
    env && commonStore.setEnv(env);
    document.title = '确认信息';
    if (token) {
      // 获取用户信息
      localStorage.setItem('third_token', token);
      commonStore.getInfo().then((res: any) => {
        commonStore.setUserInfo(res);
        localStorage.setItem('third_token', token);
        localStorage.setItem('user', JSON.stringify(res));
        setInfo({
          name: res.name || '',
          mobile: res.mobile || '',
          sex: res.sex ? '男' : '女',
          age: res.age || '',
        });
      });
    }
  }, [commonStore]);
  // 监听数据是否填完信息
  const watchInfo = () => {
    const { name, mobile, sex, age } = info;
    let result = !!(name.length && mobile.length);
    if (type !== 1 && type !== 2) {
      result = result && !!(sex.length && String(age).length);
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
    if (sex !== '男' && sex !== '女' && type !== 1 && type !== 2) {
      error = '性别请输入男或女';
      Toast.info('性别请输入男或女', 3);
      return;
    }
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
      sex: sex === '女' ? 0 : 1,
    });
    if (!getUrlParams('channelId')) {
      commonStore.agreeNotification().then(() => {});
    }
    history.push(`/questionnaire/answer?code=${getUrlParams('code')}`);
  };

  return (
    <div
      className={`page info flex ${
        toJS(commonStore).env !== 'weapp' ? '' : 'weapp'
      }`}>
      {toJS(commonStore).env !== 'weapp' && <NavBar title='确认信息' />}
      <div className='center'>
        <div className='info-content'>
          <div className='item'>
            <div className='title'>真实姓名</div>
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
          <div className='item'>
            <div className='title'>手机号</div>
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
          {type > 2 && (
            <div className='item'>
              <div className='title'>年龄</div>
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
          )}
          {type > 2 && (
            <div className='item'>
              <div className='title'>性别</div>
              <input
                type='text'
                name=''
                id=''
                className='text'
                placeholder='请输入您的性别'
                value={info.sex}
                onChange={(e) =>
                  setInfo({
                    ...info,
                    sex: e.target.value,
                  })
                }
              />
            </div>
          )}
        </div>
        <div className='proto flex'>
          <div
            className={`select-content flex ${select ? 'active' : ''}`}
            onClick={() => {
              setSelect(!select);
            }}>
            {select && <img src={selectIcon} alt='' className='select' />}
          </div>
          <span>
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
        <div
          className={`answer flex ${watchInfo() ? '' : 'disable'}  ${
            type > 2 ? '' : 'less'
          }`}
          onClick={subInfo}>
          确认并开始答题
        </div>
        <div className='notice'>
          此（诊断）仅作为自我检测管理的参考，不可替代医疗诊断
        </div>
      </div>
    </div>
  );
};
export default Info;
