import Page from '@components/Page';
import React,{useState,useEffect} from 'react';
import WeekDate from '../components/weekDate';
import moment from 'moment';
// import { timeFormat } from '@utils/time';
import { healthSleepDetail, } from '@api/points';
import sleepNoData from '@assert/sleep-nodata.png';
import SleepChart from '../components/sleepChart';
import {asleep,wake,havaWake,medicineFlag,haveSleepFlag,wakeFeeling,sleepState} from '@utils/enum';
import './index.scss';
const SleepDetail = () => {
    // const [isToday, setIsToday] = useState(true);
    const [hasData, setHasData] = useState(false);
    const [sleepDetail, setSleepDetail]:any = useState();
    const [time, setTime]:any = useState();
    useEffect(()=>{
    },[hasData]);
    useEffect(() => {
            if(time === undefined){
                getData(moment().format('YYYY-MM-DD'));
            }
      }, [time]);
      
      const getData = (date) => {
        healthSleepDetail({ date }).then((res) => {
          if (res.score >= 0) {
            setHasData(true); 
            setSleepDetail(res);
          } else {
            setHasData(false);
          }
        });
      };
  return (
   <Page title='睡眠'>
<div className='sleepDetail'>
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
        <div className='public-sleep-data'>
        <div className='record-sleep-content'>
        <div>睡眠状况 <span className='sleep-status'>{sleepState[(sleepDetail?.sleepState&&sleepDetail.sleepState)]}</span> </div>
                    <div>您大概 <span>{asleep[(sleepDetail?.asleep&&sleepDetail.asleep)]}</span> 睡着</div>
                    <div>您早晨 <span>{wake[(sleepDetail?.wake&&sleepDetail.wake)]}</span> 醒来</div>
                    <div>晚上 <span>{havaWake[(sleepDetail?.havaWake&&sleepDetail.havaWake)]}</span> </div>
                    <div>服用助眠类药物情况<span>{medicineFlag[(sleepDetail?.medicineFlag&&sleepDetail.medicineFlag)]}</span></div>
                    <div>前一天白天小睡情况<span>{haveSleepFlag[(sleepDetail?.haveSleepFlag&&sleepDetail.haveSleepFlag)]}</span></div>
                    <div>早上起来感觉 {(sleepDetail?.wakeFeeling&&sleepDetail.wakeFeeling)&&sleepDetail.wakeFeeling.split(',').map((item, index) => {
                      return <span key={`感觉${index}`}>{wakeFeeling[item]}</span>;
                    })}</div>
                    {
                        (sleepDetail?.remark&&sleepDetail.remark) ?
                        <div className='supplementary-content'>补充内容：{(sleepDetail?.remark&&sleepDetail.remark) || '-'}</div>
                        :
                       null
                    }
         </div>
        </div>
        :
        <div className='public-sleep-nodata'>
           <div className='public-sleep-top'>
            <span>睡眠</span><span> {time ? moment(time).format('YY/MM/DD'):moment().format('YY/MM/DD')}</span>
           </div>
          <div className='nodata-img'>
          <img src={sleepNoData} alt="" />
          </div>
          <div className='no-record'>
          当日无记录
          </div>
        </div>
    }
           <div>
                  <div className='record-chart'>
                    <div className='record-chart-top flex-between'>
                      <div className='record-chart-title'>近7天睡眠记录</div>
                    </div>
                    <div className='pie-chart-content'>
                        <SleepChart
                        data={time}
                        ></SleepChart>
                    </div>
                    <div className='record-chart-foot'>
                    良好的睡眠将保护您的大脑，恢复一天的精力；同时好的睡眠习惯有助于提高身体免疫力，延缓衰老，保持健康情绪状态。
                    </div>
                  </div>
                </div>
    </div>
   </Page>
  );
};

export default SleepDetail;