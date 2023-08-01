/** @format */

import React, { useState, useEffect } from 'react';
import Page from '@components/Page';
import { useHistory } from 'react-router-dom';
import { getDayFood } from '@api/dementia';
import { getUrlParams } from '@utils/filter';
// import bg from '@assert/remind-bg.png';
import rightArrow from '@assert/right-arrow.png';
import './index.scss';

let SERVICE_URL: string = window.location.origin;
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
export default function HomePage() {
  const history = useHistory();
  const [food, setFood] = useState({
    afternoonSnacks: [],
    beforeMeals: [],
    breakfast: [],
    dinner: [],
    lunch: [],
  });
  const [miniProgram, setminiProgram] = useState(false);
  const [today, setToday] = useState('');
  useEffect(() => {
    // @ts-ignore：无法被执行的代码的错误
    wx.miniProgram.getEnv(function (res) {
      setminiProgram(res);
    });
    getDayFood().then((res) => {
      setFood(res);
    });
    setToday(week[new Date().getDay()]);
  }, []);
  const goVideo = (type) => {
    history.push(`/dementia/video?type=${type}`);
  };
  const goQuestion = (type) => {
    history.push(
      `/questionnaire/alzheimer/answer?code=${type}&serviceRecordId=${getUrlParams(
        'serviceRecordId'
      )}`
    );
  };
  return (
    <Page title='阿尔兹海默症数字疗法'>
      <div className='dementia-home'>
        <div className='dementia-home-top'>
          <div
            className='dementia-home-top-l'
            onClick={() => {
              history.push('/dementia/game');
            }}>
            <div className='dementia-home-top-l-title'>脑力训练小游戏</div>
            <div className='dementia-home-top-l-subtitle'>挑战三个关卡，</div>
            <div className='dementia-home-top-l-subtitle'>
              获取你的六维脑力检测报告
            </div>
          </div>
          <div className='dementia-home-top-r'>
            <div
              className='dementia-home-top-r-t'
              onClick={() => {
                goVideo('1');
              }}>
              <div className='dementia-home-top-r-t-title'>手指操</div>
              <div className='dementia-home-top-r-t-subtitle'>
                预防老年痴呆，
              </div>
              <div className='dementia-home-top-r-t-subtitle'>有效开发大脑</div>
            </div>
            <div
              className='dementia-home-top-r-b'
              onClick={() => {
                goVideo('2');
              }}>
              <div className='dementia-home-top-r-b-title'>踮脚训练</div>
              <div className='dementia-home-top-r-b-subtitle'>
                锻炼大脑有妙招
              </div>
              <div className='dementia-home-top-r-b-subtitle'>
                "踮脚"坚持做起来
              </div>
            </div>
          </div>
        </div>
        <div className='dementia-home-food'>
          <div className='dementia-home-food-l'>
            每周食谱<span>{today}</span>
          </div>
          <div
            className='dementia-home-food-r'
            onClick={() => {
              const url = '/Healthy/pages/foodLibrary/index';

              if (miniProgram) {
                // @ts-ignore：无法被执行的代码的错误
                wx.miniProgram.navigateTo({
                  url: url,
                });
              }
              window.location.href = `${SERVICE_URL}#${url}`;
            }}>
            食物库
            <img
              src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/dementia/go-green.png'
              alt='图'
            />
          </div>
        </div>
        <div className='dementia-home-foodcontent'>
          <div className='dementia-home-foodcontent-item zao'>
            <div className='dementia-home-foodcontent-item-title'>早餐</div>
            <div className='dementia-home-foodcontent-item-subtitle'>
              {food.breakfast.map((item) => {
                return <span key={item}>{item}</span>;
              })}
            </div>
            <div className='dementia-home-foodcontent-item-title mt-32'>
              早加餐
            </div>
            <div className='dementia-home-foodcontent-item-subtitle'>
              {food.beforeMeals.map((item) => {
                return <span key={item}>{item}</span>;
              })}
            </div>
          </div>
          <div className='dementia-home-foodcontent-item wu'>
            <div className='dementia-home-foodcontent-item-title'>午餐</div>
            <div className='dementia-home-foodcontent-item-subtitle'>
              {food.lunch.map((item) => {
                return <span key={item}>{item}</span>;
              })}
            </div>
            <div className='dementia-home-foodcontent-item-title mt-32'>
              午加餐
            </div>
            <div className='dementia-home-foodcontent-item-subtitle'>
              {food.afternoonSnacks.map((item) => {
                return <span key={item}>{item}</span>;
              })}
            </div>
          </div>
          <div className='dementia-home-foodcontent-item wan'>
            <div className='dementia-home-foodcontent-item-title'>晚餐</div>
            <div className='dementia-home-foodcontent-item-subtitle'>
              {food.dinner.map((item) => {
                return <span key={item}>{item}</span>;
              })}
            </div>
          </div>
        </div>
        <div className='dementia-home-title'>用药提醒</div>
        <div className='dementia-home-remind'>
          <div className='dementia-home-remind-title'>设置每日服药提醒</div>
          <div
            className='dementia-home-remind-tip'
            onClick={() => {
              const url = '/MedicationReminder/pages/index/index';
              if (miniProgram) {
                // @ts-ignore：无法被执行的代码的错误
                wx.miniProgram.navigateTo({
                  url: url,
                });
              }
              window.location.href = `${SERVICE_URL}#${url}`;
            }}>
            立即提醒
            <img alt='' src={rightArrow} />
          </div>
        </div>
        <div className='dementia-home-title fl'>
          测试问卷
          <div
            className='record'
            onClick={() => {
              history.push(
                `/dementia/record?serviceRecordId=${getUrlParams(
                  'serviceRecordId'
                )}`
              );
            }}>
            使用记录
          </div>
        </div>
        <div
          className='dementia-home-question'
          onClick={() => {
            goQuestion('HDS');
          }}>
          <div className='dementia-home-question-l'>
            <div className='dementia-home-question-l-t'>长谷川痴呆量表</div>
            <div className='dementia-home-question-l-b'>
              专业指标为您详解老年痴呆问题
            </div>
          </div>
          <img
            className='dementia-home-question-r'
            src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/dementia/go-green.png'
            alt=''
          />
        </div>
        <div
          className='dementia-home-question'
          onClick={() => {
            goQuestion('CASI');
          }}>
          <div className='dementia-home-question-l'>
            <div className='dementia-home-question-l-t'>
              认知能力筛查量表（CASI）
            </div>
            <div className='dementia-home-question-l-b'>
              测试您的认知能力，规避痴呆风险
            </div>
          </div>
          <img
            className='dementia-home-question-r'
            src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/dementia/go-green.png'
            alt=''
          />
        </div>
        <div
          className='dementia-home-question'
          onClick={() => {
            history.push(
              `/questionnaire/depressed/start?serviceRecordId=${getUrlParams(
                'serviceRecordId'
              )}&token=${localStorage.getItem('third_token')}&code=yyzpWj`
            );
          }}>
          <div className='dementia-home-question-l'>
            <div className='dementia-home-question-l-t'>抑郁测评问卷</div>
            <div className='dementia-home-question-l-b'>抑郁测评问卷</div>
          </div>
          <img
            className='dementia-home-question-r'
            src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/dementia/go-green.png'
            alt=''
          />
        </div>
      </div>
    </Page>
  );
}
