import Page from '@components/Page';
import React, { useState, useEffect } from 'react';
import { useStores } from '@utils/useStore';
import { getUrlParams, checkPhone } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { isTimeLegal } from '@api/questionnaire';
import './index.scss';
import { Toast } from 'antd-mobile';
const HPVStart = () => {
  const commonStore = useStores('commonStore');
  const [time, setTime] = useState(60);
  const [mobile, setMobile] = useState('');
  const [codeText, setCodeText] = useState('获取验证码');
  const [isSend, setIsSend] = useState(false);
  const [validCode, setValidCode] = useState('');
  const [isAjax, setIsAjax] = useState(false);
  const [isLegal, setIsLegal] = useState(true);
  const history = useHistory();
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
    let timer: any = null;
    if (isSend && time !== 0) {
      timer = setInterval(() => {
        // 这时候的num由于闭包的原因，一直是0，所以这里不能用setNum(num-1)
        setTime((n) => {
          if (n === 0) {
            setCodeText('重新获取');
            setTime(60);
            setIsSend(false);

            timer && clearInterval(timer);
          } else {
            setCodeText(`${n}s`);
          }
          return n - 1;
        });
      }, 1000);
    }
    return () => {
      // 组件销毁时，清除定时器
      clearInterval(timer);
    };
  }, [isSend, time]);
  const sendMessage = () => {
    if (!String(mobile).length || isSend) {
      return;
    }
    // 校验手机号
    if (!checkPhone(mobile)) {
      Toast.info('请输入正确的手机号', 3);
      return;
    }
    commonStore
      .sendMessage({
        mobile,
      })
      .then(() => {
        setIsSend(true);
      });
  };
  const login = () => {
    if (mobile && validCode) {
      let params = {
        mobile,
        validCode,
      };
      commonStore.login(params).then((res: any) => {
        const { token } = res;
        localStorage.setItem('third_token', token);
        localStorage.setItem('user', JSON.stringify(res));
        commonStore.setToken(token);
        commonStore.setUserInfo(res);
        history.push(
          `/questionnaire/hpv/answer?code=dhxUwz&channelId=${getUrlParams(
            'channelId'
          )}&serviceId=${getUrlParams('serviceRecordId')}`
        );
      });
    }
  };
  return (
    <Page title='女性预防宫颈癌知识问卷'>
      {isAjax && isLegal ? (
        <div className='page-hpv-start flex'>
          <span className='hpv-title'>女性预防宫颈癌测试</span>
          <span className='hpv-sub-title'>
            PREVEVTION OF CERVICAL CANCER TEST
          </span>
          <div className='dot-list flex'>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
          </div>
          <div className='hpv-content flex'>
            <div className='bg'></div>
            <div className='hpv-introduce'>
              我国宫颈癌发病率位于世界第二，每年约有
              <span className='number'>13,0000~15,0000</span>
              名妇女被诊断出患有宫颈癌。幸运的是，HPV和宫颈涂片检测可以帮助医生尽早发现该疾病。
            </div>
            <div className='hpv-question'>
              您对宫颈癌筛查了解多少？对还是错？
            </div>
            <div className='input-item flex'>
              <input
                className='input-content'
                placeholder='请输入您的手机号码'
                maxLength={11}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}></input>
              <div
                className={`code flex ${isSend ? 'disable' : ''}`}
                onClick={sendMessage}>
                {codeText}
              </div>
            </div>
            <div className='input-item flex'>
              <input
                className='input-content'
                placeholder='验证码'
                maxLength={6}
                onChange={(e) => {
                  setValidCode(e.target.value);
                }}></input>
            </div>
            <div
              className={`login-btn flex ${
                !mobile || !validCode ? 'disable' : ''
              }`}
              onClick={login}>
              开始问卷
            </div>
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
    </Page>
  );
};
export default HPVStart;
