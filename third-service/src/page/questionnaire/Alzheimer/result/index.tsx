/**
 * @format
 * @Author: Safi.Sun
 * @Date: 2022-03-07 11:34:39
 * @Last Modified by: Safi.Sun
 * @Last Modified time: 2022-03-07 16:14:37
 */

import Page from '@components/Page';
import React, { useEffect, useState } from 'react';
import descIcon from '@assert/result-desc.png';
import tipsIcon from '@assert/result-tips.png';
import './index.scss';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { getQuestionnaireResult } from '@api/questionnaire';

const AlzheimerResult = () => {
  const history = useHistory();
  const code = getUrlParams('code');
  const resultId = getUrlParams('resultId');
  const [data, setData] = useState({
    score: '',
    content: '',
    resultRemark: '',
    conclusionId: '',
  });
  useEffect(() => {
    if (!code && !resultId) {
      Toast.fail('参数不合法', 1, () => {
        history.go(-1);
      });
    }
  }, [code, history, resultId]);

  useEffect(() => {
    getQuestionnaireResult({
      resultId: resultId,
    }).then((res: any) => {
      setData(res);
    });
  }, [resultId]);
  const goHome = () => {
    history.replace(
      `/dementia/home?serviceRecordId=${getUrlParams('serviceRecordId')}`
    );
  };
  return (
    <Page title='测试结果'>
      <div className='page-alzheimer-result'>
        <div className={`result-bg ${code === 'HDS' ? '' : 'result-bg2'}`}>
          <div
            className={code === 'HDS' ? 'congratulation' : 'congratulation2'}>
            {code === 'HDS' ? '恭喜您, 完成问卷' : '恭喜您,完成筛查问卷'}
          </div>
        </div>
        {code === 'HDS' ? (
          <div className='result'>
            <div className='result-title'>{data.resultRemark}</div>
            <div className='result-desc'>
              <img alt='' src={descIcon} />
              <div className='content bt'>
                <div className='desc-text'>测评概述</div>
                <div className='desc-content'>{data.content}</div>
              </div>
            </div>
            <div className='result-desc'>
              <img alt='' src={tipsIcon} />
              <div className='content'>
                <div className='desc-text'>测评概述</div>
                <div className='desc-content'>
                  高血压、高血脂、糖尿病、中风等都会引起老年性痴呆的发生，或者导致病情恶化，应尽量避免这些疾病的产生。
                  多食用富含维生素的食物，如各种水果和蔬菜等，可以改善脑细胞的营养，延缓脑细胞的衰老。
                </div>
              </div>
            </div>
            <div className='btn-back' onClick={goHome}>
              返回首页
            </div>
          </div>
        ) : (
          <div className='result'>
            <div className='result-desc'>
              <img alt='' src={descIcon} />
              <div className='content'>
                <div className='score'>您的得分为{data.score}分</div>
                <div className='desc-content'>{data.content}</div>
              </div>
            </div>
            <div
              className={`btn-back ${code === 'HDS' ? '' : 'mt'}`}
              onClick={goHome}>
              返回首页
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};
export default AlzheimerResult;
