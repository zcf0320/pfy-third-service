import Page from '@components/Page';
import React, { useState, useEffect } from 'react';
import { useStores } from '@utils/useStore';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { Toast } from 'antd-mobile';
import { getInfo } from '@api/common';
const HRAStart = () => {
  const history = useHistory();
  const questionnaireStore = useStores('questionnaireStore');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [today, setToday] = useState(false);
  useEffect(() => {
    let code = getUrlParams('code');
    let token = getUrlParams('token');
    if (token) {
      // 获取用户信息
      localStorage.setItem('third_token', token);
    }
    // 获取答题信息
    questionnaireStore
      .getQuestionnaire({
        code,
      })
      .then((res: any) => {
        res.questionnaire &&
          res.questionnaire[0].questions.forEach((item: any) => {
            item.answers.forEach((ele: any) => {
              ele.select = false;
            });
          });
        questionnaireStore.setQuestionnaire(res.questionnaire);
      });
    //今天是否填过
    getInfo().then((res: any) => {
      if (res.completedHraQuestionnaire) {
        history.replace(
          `/questionnaire/hra/result?code=${getUrlParams('code')}&resultId=${
            res.hraQuestionnaireResultId
          }`
        );
        setToday(true);
      } else {
        if (!getUrlParams('show')) {
          if (res.hraQuestionnaireResultId) {
            history.replace(
              `/questionnaire/hra/result?code=${getUrlParams(
                'code'
              )}&resultId=${res.hraQuestionnaireResultId}`
            );
            return;
          }
        }
        setToday(false);
        //获取用户是否填写身高体重
        questionnaireStore.getHealthInfo().then((res: any) => {
          if (res.weight && res.height) {
            // setHeight(res.height)
            // setWeight(res.Weight)
            let h = Number(res.height);
            let w = Number(res.weight);
            let bmi = w / Math.pow(h / 100, 2);
            questionnaireStore.setSubInfo({
              height: h,
              weight: w,
              bmi,
            });
            history.replace(
              `/questionnaire/hra/answer?code=${getUrlParams('code')}`
            );
          }
        });
      }
    });
  }, [history, questionnaireStore]);
  const login = () => {
    if (height && weight) {
      if (today) {
        Toast.info('您今天已经测评过HRA，请明天再来');
        return;
      }
      let h = Number(height);
      let w = Number(weight);
      let bmi = w / Math.pow(h / 100, 2);
      questionnaireStore.setSubInfo({
        height,
        weight,
        bmi,
      });
      history.replace(`/questionnaire/hra/answer?code=${getUrlParams('code')}`);
    }
  };
  return (
    <Page title='HRA健康方式风险评估'>
      <div className='page-hra-start flex'>
        <span className='hra-title'>HRA健康方式风险测试</span>
        <span className='hra-sub-title'>HRA HRALTHY WAY RISK TEST</span>
        <div className='dot-list flex'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        <div className='hra-content flex'>
          <div className='bg'></div>
          <div className='input-item flex'>
            <div className='explain'>您的身高</div>
            <div className='input-content'>
              <input
                type='number'
                placeholder='请输入'
                onChange={(e) => {
                  setHeight(e.target.value);
                }}></input>
            </div>
            <div className='company'>CM</div>
          </div>
          <div className='input-item flex'>
            <div className='explain'>您的体重</div>
            <div className='input-content'>
              <input
                type='number'
                placeholder='请输入'
                onChange={(e) => {
                  setWeight(e.target.value);
                }}></input>
            </div>
            <div className='company'>KG</div>
          </div>
          <div
            className={`login-btn ${!height || !weight ? 'disable' : ''}`}
            onClick={login}>
            下一题
          </div>
        </div>
      </div>
    </Page>
  );
};
export default HRAStart;
