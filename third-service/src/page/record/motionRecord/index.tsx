import Page from '@components/Page';
import React,{useState,useEffect} from 'react';
import WeekDate from '../components/weekDate';
import sleepNoData from '@assert/sleep-nodata.png';
import moment from 'moment';
// import { timeFormat } from '@utils/filter';

import './index.scss';
import { healthGetSportDetail } from '@api/points';
import MotionChart from '../components/motionChart';

const MotionRecord = () => {
    // const [isToday, setIsToday] = useState(true);
    const [hasData, setHasData] = useState(false);
    const [sportList, setSportList]: Array<any> = useState();
    const [time, setTime]:any = useState();
    useEffect(()=>{
    },[hasData]);
    useEffect(() => {
            if(time === undefined){
                getData(moment().format('YYYY-MM-DD'));
            }
      }, [time]);
      const getData = (date) => {
        healthGetSportDetail({date}).then((res)=>{
            setSportList(res);
            if(res.allSportDuration===0 && res.allCalorie === 0){
                setHasData(false);
            }else{
                setHasData(true); 
            }
          });
      };
  return (
   <Page title = '运动记录'>
     <div className='motionRecord'>
     <WeekDate
     onWeekChange={(res) => {
        // if (res === moment().format('YYYY-MM-DD')) {
        //   setIsToday(true);
          
        // } else {
        //   setIsToday(false);
        // }
        getData(res);
        setTime(res);
      }}
      onDateChange={(res) => {
        // if (res === moment().format('YYYY-MM-DD')) {
        //   setIsToday(true);
        // } else {
        //   setIsToday(false);
        // }
        setTime(res);
        getData(res);
      }}
    ></WeekDate>
    {
        hasData === true ?
        <div>
             <div
                className={`public-data-motion ${
                  (sportList?.allCalorie&&sportList.allCalorie) === 0 &&
                  (sportList?.allSportDuration&&sportList.allSportDuration) === 0
                    ? ""
                    // : (sportList?.allSportDuration&&sportList.allSportDuration) < 30 || (sportList?.allSportDuration&&sportList.allSportDuration) > 60
                    // ? "active"
                    : "active"
                }`}
              >
                <div className="flex-between">
                  <span className="record-title">运动</span>
                  <span className="record-time">
                  {time ? moment(time).format('YY/MM/DD'):moment().format('YY/MM/DD ')}
                  </span>
                </div>
                <div className="record-top-content ">
                  <div className="blood-pressure flex-center">
                    <div className="record-content-title flex-center">
                      <span className="record-top-content-title">
                        {(sportList?.allCalorie&&sportList.allCalorie) || "- -"}
                      </span>
                      <span className="record-top-content-text">
                        今日消耗(kcal)
                      </span>
                    </div>
                    <div className="record-content-title flex-center">
                      <span className="record-top-content-title">
                        {(sportList?.allSportDuration&&sportList.allSportDuration) || "- -"}
                      </span>
                      <span className="record-top-content-text">
                        运动时长(min)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="record-foot-content">
                  <div className="record-foot-content-title">
                    { (sportList?.allCalorie&&sportList.allCalorie) === 0 &&
                  (sportList?.allSportDuration&&sportList.allSportDuration) === 0
                      ? "暂无打卡记录！"
                    //   : (sportList?.allSportDuration&&sportList.allSportDuration) > 30 && (sportList?.allSportDuration&&sportList.allSportDuration) < 60
                    //   ? "您今日的运动量达标！"
                    //   :  (sportList?.allSportDuration&&sportList.allSportDuration) > 60
                    //   ? "您今日的运动量偏高！"
                      : "您今日的运动量达标！"}
                  </div>
                  <div className="record-foot-content-text">
                    {(sportList?.allCalorie&&sportList.allCalorie) === 0 &&
                  (sportList?.allSportDuration&&sportList.allSportDuration) === 0
                      ? "请记录您的身体数据，坚持打卡持续关注健康状态。"
                    //   : (sportList?.allSportDuration&&sportList.allSportDuration) > 30 && (sportList?.allSportDuration&&sportList.allSportDuration) < 60
                    //   ? "您已坚持运动3天，请继续保持每日适量运动，多喝水能够增加新陈代谢的速度，这样能够消耗掉更多的热量。"
                    //   : (sportList?.allSportDuration&&sportList.allSportDuration) > 60
                    //   ? "请继续保持每日适量运动，健康的运动习惯可增强体质、加快新陈代谢。"
                      : "请继续保持每日适量运动，健康的运动习惯可增强体质、加快新陈代谢。"}
                  </div>
                </div>
              </div>
              <div className="record-main-basicData">
                    {
                     (sportList?.sportList&&sportList.sportList.length)&&sportList?.sportList.map((v,i)=>{
                      return (
                        <div className="range" key={i}>
                        <span>{v.sportEvent}</span>
                        <span>{v.sportDuration}min</span>
                        <span>{v.calorie}kcal</span>
                      </div>
                      );
                     })
                    }
            </div>
        </div>
        :
        <div className='public-sleep-nodata'>
        <div className='public-sleep-top'>
         <span>运动</span><span> {time ? moment(time).format('YY/MM/DD'):moment().format('YY/MM/DD ')}</span>
        </div>
       <div className='nodata-img'>
       <img src={sleepNoData} alt="" />
       </div>
       <div className='no-record'>
       当日无记录
       </div>
     </div>
    }
     <div className="record-chart">
                    <div className="record-chart-top flex-between">
                      <div className="record-chart-title">近7天运动记录</div>
                    </div>
                    <div className="pie-chart-content">
                      <MotionChart
                      data= {time}
                      onRef={null }
                      ></MotionChart>
                    </div>
                    <div className="record-chart-foot">
                      良好的运动习惯有助于保持身材，降低患病风险。记得多喝水帮助新陈代谢，消耗更多热量。
                    </div>
                  </div>
     </div>
   </Page>
  );
};

export default MotionRecord;