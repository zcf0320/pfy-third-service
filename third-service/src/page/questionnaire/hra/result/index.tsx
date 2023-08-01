import Page from '@components/Page';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import Chart from './components/chart';
import { getUrlParams } from '@utils/filter';
import { getResult } from '@api/questionnaire';
import { getInfo } from '@api/common';
interface list {
  hraQuestionType: number;
  question: string;
  tips: string;
}
interface bmidata {
  list: Array<list>;
  totalScore: number;
  nutritionScore: number;
  sleepScore: number;
  sportScore: number;
  stressScore: number;
  bmiScore: number;
  habitScore: number;
}
const HRAResult = () => {
  const history = useHistory();
  const [btnState, setBtnState] = useState(true);
  const [yyState, setYyState] = useState(false);
  const [bmiState, setBmiState] = useState(false);
  const [ydState, setYdState] = useState(false);
  const [sjState, setSjState] = useState(false);
  const [xgState, setXgState] = useState(false);
  const [ylState, setYlState] = useState(false);
  const [bmiData, setBmiData] = useState<bmidata>({
    list: [],
    totalScore: 0,
    nutritionScore: 0,
    sleepScore: 0,
    sportScore: 0,
    stressScore: 0,
    bmiScore: 0,
    habitScore: 0,
  });
  useEffect(() => {
    let resultId = getUrlParams('resultId');
    let data = { resultId };
    getResult(data).then((val: any) => {
      setBmiData(val);
      getInfo().then((res: any) => {
        if (res.completedHraQuestionnaire) {
          setBtnState(true);
        } else {
          setBtnState(false);
        }
      });
    });
  }, []);
  //重新评估
  const goStart = () => {
    if (btnState) {
      return;
    }
    history.push(
      `/questionnaire/hra/start?show=1&code=${getUrlParams('code')}`
    );
  };

  //hra结论type,0为BMI,1为营养,2为运动,3为压力,4为习惯,5为睡眠
  return (
    <Page title='HRA健康方式风险评估'>
      <div className='page-hra-result flex' id='page-hra-result'>
        <div className='assessment'>
          <div className='assessment-title'>
            您的健康生活方式评估分数为：{bmiData.totalScore || '-'}
          </div>
          <Chart detail={bmiData} />
          <div
            className={`resetScore ${btnState ? 'disable' : ''}`}
            onClick={goStart}>
            重新评估
          </div>
          <div className='btn-tip'>每日评估一次</div>
        </div>
        <div className='healthy-title'>健康建议</div>
        <div className='healthy-tip'>
          <div
            className={
              bmiState ? 'healthy-tip-top space-b' : 'healthy-tip-top'
            }>
            <div>
              <span className='top-title'>BMI</span>
              <span className='top-score'>{bmiData.bmiScore}分</span>
            </div>
            {bmiState ? (
              <div
                className='top-image-t'
                onClick={() => {
                  setBmiState(false);
                }}></div>
            ) : null}
          </div>
          {bmiState ? (
            <div className='healthy-tip-list'>
              {bmiData.list.map((item) => {
                return item.hraQuestionType === 0 ? (
                  <div className='healthy-tip-center' key={item.question}>
                    <div className='healthy-tip-title'>
                      <span>{item.question}</span>
                    </div>
                    <div className='healthy-tip-content'>{item.tips}</div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div
              className='healthy-tip-open'
              onClick={() => {
                setBmiState(true);
              }}>
              <span className='tip-open-text'>展开</span>
              <div className='top-image-b'></div>
            </div>
          )}
        </div>
        <div className='healthy-tip'>
          <div
            className={yyState ? 'healthy-tip-top space-b' : 'healthy-tip-top'}>
            <div>
              <span className='top-title'>营养</span>
              <span className='top-score'>{bmiData.nutritionScore}分</span>
            </div>
            {yyState ? (
              <div
                className='top-image-t'
                onClick={() => {
                  setYyState(false);
                }}></div>
            ) : null}
          </div>
          {yyState ? (
            <div className='healthy-tip-list'>
              {bmiData.list.map((item) => {
                return item.hraQuestionType === 1 ? (
                  <div className='healthy-tip-center' key={item.question}>
                    <div className='healthy-tip-title'>
                      <span>{item.question}</span>
                    </div>
                    <div className='healthy-tip-content'>{item.tips}</div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div
              className='healthy-tip-open'
              onClick={() => {
                setYyState(true);
              }}>
              <span className='tip-open-text'>展开</span>
              <div className='top-image-b'></div>
            </div>
          )}
        </div>
        <div className='healthy-tip'>
          <div
            className={ydState ? 'healthy-tip-top space-b' : 'healthy-tip-top'}>
            <div>
              <span className='top-title'>运动</span>
              <span className='top-score'>{bmiData.sportScore}分</span>
            </div>
            {ydState ? (
              <div
                className='top-image-t'
                onClick={() => {
                  setYdState(false);
                }}></div>
            ) : null}
          </div>
          {ydState ? (
            <div className='healthy-tip-list'>
              {bmiData.list.map((item) => {
                return item.hraQuestionType === 2 ? (
                  <div className='healthy-tip-center' key={item.question}>
                    <div className='healthy-tip-title'>
                      <span>{item.question}</span>
                    </div>
                    <div className='healthy-tip-content'>{item.tips}</div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div
              className='healthy-tip-open'
              onClick={() => {
                setYdState(true);
              }}>
              <span className='tip-open-text'>展开</span>
              <div className='top-image-b'></div>
            </div>
          )}
        </div>
        <div className='healthy-tip'>
          <div
            className={ylState ? 'healthy-tip-top space-b' : 'healthy-tip-top'}>
            <div>
              <span className='top-title'>压力</span>
              <span className='top-score'>{bmiData.stressScore}分</span>
            </div>
            {ylState ? (
              <div
                className='top-image-t'
                onClick={() => {
                  setYlState(false);
                }}></div>
            ) : null}
          </div>
          {ylState ? (
            <div className='healthy-tip-list'>
              {bmiData.list.map((item) => {
                return item.hraQuestionType === 3 ? (
                  <div className='healthy-tip-center' key={item.question}>
                    <div className='healthy-tip-title'>
                      <span>{item.question}</span>
                    </div>
                    <div className='healthy-tip-content'>{item.tips}</div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div
              className='healthy-tip-open'
              onClick={() => {
                setYlState(true);
              }}>
              <span className='tip-open-text'>展开</span>
              <div className='top-image-b'></div>
            </div>
          )}
        </div>
        <div className='healthy-tip'>
          <div
            className={xgState ? 'healthy-tip-top space-b' : 'healthy-tip-top'}>
            <div>
              <span className='top-title'>习惯</span>
              <span className='top-score'>{bmiData.habitScore}分</span>
            </div>
            {xgState ? (
              <div
                className='top-image-t'
                onClick={() => {
                  setXgState(false);
                }}></div>
            ) : null}
          </div>
          {xgState ? (
            <div className='healthy-tip-list'>
              {bmiData.list.map((item) => {
                return item.hraQuestionType === 4 ? (
                  <div className='healthy-tip-center' key={item.question}>
                    <div className='healthy-tip-title'>
                      <span>{item.question}</span>
                    </div>
                    <div className='healthy-tip-content'>{item.tips}</div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div
              className='healthy-tip-open'
              onClick={() => {
                setXgState(true);
              }}>
              <span className='tip-open-text'>展开</span>
              <div className='top-image-b'></div>
            </div>
          )}
        </div>
        <div className='healthy-tip'>
          <div
            className={sjState ? 'healthy-tip-top space-b' : 'healthy-tip-top'}>
            <div>
              <span className='top-title'>睡眠</span>
              <span className='top-score'>{bmiData.sleepScore}分</span>
            </div>
            {sjState ? (
              <div
                className='top-image-t'
                onClick={() => {
                  setSjState(false);
                }}></div>
            ) : null}
          </div>
          {sjState ? (
            <div className='healthy-tip-list'>
              {bmiData.list.map((item) => {
                return item.hraQuestionType === 5 ? (
                  <div className='healthy-tip-center' key={item.question}>
                    <div className='healthy-tip-title'>
                      <span>{item.question}</span>
                    </div>
                    <div className='healthy-tip-content'>{item.tips}</div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div
              className='healthy-tip-open'
              onClick={() => {
                setSjState(true);
              }}>
              <span className='tip-open-text'>展开</span>
              <div className='top-image-b'></div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};
export default HRAResult;
