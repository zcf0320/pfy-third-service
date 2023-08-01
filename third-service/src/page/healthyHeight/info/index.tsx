import React, { useState, useEffect } from 'react';
import Page from '@components/Page';
import { useStores } from '@utils/useStore';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import './index.scss';
import { Toast } from 'antd-mobile';
import { isTimeLegal } from '@api/questionnaire';
// const close = require('@assert/close.png')
const Info = () => {
  // const [info, setInfo] = useState({
  //   mobile: '',
  //   validCode: '',
  // });
  const history = useHistory();
  const [questionList, setQuestionList] = useState<any>([]);
  const [isDisable, setIsDisable] = useState(false);
  //   const [time, setTime] = useState(60);
  //   const [codeText, setCodeText] = useState('获取验证码');
  //   const [isSend, setIsSend] = useState(false);
  //   const [showClear, setShowClear] = useState(false)
  const commonStore = useStores('commonStore');
  const questionnaireStore = useStores('questionnaireStore');
  //   const [editPhone, setEditPhone] = useState(false);
  const [isAjax, setIsAjax] = useState(false);
  const [isLegal, setIsLegal] = useState(true);
  useEffect(() => {
    let token = getUrlParams('token');
    let serviceRecordId = getUrlParams('serviceRecordId');
    let env = getUrlParams('env');
    env && commonStore.setEnv(env);

    serviceRecordId && commonStore.setServiceRecordId(serviceRecordId);
    document.title = '健康身高管理';
    if (token) {
      // 获取用户信息
      token && localStorage.setItem('third_token', token);
      commonStore.setToken(token);
      commonStore.getInfo().then((res: any) => {
        commonStore.setUserInfo(res);
        localStorage.setItem('third_token', token);
        localStorage.setItem('user', JSON.stringify(res));
        // const { mobile } = res;
        // !mobile && setEditPhone(true);
        // setInfo({
        //   ...info,
        //   mobile: res.mobile || '',
        // });
      });
    } else {
      localStorage.removeItem('third_token');
      //   setEditPhone(true);
    }
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
    questionnaireStore
      .getQuestionnaire({
        code: questionnaireCode,
      })
      .then((res: any) => {
        let list = res.questionnaire[0].questions;
        setQuestionList(list);
      });
  }, [commonStore, questionnaireStore]);
  //   useEffect(() => {
  //     let timer: any = null;
  //     if (isSend && time != 0) {
  //       timer = setInterval(() => {
  //         // 这时候的num由于闭包的原因，一直是0，所以这里不能用setNum(num-1)
  //         setTime((n) => {
  //           if (n === 0) {
  //             setCodeText('重新获取');
  //             setTime(60);
  //             setIsSend(false);

  //             timer && clearInterval(timer);
  //           } else {
  //             setCodeText(`${n}s`);
  //           }
  //           return n - 1;
  //         });
  //       }, 1000);
  //     }
  //     return () => {
  //       // 组件销毁时，清除定时器
  //       clearInterval(timer);
  //     };
  //   }, [isSend]);
  const showAlert = (params: any) => {
    commonStore.setModal({
      show: true,
      title: '提示',
      content: '确认要测试吗',
      subTitle: '(点击“立即测试”将使用掉本权益)',
      subColor: '#999999',
      clickConfirm: () => {
        questionnaireStore.addQuestionnaire(params).then((res: any) => {
          history.push(`/healthyHeight/result?resultId=${res.resultId}`);
        });
      },
    });
    // const alertInstance = alert('确认要测试吗', '(点击“立即测试”将使用掉本权益)', [
    //   { text: '取消', onPress: () => console.log('cancel'), style: {color: '#999', fontSize: 14} },
    //   { text: '确认', onPress: () => {
    //     questionnaireStore.addQuestionnaire(params).then((res: any) => {
    //         history.push(`/healthyHeight/result?resultId=${res.resultId}`)
    //     })
    //   }, style: {color: '#FE9A51', fontSize: 14} },
    // ]);
  };
  const watchData = () => {
    // const { mobile, validCode } = info;
    let result = true;
    // editPhone && (result = !!(result && validCode.length))
    questionList.length &&
      questionList.map((item: any) => {
        return (result = !!(result && item.value && item.value.length));
      });
    setIsDisable(result);
  };
  const subInfo = () => {
    if (!isDisable) {
      return;
    }
    // const { mobile, validCode } = info;
    let channelId = getUrlParams('channelId');
    let params: any = {
      // mobile,
      code: getUrlParams('code'),
      answerReqs: [],
    };
    const { serviceRecordId } = toJS(commonStore);
    serviceRecordId && (params.serviceRecordId = serviceRecordId);
    // editPhone && (params.validCode = validCode)
    channelId && (params.channelCode = channelId);
    let error = '';
    let sex = '';
    questionList.length &&
      questionList.forEach((item: any, index: number) => {
        if (index === 0) {
          (Number(item.value) > 18 || Number(item.value) < 0) &&
            (error = '年龄只能输入0-18');
        }
        if (index === 1) {
          if (item.value !== '男' && item.value !== '女') {
            error = '性别有误';
          } else {
            sex = item.value;
          }
        }
        if (index === 2) {
          let height = Number(item.value);
          if (sex === '女') {
            (height < 20 || height > 180) && (error = '您输入的身高值有异常');
          }
          if (sex === '男') {
            (height < 20 || height > 195) && (error = '您输入的身高值有异常');
          }
        }
        if (index === 3) {
          let weight = Number(item.value);
          if (sex === '女') {
            (weight < 1.5 || weight > 80) && (error = '您输入的体重值有异常');
          }
          if (sex === '男') {
            (weight < 1.5 || weight > 110) && (error = '您输入的体重值有异常');
          }
        }
        if (index === 4) {
          let height = Number(item.value);
          height < 0 && (error = '您输入的身高值有异常');
        }
        if (index === 5) {
          let height = Number(item.value);
          height < 0 && (error = '您输入的身高值有异常');
        }

        params.answerReqs.push({
          questionId: item.questionId,
          answerText: item.value,
        });
      });
    if (error) {
      Toast.info(error, 3);
      return;
    }
    showAlert(params);
  };
  return (
    <Page title='健康身高管理'>
      {isAjax && isLegal ? (
        <div className='info'>
          <div className='center'>
            {/* <div className="item flex m-t-16 boder">
                    <div className="left flex">
                        <span className="label">手机号</span>
                        <input  className='input' value={info.mobile} disabled={!editPhone} placeholder='请输入手机号码' maxLength={11}
                            onChange={e=>setInfo({
                                ...info,
                                mobile: e.target.value
                            })}
                            onBlur={ () => { setTimeout(() => {
                                setShowClear(false)
                            }, 0)}}
                            onFocus={() => {setShowClear(true)} } />
                    </div>
                    {showClear && <img src={close} alt="" className="close" onClick={ () => {
                        setInfo({
                            ...info,
                            mobile: ''
                        })
                    }}/>}
                    { toJS(commonStore).userInfo.mobile &&  <span className='edit' onClick={() => {setEditPhone(true)}}>修改</span> }
                   
                </div> */}
            {/* 判断有token 没有手机号 就新建一个用户 */}
            {/* { !toJS(commonStore).userInfo.mobile && toJS(commonStore).userInfo.token && <div className="creat-user" >
                    该手机号将用于创建您的账号，方便下次查阅预约记录
                </div>} */}
            {/* 拿到用户手机号 就不需要验证码 */}
            {/* {
                    editPhone &&  (
                        <div className="item flex">
                            <div className="left flex">
                                <span className="label">验证码</span>
                                <input type="number" className='input code' placeholder='请输入验证码' 
                                    value={info.validCode}
                                    onChange={e=>setInfo({
                                        ...info,
                                        validCode: e.target.value
                                    })}/>
                            </div>
                            <div className={`send flex ${isSend ? 'disable' : ''}`} onClick={() => {
                                sendMessage()
                            }}>
                                {codeText}
                            </div>
                        </div>
                    )
                } */}
            {questionList.length &&
              questionList.map((item: any, index: number) => {
                return (
                  <div
                    className={`item flex ${index === 2 ? 'm-t-32' : ''}`}
                    key={item.questionId}>
                    <div className={'item-content border'}>
                      <div className='left flex'>
                        <span className='label common'>
                          {item.questionName}
                        </span>

                        {item.answerType === 3 ? (
                          <input
                            type={index === 1 ? 'text' : 'number'}
                            className='input'
                            placeholder={`${item.questionName.split('(')[0]}`}
                            onChange={(e) => {
                              // item.value = e.target.value
                              questionList[index].value = e.target.value;
                              setQuestionList(questionList);
                              watchData();
                            }}
                          />
                        ) : (
                          <div className='select flex'>
                            <div
                              className='select-item flex'
                              onClick={() => {
                                questionList[index].value = '男';
                                // console.log(questionList)
                                setQuestionList([...questionList]);
                                watchData();
                              }}>
                              <div
                                className={`select-dot flex ${
                                  item.value === '男' ? 'active' : ''
                                }`}>
                                {item.value === '男' ? (
                                  <div className='dot'></div>
                                ) : null}
                              </div>
                              <span>男</span>
                            </div>
                            <div
                              className='select-item flex'
                              onClick={() => {
                                questionList[index].value = '女';
                                setQuestionList([...questionList]);
                                watchData();
                              }}>
                              <div
                                className={`select-dot flex ${
                                  item.value === '女' ? 'active' : ''
                                }`}>
                                {item.value === '女' ? (
                                  <div className='dot'></div>
                                ) : null}
                              </div>
                              <span>女</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            <div
              className={`test flex ${isDisable ? '' : 'disable'}`}
              onClick={() => {
                subInfo();
              }}>
              立即测试
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
export default Info;
