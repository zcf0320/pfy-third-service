import React, { useState, useEffect } from 'react';
import Page from '@components/Page';
import './index.scss';
import { checkPhone } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { Toast } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import { getUrlParams } from '@utils/filter';
import { observer } from 'mobx-react';
function Mobile() {
  const [mobile, setMobile] = useState('');
  const id = getUrlParams('id');
  const [validCode, setValidCode] = useState('');
  const [time, setTime] = useState(60);
  const [codeText, setCodeText] = useState('获取验证码');
  const [isSend, setIsSend] = useState(false);
  const history = useHistory();
  const commonStore = useStores('commonStore');
  const questionnaireStore = useStores('questionnaireStore');
  const { style, config } = questionnaireStore.customConfig;
  const { name, backgroundSettings } = style || {};
  const { verifyNode, isCollectPersonalInfo } = config || {};
  useEffect(() => {
    questionnaireStore.getCustomConfig({
      questionnaireId: id,
    });
  }, [id, questionnaireStore]);
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
  const check = () => {
    if (validCode && mobile) {
      commonStore
        .checkMobileAndValidCode({
          validCode,
          mobile,
        })
        .then(() => {
          let url = `/questionnaire/custom/answer?id=${id}&channelId=${
            getUrlParams('channelId') || ''
          }`;
          if (isCollectPersonalInfo) {
            url = `/questionnaire/custom/info?id=${id}&channelId=${
              getUrlParams('channelId') || ''
            }`;
          }
          if (!verifyNode) {
            url = `/questionnaire/custom/result?id=${id}&resultId=${
              getUrlParams('resultId') || ''
            }`;
          }
          history.push(url);
        });
    }
  };
  return (
    <Page title={name}>
      <div
        className='page-custom-mobile flex'
        style={{ backgroundColor: backgroundSettings }}>
        <div className='start-title'>{name}</div>
        <div className='login-modal flex'>
          <div className='sub-title'>
            手机号码验证后{!verifyNode ? '查看结果' : '开始问卷'}
          </div>
          <div className='input-item flex'>
            <div className='item-left'>手机号</div>
            <input
              type='text'
              className='input'
              placeholder='请输入手机号'
              maxLength={11}
              onChange={(e) => {
                setMobile(e.target.value);
              }}
            />
          </div>
          <div className='input-item flex'>
            <div className='item-left'>验证码</div>
            <div className='right flex'>
              <input
                type='number'
                className='input code'
                placeholder='请输入验证码'
                maxLength={6}
                onChange={(e) => {
                  setValidCode(e.target.value);
                }}
              />
              <div
                className={`send ${isSend ? 'disable' : ''}`}
                style={{ color: backgroundSettings }}
                onClick={sendMessage}>
                {codeText}
              </div>
            </div>
          </div>
          <div
            className={`login flex ${mobile && validCode ? '' : 'disable'}`}
            style={{ backgroundColor: backgroundSettings }}
            onClick={check}>
            {verifyNode ? '下一步' : '查看问卷结果'}
          </div>
        </div>
      </div>
    </Page>
  );
}
export default observer(Mobile);
