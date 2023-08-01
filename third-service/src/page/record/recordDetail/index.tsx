/**
 * /* eslint-disable no-mixed-operators
 *
 * @format
 */

/**
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import { Picker, Button, Toast, InputItem } from 'antd-mobile';
import Drawer from '../../../components/Drawer';
import Page from '../../../components/Page';
import { useHistory } from 'react-router-dom';

import {
  getAllFiles,
  healthFileSave,
  healthSleepDetail,
  healthGetSport,
  healthSportDetail,
  healthGetSportDetail,
} from '@api/points';
import { getUrlParams } from '@utils/filter';
import moment from 'moment';
import RecordChart from '@components/RecordChart';
import {
  asleep,
  wake,
  havaWake,
  medicineFlag,
  haveSleepFlag,
  wakeFeeling,
  sleepState,
  pageTitle,
} from '@utils/enum';

import SleepChart from '../components/sleepChart';
import MotionChart from '../components/motionChart';
import './index.scss';

const sugarText = ['空腹/餐前', '餐后2h'];
let obj: any = {};
let recordChart = {} as any;
// const motionText = ['快跑','慢跑','快走','慢走','瑜伽','跳绳','自行车','健身操','+更多'];
function HealthDetail() {
  const user = localStorage.getItem('user_info')
    ? JSON.parse(localStorage.getItem('user_info')!)
    : {};
  // const location = useLocation();
  const motionRef: any = useRef();
  const history = useHistory();
  const code = getUrlParams('code');
  const title = getUrlParams('code') ? pageTitle[getUrlParams('code')] : '';
  const [showNumber, setShowNumber] = useState(0);
  const [sugar, setSugar] = useState('');
  // const [title, setTitle] = useState('');
  const [activeIndex, setActiveIndex] = useState(3);
  // 运动
  const [motionActiveIndex, setMotionActiveIndex] = useState(32);
  const [motionActiveIndexOne, setMotionActiveIndexOne] = useState(32);
  const [motionActiveIndexTwo, setMotionActiveIndexTwo] = useState(32);
  const [duration, setDuration] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [sportList, setSportList]: Array<any> = useState();
  // const [textHeight, setTextHeight] = useState('80px');
  const [moreFlag, setMoreFlag] = useState(true);
  const [motionDisabled, setMotionDisabled] = useState(true);
  const [motionTime, setMotionTime]: any = useState(
    moment().format('YYYY-MM-DD')
  );
  // const [motionType, setMotionType] = useState();
  const [motionText, setMotionText]: Array<any> = useState([]);
  // 睡眠
  const [sleepTime, setSleepTime]: any = useState(
    moment().format('YYYY-MM-DD')
  );
  // 基础数据
  const [multiArray, setMultiArray]: Array<any> = useState([]);
  const [multiData, setMultiData]: Array<any> = useState([]);
  // 血压
  const [diastolicBloodPressure, setDiastolicBloodPressure] = useState(''); //舒张压
  const [systolicBloodPressure, setSystolicBloodPressure] = useState(''); //收缩压
  // 心率
  const [heartRate, setHeartRate]: Array<any> = useState([]);
  const [heartRateData, setHeartRateData]: Array<any> = useState([]);
  // 基础数据
  const [healthFile, setHealthFile]: any = useState({});
  // 测量时间段
  const [timeQuantum, setTimeQuantum]: any = useState();
  const [sleepDetail, setSleepDetail]: any = useState();
  // const [resData, setResData]:any = useState();
  // const [arras, setArras]: any = useState([]);
  const goLogin = () => {
    window.location.href = `${window.location.origin}#/pages/h5/login/index?redirect=${window.location.hash}`;
  };

  useEffect(() => {
    getAllFilesData();
  }, []);
  // 获取身高体重
  const getAllFilesData = () => {
    getAllFiles().then((res) => {
      setHealthFile(res);
    });
  };

  useEffect(() => {
    if (code === 'WEIGHT_HEIGHT') {
      if (healthFile.height && healthFile.weight) {
        if (
          /^[0-9]*$/.test(healthFile.height) ||
          /^[0-9]*$/.test(healthFile.weight)
        ) {
          setMultiData([Number(healthFile.height), Number(healthFile.weight)]);
        } else {
          setMultiData([300, 300]);
        }
      }
    }

    if (code === 'SLEEP') {
      let data = {
        date:
          healthFile.updateDateMap && healthFile.updateDateMap.SLEEP
            ? moment(
                healthFile.updateDateMap && healthFile.updateDateMap.SLEEP
              ).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
      };
      healthSleepDetail(data).then((res) => {
        if (res) {
          setSleepDetail(res);
        }
      });

      if (healthFile.updateDateMap && healthFile.updateDateMap.SLEEP) {
        setSleepTime(
          moment(
            healthFile.updateDateMap && healthFile.updateDateMap.SLEEP
          ).format('YYYY-MM-DD')
        );
      } else {
        setSleepTime(moment().format('YYYY-MM-DD'));
      }
    }
    if (code === 'SPORT') {
      healthGetSport().then((res) => {
        setMotionText(res);
      });
      let data = {
        date:
          healthFile.updateDateMap && healthFile.updateDateMap.SPORT
            ? moment(
                healthFile.updateDateMap && healthFile.updateDateMap.SPORT
              ).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
      };

      healthGetSportDetail(data).then((res) => {
        setSportList(res);
      });
      if (healthFile.updateDateMap && healthFile.updateDateMap.SPORT) {
        setMotionTime(
          moment(
            healthFile.updateDateMap && healthFile.updateDateMap.SPORT
          ).format('YYYY-MM-DD')
        );
      } else {
        setMotionTime(moment().format('YYYY-MM-DD'));
      }
    }
  }, [code, healthFile, title]);

  useEffect(() => {
    // 基础数据
    const arrHeight: Array<Object> = [];
    for (let i = 100; i <= 300; i++) {
      arrHeight.push({ label: i + 'cm', value: i });
    }
    const arrWeight: Array<Object> = [];
    for (let i = 30; i <= 300; i++) {
      arrWeight.push({ label: i + 'kg', value: i });
    }
    setMultiArray([arrHeight, arrWeight]);
    // 心率
    const ArrHeartRate: Array<Object> = [];
    for (let i = 40; i <= 180; i++) {
      ArrHeartRate.push({ label: i + 'bmp', value: i });
    }
    setHeartRate([ArrHeartRate]);
  }, []);

  useEffect(() => {
    if (activeIndex === 3 || sugar.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [disabled, activeIndex, sugar]);
  useEffect(() => {
    // 运动
    if (
      motionActiveIndex === 32 ||
      duration.length === 0 ||
      motionActiveIndexOne === 32 ||
      motionActiveIndexTwo === 32
    ) {
      setMotionDisabled(true);
    } else {
      setMotionDisabled(false);
    }
  }, [
    duration,
    motionActiveIndex,
    motionDisabled,
    motionActiveIndexOne,
    motionActiveIndexTwo,
  ]);
  const handRedcordDataDetail = () => {
    // history.push({pathname:'/record/recordDataDetail', query:{title:title}});
    history.push(`/record/recordDataDetail?title=${title}`);
  };

  // 心率数据
  const onChangeBloodRate = (e) => {
    // eslint-disable-next-line array-callback-return
    let data = {
      heartRate: e[0],
    };
    healthFileSave(data).then(() => {
      setHeartRateData([e[0]]);
      getAllFilesData();
      recordChart.getData();
    });
  };
  // 血压数据
  const onChangeBloodPressure = () => {
    let data = {
      systolicBloodPressure,
      diastolicBloodPressure,
    };
    healthFileSave(data).then(() => {
      getAllFilesData();
      recordChart.getData();
      setSystolicBloodPressure('');
      setDiastolicBloodPressure('');
      setShowNumber(0);
    });
  };
  // 基础数据
  const onChangeBasicData = (e) => {
    let data = {};
    if (e[0] >= 300 && e[1] >= 300) {
      data = {
        height: 300,
        weight: 300,
      };
    } else {
      data = {
        height: e[0],
        weight: e[1],
      };
    }

    healthFileSave(data).then(() => {
      setMultiData([e[0], e[1]]);
      getAllFilesData();
      recordChart.getData();
    });
  };
  // 血糖值
  const changeSugar = (e) => {
    setSugar(e.target.value);
  };
  // 血糖切换时间段
  const handBloodSugar = (v, i) => {
    setTimeQuantum(v);
    setActiveIndex(i);
  };
  // 运动
  const handMotion = (v, i) => {
    // setMotionType(v);
    setMotionActiveIndex(i);
    setMotionActiveIndexOne(35);
    setMotionActiveIndexTwo(35);
    obj.calorie = v.calories;
    obj.sportEvent = v.sportName;
    obj.sysTagId = v.sysTagId;
    obj.custom = true;
  };
  const handMotionOne = (v, i) => {
    // setMotionType(v);
    setMotionActiveIndexOne(i);
    setMotionActiveIndex(35);
    setMotionActiveIndexTwo(35);
    obj.calorie = v.calories;
    obj.sportEvent = v.sportName;
    obj.sysTagId = v.sysTagId;
    obj.custom = true;
  };
  const handMotionTwo = (v, i) => {
    // setMotionType(v);
    setMotionActiveIndexTwo(i);
    setMotionActiveIndex(35);
    setMotionActiveIndexOne(35);
    obj.calorie = v.calories;
    obj.sportEvent = v.sportName;
    obj.sysTagId = v.sysTagId;
    obj.custom = true;
  };
  // 运动时长值
  const changeDuration = (e) => {
    setDuration(e.target.value);
  };
  // 运动输入框确认
  // const handOk = () => {
  //   if (Number(duration) && duration.toString().indexOf(".") === -1) {
  //     obj.sportDuration = Number(duration);
  //     const arr: any = [];
  //     arr.push(JSON.parse(JSON.stringify(obj)));
  //     setArras([...arras, ...arr]);
  //     setDuration("");
  //   } else {
  //     Toast.info("请输入正确运动时长", 1);
  //   }
  // };

  const getSport = () => {
    healthGetSport().then((res) => {
      setMotionText(res);
    });
    let data = {
      date:
        healthFile.updateDateMap && healthFile.updateDateMap.SPORT
          ? moment(
              healthFile.updateDateMap && healthFile.updateDateMap.SPORT
            ).format('YYYY-MM-DD')
          : moment().format('YYYY-MM-DD'),
    };

    healthGetSportDetail(data).then((res) => {
      setSportList(res);
    });
  };

  // 运动确认

  const handBloodMotionOk = () => {
    if (Number(duration) && duration.toString().indexOf('.') === -1) {
      obj.sportDuration = Number(duration);
      let arr: any = [];
      // arr.push(JSON.parse(JSON.stringify(obj)));
      arr.push(obj);
      // setArras([...arras, ...arr]);
      // setArras(arr);
      setDuration('');
      const req = {
        sportList: arr,
      };

      healthSportDetail(req).then(() => {
        getSport();
        // setArras([]);
        getAllFilesData();
        setShowNumber(0);
        setMotionActiveIndex(32);
        setMotionActiveIndexOne(35);
        setMotionActiveIndexTwo(35);
        setMoreFlag(true);

        motionRef.current && motionRef.current.getData();
      });

      // if (moreFlag === false) {
      //   // setTextHeight('80px');
      // }
    } else {
      Toast.info('请输入正确运动时长', 1);
    }
  };

  const handMore = () => {
    // setTextHeight('auto');
    setMoreFlag(false);
    // if(moreFlag === false){
    //   // setTextHeight('80px');
    // }
  };

  // 血糖确认
  const handBloodSugaOk = () => {
    if (Number(sugar) <= 0 || activeIndex === 3) {
      Toast.info('请输入正确血糖值或测量时间段', 1);
    } else {
      setShowNumber(0);
      setActiveIndex(3);
      let data = {
        timeQuantum: timeQuantum,
        fastingBloodGlucose: sugar,
      };
      healthFileSave(data).then(() => {
        getAllFilesData();
        setSugar('');
        recordChart.getData();
      });
    }
  };
  const onFocus = () => {
    if (navigator.userAgent.indexOf('iPhone') !== -1) {
      document.body.scrollTop = document.body.scrollHeight;
    }
  };
  return (
    <Page title={title}>
      <div className='record'>
        <div className='record-data'>
          {code === 'WEIGHT_HEIGHT' ? (
            <div>
              <div
                className={`record-noData ${
                  healthFile.bmi === null
                    ? ''
                    : healthFile.bmi > 23.9 || healthFile.bmi < 18.5
                    ? 'active'
                    : ''
                }`}>
                <div className='flex-between'>
                  <span className='record-title'>BMI</span>
                  <span className='record-time'>
                    {healthFile.updateDateMap &&
                    healthFile.updateDateMap.WEIGHT_HEIGHT
                      ? moment(
                          healthFile.updateDateMap &&
                            healthFile.updateDateMap.WEIGHT_HEIGHT
                        ).format('YY/MM/DD HH:mm')
                      : moment().format('YY/MM/DD HH:mm')}
                  </span>
                </div>
                <div className='record-top-content flex-center'>
                  <span className='record-top-content-title'>
                    {healthFile.bmi || '-'}
                  </span>
                  <span className='record-top-content-text'>BMI（kg/m²）</span>
                  <div className='record-show'>
                    <span>消瘦</span>
                    <span>正常</span>
                    <span>超重</span>
                    {healthFile.bmi === null ? (
                      <div className='record-triangle-normal'></div>
                    ) : healthFile.bmi < 18.5 ? (
                      <div className='record-triangle'></div>
                    ) : healthFile.bmi >= 18.5 && healthFile.bmi <= 23.9 ? (
                      <div className='record-triangle-normal'></div>
                    ) : healthFile.bmi > 23.9 ? (
                      <div className='record-triangle-abnormal'></div>
                    ) : null}
                  </div>
                </div>
                <div className='record-main-content flex-between'>
                  <div className='record-height'>
                    <div className='record-main-title'>
                      {healthFile.height || '- -'}
                    </div>
                    <div className='record-main-text'>身高/cm</div>
                  </div>
                  <div className='record-weight'>
                    <div className='record-main-title'>
                      {healthFile.weight || '- -'}
                    </div>
                    <div className='record-main-text'>体重/kg</div>
                  </div>
                  <div className='record-bmi'>
                    <div className='record-main-title'>
                      {healthFile.bmi || '- -'}
                    </div>
                    <div className='record-main-text'>BMI</div>
                  </div>
                </div>
                <div className='record-foot-content'>
                  <div className='record-foot-content-title'>
                    {!healthFile.bmi
                      ? '暂无打卡记录！'
                      : healthFile.bmi < 18.5
                      ? 'BMI指数偏低，需要注意！'
                      : healthFile.bmi >= 18.5 && healthFile.bmi <= 23.9
                      ? 'BMI指数正常，非常棒！'
                      : healthFile.bmi > 23.9
                      ? 'BMI指数偏高，需要注意！'
                      : ''}
                  </div>
                  <div className='record-foot-content-text'>
                    {!healthFile.bmi
                      ? '请记录您的身体数据，坚持打卡持续关注健康状态。'
                      : '请继续注意合理饮食，坚持规律运动，保持愉悦的心情。'}
                  </div>
                </div>
              </div>
              {healthFile.bmi ? (
                <div>
                  <div className='record-main-basicData'>
                    <div className='range'>参考范围</div>
                    <div className='standard-value'>
                      成人BMI标准值：18.5-23.9
                    </div>
                    <div className='calculation'>
                      计算公式：BMI=体重(kg)/身高²(m)
                    </div>
                  </div>
                  <div className='record-chart'>
                    <div className='record-chart-top flex-between'>
                      <div className='record-chart-title'>近7次体重记录</div>
                      <div
                        className='record-chart-text'
                        onClick={() => handRedcordDataDetail()}
                        // `${ossHost}images/more.png`
                      >
                        查看更多记录
                        <img
                          alt=''
                          className='service-more'
                          src='https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/images/more.png'
                        />
                      </div>
                    </div>
                    <div className='pie-chart-content'>
                      <RecordChart
                        onRef={(ref) => (recordChart = ref)}
                        id='weight'
                        chartCode={'WEIGHT_HEIGHT'}></RecordChart>
                    </div>
                    <div className='record-chart-foot'>
                      您的体型正常，请继续保持合理的膳食和作息，适量的进行运动，保持愉快的心情。并随时关注体重的变化哦。
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {code === 'BLOOD_GLUCOSE' ? (
            <div>
              <div
                className={`public-data ${
                  (healthFile.timeQuantum &&
                    healthFile.timeQuantum === '空腹/餐前' &&
                    healthFile.fastingBloodGlucose &&
                    (healthFile.fastingBloodGlucose < 3.9 ||
                      healthFile.fastingBloodGlucose > 6.1)) ||
                  (healthFile.timeQuantum &&
                    healthFile.timeQuantum === '餐后2h' &&
                    (healthFile.fastingBloodGlucose < 3.9 ||
                      healthFile.fastingBloodGlucose > 7.8))
                    ? 'active'
                    : ''
                }`}>
                <div className='flex-between'>
                  <span className='record-title'>{title}</span>
                  <span className='record-time'>
                    {healthFile.updateDateMap &&
                    healthFile.updateDateMap.BLOOD_GLUCOSE
                      ? moment(
                          healthFile.updateDateMap &&
                            healthFile.updateDateMap.BLOOD_GLUCOSE
                        ).format('YY/MM/DD HH:mm')
                      : moment().format('YY/MM/DD HH:mm')}
                  </span>
                  {/* {healthFile.fastingBloodGlucose === 0 ? null : moment(healthFile.updateDateMap.HEART_RATE).format('YYYY/MM/DD HH:MM:SS')} */}
                </div>
                <div className='record-top-content flex-center'>
                  <div className='flex-center'>
                    <div className='record-content-title flex-center'>
                      <span className='record-top-content-title'>
                        {healthFile.fastingBloodGlucose || '- -'}
                      </span>
                      <span className='record-top-content-text'>
                        餐前血糖（mmol/L）
                      </span>
                    </div>
                  </div>
                  <div className='record-show'>
                    <span>偏低</span>
                    <span>正常</span>
                    <span>偏高</span>
                    {healthFile.fastingBloodGlucose === null ? (
                      <div className='record-triangle-normal'></div>
                    ) : healthFile.fastingBloodGlucose < 3.9 ? (
                      <div className='record-triangle'></div>
                    ) : healthFile.fastingBloodGlucose >= 3.9 &&
                      ((healthFile.fastingBloodGlucose <= 6.1 &&
                        healthFile.timeQuantum === '空腹/餐前') ||
                        (healthFile.fastingBloodGlucose <= 7.8 &&
                          healthFile.timeQuantum === '餐后2h')) ? (
                      <div className='record-triangle-normal'></div>
                    ) : (healthFile.fastingBloodGlucose > 6.1 &&
                        healthFile.timeQuantum === '空腹/餐前') ||
                      (healthFile.fastingBloodGlucose > 7.8 &&
                        healthFile.timeQuantum === '餐后2h') ? (
                      <div className='record-triangle-abnormal'></div>
                    ) : null}
                  </div>
                </div>
                <div className='record-foot-content'>
                  <div className='record-foot-content-title'>
                    {healthFile.fastingBloodGlucose === null
                      ? '暂无打卡记录！'
                      : healthFile.fastingBloodGlucose < 3.9
                      ? '血糖偏低，需控制在目标范围！'
                      : healthFile.fastingBloodGlucose >= 3.9 &&
                        ((healthFile.fastingBloodGlucose <= 6.1 &&
                          healthFile.timeQuantum === '空腹/餐前') ||
                          (healthFile.fastingBloodGlucose <= 7.8 &&
                            healthFile.timeQuantum === '餐后2h'))
                      ? '血糖正常，非常棒！'
                      : (healthFile.fastingBloodGlucose > 6.1 &&
                          healthFile.timeQuantum === '空腹/餐前') ||
                        (healthFile.fastingBloodGlucose > 7.8 &&
                          healthFile.timeQuantum === '餐后2h')
                      ? '血糖偏高，需控制在目标范围！'
                      : ''}
                  </div>
                  <div className='record-foot-content-text'>
                    {healthFile.fastingBloodGlucose === null
                      ? '请记录您的身体数据，坚持打卡持续关注健康状态。'
                      : '请继续关注血糖变化，若血糖持续偏高，建议马上就医咨询。合理调整药物、饮食、运动情况。'}
                  </div>
                </div>
              </div>
              {healthFile.fastingBloodGlucose ? (
                <div>
                  <div className='record-main-basicData'>
                    <div className='range'>参考范围</div>
                    <div className='record-value'>
                      <div className='standard-value'>
                        空腹/餐前血糖标准值：3.9-6.1mmol/L
                      </div>
                      <div className='calculation'>
                        餐后两小时血糖标准值：3.9-7.8mmol/L
                      </div>
                    </div>
                  </div>
                  <div className='record-chart'>
                    <div className='record-chart-top flex-between'>
                      <div className='record-chart-title'>近7次{title}记录</div>
                      <div
                        className='record-chart-text'
                        onClick={() => handRedcordDataDetail()}>
                        查看更多记录
                        <img
                          alt=''
                          className='service-more'
                          src='https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/images/more.png'
                        />
                      </div>
                    </div>
                    <div className='pie-chart-content'>
                      {/* <EChart ref={refPieChart} canvasId='pie-chart' /> */}
                      <RecordChart
                        onRef={(ref) => (recordChart = ref)}
                        id='bloodSugar'
                        chartCode={'BLOOD_GLUCOSE'}></RecordChart>
                    </div>
                    {code === 'BLOOD_GLUCOSE' ? (
                      <div className='record-chart-foot'>
                        日常活动主要消耗的就是糖类，所以多参加运动能够加快身体对血糖的代谢，从而降低血糖，预防血糖高引发糖尿病，进而伤害身体其的组织器官
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {code === 'BLOOD_PRESSURE' ? (
            <div>
              <div
                className={`public-data ${
                  healthFile.systolicBloodPressure === null &&
                  healthFile.diastolicBloodPressure === null
                    ? ''
                    : healthFile.systolicBloodPressure < 90 ||
                      healthFile.diastolicBloodPressure < 60 ||
                      healthFile.systolicBloodPressure > 139 ||
                      healthFile.diastolicBloodPressure > 89
                    ? 'active'
                    : ''
                }`}>
                <div className='flex-between'>
                  <span className='record-title'>{title}</span>
                  <span className='record-time'>
                    {healthFile.updateDateMap &&
                    healthFile.updateDateMap.BLOOD_PRESSURE
                      ? moment(
                          healthFile.updateDateMap &&
                            healthFile.updateDateMap.BLOOD_PRESSURE
                        ).format('YY/MM/DD HH:mm')
                      : moment().format('YY/MM/DD HH:mm')}
                  </span>
                </div>
                <div className='record-top-content flex-center'>
                  <div className='blood-pressure flex-center'>
                    <div className='record-content-title flex-center'>
                      <span className='record-top-content-title'>
                        {healthFile.systolicBloodPressure || '- -'}
                      </span>
                      <span className='record-top-content-text'>
                        收缩压（mmHg）
                      </span>
                    </div>
                    <div className='record-content-title flex-center'>
                      <span className='record-top-content-title'>
                        {healthFile.diastolicBloodPressure || '- -'}
                      </span>
                      <span className='record-top-content-text'>
                        舒张压（mmHg）
                      </span>
                    </div>
                  </div>
                  <div className='record-show'>
                    <span>偏低</span>
                    <span>正常</span>
                    <span>偏高</span>
                    {healthFile.systolicBloodPressure === null ? (
                      <div className='record-triangle-normal'></div>
                    ) : healthFile.systolicBloodPressure < 90 ||
                      healthFile.diastolicBloodPressure < 60 ? (
                      <div className='record-triangle'></div>
                    ) : healthFile.systolicBloodPressure >= 90 &&
                      healthFile.systolicBloodPressure <= 139 &&
                      healthFile.diastolicBloodPressure >= 60 &&
                      healthFile.diastolicBloodPressure <= 89 ? (
                      <div className='record-triangle-normal'></div>
                    ) : healthFile.systolicBloodPressure > 139 ||
                      healthFile.diastolicBloodPressure > 89 ? (
                      <div className='record-triangle-abnormal'></div>
                    ) : null}
                  </div>
                </div>
                {/* {healthFile.fastingBloodGlucose === 0 ? (
                  <div className='record-foot-content'>
                    <div className='record-foot-content-title'>
                      暂无打卡记录！
                    </div>
                    <div className='record-foot-content-text'>
                      请记录您的身体数据，坚持打卡持续关注健康状态。
                    </div>
                  </div>
                ) : null} */}

                <div className='record-foot-content'>
                  <div className='record-foot-content-title'>
                    {healthFile.systolicBloodPressure === null &&
                    healthFile.diastolicBloodPressure === null
                      ? '暂无打卡记录！'
                      : healthFile.systolicBloodPressure < 90 ||
                        healthFile.diastolicBloodPressure < 60
                      ? '血压偏低，需控制在目标范围！'
                      : healthFile.systolicBloodPressure >= 90 &&
                        healthFile.systolicBloodPressure <= 139 &&
                        healthFile.diastolicBloodPressure >= 60 &&
                        healthFile.diastolicBloodPressure <= 89
                      ? '您本次测量的血压值正常，非常棒！'
                      : healthFile.systolicBloodPressure > 139 ||
                        healthFile.diastolicBloodPressure > 89
                      ? '血压偏高，需控制在目标范围！'
                      : ''}
                  </div>
                  <div className='record-foot-content-text'>
                    {healthFile.systolicBloodPressure === null &&
                    healthFile.diastolicBloodPressure === null
                      ? '请记录您的身体数据，坚持打卡持续关注健康状态。'
                      : '请继续保持合理的膳食和作息，适量的运动，保持愉快的心情，并随时关注血压的变化。'}
                  </div>
                </div>
              </div>
              {healthFile.systolicBloodPressure &&
              healthFile.diastolicBloodPressure ? (
                <div>
                  <div className='record-main-basicData'>
                    <div className='range'>参考范围</div>
                    <div className='record-value'>
                      <div className='standard-value'>
                        收缩压标准值：90-140mmHg
                      </div>
                      <div className='calculation'>舒张压标准值：60-90mmHg</div>
                    </div>
                  </div>
                  <div className='record-chart'>
                    <div className='record-chart-top flex-between'>
                      <div className='record-chart-title'>近7次{title}记录</div>
                      <div
                        className='record-chart-text'
                        onClick={() => handRedcordDataDetail()}>
                        查看更多记录
                        <img
                          alt=''
                          className='service-more'
                          src='https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/images/more.png'
                        />
                      </div>
                    </div>
                    <div className='pie-chart-content'>
                      {/* <EChart ref={refPieChart} canvasId='pie-chart' /> */}
                      <RecordChart
                        onRef={(ref) => (recordChart = ref)}
                        id='pressure'
                        chartCode={'BLOOD_PRESSURE'}></RecordChart>
                    </div>
                    <div className='record-chart-foot'>
                      血压状态保持良好，请继续保持！请注意合理膳食，坚持运动，保持好的心情。
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {code === 'HEART_RATE' ? (
            <div>
              <div
                className={`public-data ${
                  healthFile.heartRate === null
                    ? ''
                    : healthFile.heartRate < 60 || healthFile.heartRate > 100
                    ? 'active'
                    : ''
                }`}>
                <div className='flex-between'>
                  <span className='record-title'>{title}</span>
                  <span className='record-time'>
                    {healthFile.updateDateMap &&
                    healthFile.updateDateMap.HEART_RATE
                      ? moment(
                          healthFile.updateDateMap &&
                            healthFile.updateDateMap.HEART_RATE
                        ).format('YY/MM/DD HH:mm')
                      : moment().format('YY/MM/DD HH:mm')}
                  </span>
                </div>
                <div className='record-top-content flex-center'>
                  <div className='blood-pressure flex-center'>
                    <div className='record-content-title flex-center'>
                      <span className='record-top-content-title'>
                        {healthFile.heartRate || '-'}
                      </span>
                      <span className='record-top-content-text'>
                        心率（bmp）
                      </span>
                    </div>
                  </div>
                  <div className='record-show'>
                    <span>偏低</span>
                    <span>正常</span>
                    <span>偏高</span>
                    {healthFile.heartRate === null ? (
                      <div className='record-triangle-normal'></div>
                    ) : healthFile.heartRate < 60 ? (
                      <div className='record-triangle'></div>
                    ) : healthFile.heartRate >= 60 &&
                      healthFile.heartRate <= 100 ? (
                      <div className='record-triangle-normal'></div>
                    ) : healthFile.heartRate > 100 ? (
                      <div className='record-triangle-abnormal'></div>
                    ) : null}
                  </div>
                </div>
                <div className='record-foot-content'>
                  <div className='record-foot-content-title'>
                    {healthFile.heartRate === null
                      ? '暂无打卡记录！'
                      : healthFile.heartRate < 60
                      ? '心率值偏低，需控制在目标范围！'
                      : healthFile.heartRate >= 60 &&
                        healthFile.heartRate <= 100
                      ? '本次测量的心率值正常，非常棒！'
                      : healthFile.heartRate > 100
                      ? '心率值偏高，需控制在目标范围！'
                      : ''}
                  </div>
                  <div className='record-foot-content-text'>
                    {healthFile.heartRate === null
                      ? '请记录您的身体数据，坚持打卡持续关注健康状态。'
                      : '请继续关注心率变化，平时适当锻炼身体来提高心肌收缩能力，保持良好的心态，减少烟酒的摄入。'}
                  </div>
                </div>
              </div>
              {healthFile.heartRate ? (
                <div>
                  <div className='record-main-basicData'>
                    <div className='range'>参考范围</div>

                    <div className='record-value'>
                      <div className='standard-value'>
                        成人心率标准值：60-100bmp
                      </div>
                    </div>
                  </div>
                  <div className='record-chart'>
                    <div className='record-chart-top flex-between'>
                      <div className='record-chart-title'>近7次{title}记录</div>
                      <div
                        className='record-chart-text'
                        onClick={() => handRedcordDataDetail()}>
                        查看更多记录
                        <img
                          alt=''
                          className='service-more'
                          src='https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/images/more.png'
                        />
                      </div>
                    </div>
                    <div className='pie-chart-content'>
                      {/* <EChart ref={refPieChart} canvasId='pie-chart' /> */}
                      <RecordChart
                        onRef={(ref) => (recordChart = ref)}
                        id='heartRate'
                        chartCode={'HEART_RATE'}></RecordChart>
                    </div>
                    <div className='record-chart-foot'>
                      心率状态保持良好，请继续保持！请注意合理膳食，坚持运动，保持好的心情。
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {code === 'SPORT' ? (
            <div>
              <div
                className={`public-data-motion ${
                  (healthFile?.allCalorie && healthFile.allCalorie) === null &&
                  (healthFile?.allSportDuration &&
                    healthFile.allSportDuration) === null
                    ? ''
                    : // : (sportList?.allSportDuration&&sportList.allSportDuration) < 30 || (sportList?.allSportDuration&&sportList.allSportDuration) > 60
                      // ? "active"
                      'active'
                }`}>
                <div className='flex-between'>
                  <span className='record-title'>{title}</span>
                  <span className='record-time'>
                    {healthFile.updateDateMap && healthFile.updateDateMap.SPORT
                      ? moment(
                          healthFile.updateDateMap &&
                            healthFile.updateDateMap.SPORT
                        ).format('YY/MM/DD HH:mm')
                      : moment().format('YY/MM/DD HH:mm')}
                  </span>
                </div>
                <div className='record-top-content '>
                  <div className='blood-pressure flex-center'>
                    <div className='record-content-title flex-center'>
                      <span className='record-top-content-title'>
                        {(healthFile?.allCalorie && healthFile.allCalorie) ||
                          '- -'}
                      </span>
                      <span className='record-top-content-text'>
                        今日消耗(kcal)
                      </span>
                    </div>
                    <div className='record-content-title flex-center'>
                      <span className='record-top-content-title'>
                        {(healthFile?.allSportDuration &&
                          healthFile.allSportDuration) ||
                          '- -'}
                      </span>
                      <span className='record-top-content-text'>
                        运动时长(min)
                      </span>
                    </div>
                  </div>
                </div>
                <div className='record-foot-content'>
                  <div className='record-foot-content-title'>
                    {(healthFile?.allCalorie && healthFile.allCalorie) ===
                      null &&
                    (healthFile?.allSportDuration &&
                      healthFile.allSportDuration) === null
                      ? '暂无打卡记录！'
                      : // : (sportList?.allSportDuration&&sportList.allSportDuration) > 30 && (sportList?.allSportDuration&&sportList.allSportDuration) < 60
                        // ? "您今日的运动量达标！"
                        // : (sportList?.allSportDuration&&sportList.allSportDuration) > 60
                        // ? "您今日的运动量偏高！"
                        '您今日的运动量达标！'}
                  </div>
                  <div className='record-foot-content-text'>
                    {(healthFile?.allCalorie && healthFile.allCalorie) ===
                      null &&
                    (healthFile?.allSportDuration &&
                      healthFile.allSportDuration) === null
                      ? '请记录您的身体数据，坚持打卡持续关注健康状态。'
                      : // : (sportList?.allSportDuration&&sportList.allSportDuration) > 30 && (sportList?.allSportDuration&&sportList.allSportDuration) < 60
                        // ? "您已坚持运动3天，请继续保持每日适量运动，多喝水能够增加新陈代谢的速度，这样能够消耗掉更多的热量。"
                        // : (sportList?.allSportDuration&&sportList.allSportDuration) > 60
                        // ? "请继续保持每日适量运动，健康的运动习惯可增强体质、加快新陈代谢。"
                        '请继续保持每日适量运动，健康的运动习惯可增强体质、加快新陈代谢'}
                  </div>
                </div>
              </div>
              {(healthFile?.allCalorie && healthFile.allCalorie) !== null &&
              (healthFile?.allSportDuration && healthFile.allSportDuration) !==
                null ? (
                <div>
                  <div className='record-main-motionData'>
                    {sportList?.sportList &&
                      sportList.sportList.length &&
                      sportList?.sportList.map((v, i) => {
                        return (
                          <div className='range' key={i}>
                            <span>{v.sportEvent}</span>
                            <span>{v.sportDuration}min</span>
                            <span>{v.calorie}kcal</span>
                          </div>
                        );
                      })}
                  </div>
                  <div className='record-chart'>
                    <div className='record-chart-top flex-between'>
                      <div className='record-chart-title'>近7天{title}记录</div>
                      <div
                        className='record-chart-text'
                        onClick={() => history.push('/record/motionRecord')}>
                        查看更多记录
                        <img
                          alt=''
                          className='service-more'
                          src='https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/images/more.png'
                        />
                      </div>
                    </div>
                    <div className='pie-chart-content'>
                      <MotionChart
                        data={motionTime}
                        //  onRef={(ref) => (recordChart = ref)}
                        onRef={motionRef}></MotionChart>
                    </div>
                    <div className='record-chart-foot'>
                      良好的运动习惯有助于保持身材，降低患病风险。记得多喝水帮助新陈代谢，消耗更多热量。
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {code === 'SLEEP' ? (
            <div className='public-sleep-content'>
              {(healthFile.updateDateMap && healthFile.updateDateMap.SLEEP) ===
              null ? (
                <div className={`public-sleep-data`}>
                  <div className='flex-between'>
                    <span className='record-title'>{title}</span>
                  </div>
                  {(healthFile.updateDateMap &&
                    healthFile.updateDateMap.SLEEP) === null ? (
                    <div className='record-sleep-title'>
                      您还没有睡眠记录呦～
                    </div>
                  ) : null}
                  <div className='record-foot-content'>
                    <div className='record-foot-content-title'>
                      {(healthFile.updateDateMap &&
                        healthFile.updateDateMap.SLEEP) === null
                        ? '暂无打卡记录！'
                        : ''}
                    </div>
                    <div className='record-foot-content-text'>
                      {(healthFile.updateDateMap &&
                        healthFile.updateDateMap.SLEEP) === null
                        ? '请记录您的身体数据，坚持打卡持续关注健康状态。'
                        : ''}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`public-sleep-data active `}>
                  <div className='flex-between'>
                    <span className='record-title'></span>
                    <span className='record-time'>
                      {healthFile.updateDateMap &&
                      healthFile.updateDateMap.SLEEP
                        ? moment(
                            healthFile.updateDateMap &&
                              healthFile.updateDateMap.SLEEP
                          ).format('YY/MM/DD HH:mm')
                        : moment().format('YY/MM/DD HH:mm')}
                    </span>
                  </div>
                  <div className='record-sleep-content'>
                    <div>
                      睡眠状况
                      <span className='sleep-status'>
                        {
                          sleepState[
                            sleepDetail?.sleepState && sleepDetail.sleepState
                          ]
                        }
                      </span>
                    </div>
                    <div>
                      您大概
                      <span>
                        {asleep[sleepDetail?.asleep && sleepDetail.asleep]}
                      </span>
                      睡着
                    </div>
                    <div>
                      您早晨
                      <span>{wake[sleepDetail?.wake && sleepDetail.wake]}</span>
                      醒来
                    </div>
                    <div>
                      晚上
                      <span>
                        {
                          havaWake[
                            sleepDetail?.havaWake && sleepDetail.havaWake
                          ]
                        }
                      </span>
                    </div>
                    <div>
                      服用助眠类药物情况
                      <span>
                        {
                          medicineFlag[
                            sleepDetail?.medicineFlag &&
                              sleepDetail.medicineFlag
                          ]
                        }
                      </span>
                    </div>
                    <div>
                      前一天白天小睡情况
                      <span>
                        {
                          haveSleepFlag[
                            sleepDetail?.haveSleepFlag &&
                              sleepDetail.haveSleepFlag
                          ]
                        }
                      </span>
                    </div>
                    <div>
                      早上起来感觉
                      {sleepDetail?.wakeFeeling &&
                        sleepDetail.wakeFeeling &&
                        sleepDetail.wakeFeeling
                          .split(',')
                          .map((item, index) => {
                            return (
                              <span key={`感觉${index}`}>
                                {wakeFeeling[item]}
                              </span>
                            );
                          })}
                    </div>
                    {sleepDetail?.remark && sleepDetail.remark ? (
                      <div className='supplementary-content'>
                        补充内容：
                        {(sleepDetail?.remark && sleepDetail.remark) || '-'}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              {(healthFile.updateDateMap && healthFile.updateDateMap.SLEEP) !==
              null ? (
                <div>
                  <div className='record-chart'>
                    <div className='record-chart-top flex-between'>
                      <div className='record-chart-title'>近7天{title}记录</div>
                      <div
                        className='record-chart-text'
                        onClick={() => history.push('/record/sleepDetail')}>
                        查看更多记录
                        <img
                          alt=''
                          className='service-more'
                          src='https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/images/more.png'
                        />
                      </div>
                    </div>
                    <div className='pie-chart-content'>
                      {/* <RecordChart
                        id='pressure'
                        chartCode={'BLOOD_PRESSURE'}></RecordChart> */}
                      {/* <canvas id='myChart' className='my-chart'></canvas> */}
                      <SleepChart data={sleepTime}></SleepChart>
                    </div>
                    <div className='record-chart-foot'>
                      良好的睡眠将保护您的大脑，恢复一天的精力；同时好的睡眠习惯有助于提高身体免疫力，延缓衰老，保持健康情绪状态。
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {showNumber === 2 ? (
          <Drawer
            title={title}
            close={() => {
              setShowNumber(0);
              setActiveIndex(3);
            }}>
            <div className='blood-sugar flex-between'>
              <div className='blood-sugar-title'>测量时间段</div>
              <div className='blood-sugar-text-content flex-between'>
                {sugarText.length > 0 &&
                  sugarText.map((v, i) => {
                    return (
                      <div
                        key={i}
                        className={`blood-sugar-text-content-text flex-center ${
                          activeIndex === i ? 'active' : ''
                        }`}
                        onClick={() => handBloodSugar(v, i)}>
                        {v}
                      </div>
                    );
                  })}
                {/* <div className='blood-sugar-text-content-text flex-center'>餐后2h</div> */}
              </div>
            </div>
            <div className='blood-suga flex-between'>
              <div className='blood-sugar-title'>血糖值（mmol/L）</div>
              <div className='blood-sugar-input'>
                <input
                  onChange={(e) => changeSugar(e)}
                  type='text'
                  placeholder='请输入血糖值(mmol/L)'
                  className='sugar-input'
                  value={sugar}
                />
              </div>
            </div>
            <Button
              className={`blood-suga-btn ${disabled ? '' : 'active'}`}
              disabled={disabled}
              onClick={() => handBloodSugaOk()}>
              确认
            </Button>
          </Drawer>
        ) : null}
        {showNumber === 3 ? (
          <Drawer
            title={title}
            close={() => {
              setShowNumber(0);
            }}>
            <div className='blood-pressure-drawer'>
              <div className='blood-pressure-drawer-title'>收缩压（mmHg）</div>
              <div className='blood-pressure-drawer-input'>
                <InputItem
                  className='pressure-input'
                  placeholder='请输入收缩压（mmHg）'
                  type='number'
                  clear
                  value={systolicBloodPressure}
                  onChange={(e) => {
                    setSystolicBloodPressure(e);
                  }}
                />
              </div>
            </div>
            <div className='blood-pressure-drawer'>
              <div className='blood-pressure-drawer-title'>舒张压（mmHg）</div>
              <div className='blood-pressure-drawer-input'>
                <InputItem
                  className='pressure-input'
                  placeholder='请输入舒张压（mmHg）'
                  type='number'
                  clear
                  value={diastolicBloodPressure}
                  onChange={(e) => {
                    setDiastolicBloodPressure(e);
                  }}
                />
              </div>
            </div>
            <Button
              className={`blood-pressure-drawer-btn ${
                !systolicBloodPressure || !diastolicBloodPressure
                  ? ''
                  : 'active'
              }`}
              disabled={!systolicBloodPressure || !diastolicBloodPressure}
              onClick={() => onChangeBloodPressure()}>
              确认
            </Button>
          </Drawer>
        ) : null}
        {showNumber === 5 ? (
          <Drawer
            title='运动记录'
            close={() => {
              setShowNumber(0);
              setMotionActiveIndex(32);
              setMotionActiveIndexOne(35);
              setMotionActiveIndexTwo(35);
              setMoreFlag(true);

              // if(moreFlag === false){
              //   setTextHeight('80px');
              // }

              setDuration('');
            }}>
            <div className='blood-suga-to flex-between'>
              <div className='blood-sugar-title'>运动时长（min）</div>
              <div className='blood-sugar-input'>
                <input
                  onChange={(e) => changeDuration(e)}
                  type='text'
                  placeholder='请输入运动时长'
                  className='sugar-input'
                  value={duration}
                  onFocus={() => {
                    onFocus();
                  }}
                />
                {/* <button
                  className="blood-sugar-input-btn"
                  onClick={() => handOk()}
                >
                 确认
                </button> */}
              </div>
            </div>

            <div className='blood-sugar-to flex-between'>
              <div className='blood-sugar-text-content flex-between'>
                {motionText.length > 0 &&
                  motionText.slice(0, 8).map((v, i) => {
                    return (
                      <div
                        key={v.id}
                        className={`blood-sugar-text-content-text flex-center ${
                          motionActiveIndex === i ? 'active' : ''
                        }`}
                        onClick={() => handMotion(v, i)}>
                        {v.sportName}
                      </div>
                    );
                  })}
              </div>
            </div>

            {!moreFlag ? (
              <div className='blood-sugar-to flex-between'>
                <div className='blood-sugar-text-content flex-between'>
                  {motionText.length > 0 &&
                    motionText.slice(8, 28).map((v, i) => {
                      return (
                        <div
                          key={v.id}
                          className={`blood-sugar-text-content-text flex-center ${
                            motionActiveIndexOne === i ? 'active' : ''
                          }`}
                          onClick={() => handMotionOne(v, i)}>
                          {v.sportName}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : null}
            {!moreFlag ? (
              <div className='blood-sugar-to-one flex-between'>
                <div className='blood-sugar-text-content flex-between'>
                  {motionText.length > 0 &&
                    motionText.slice(28, 31).map((v, i) => {
                      return (
                        <div
                          key={v.id}
                          className={`blood-sugar-text-content-text flex-center ${
                            motionActiveIndexTwo === i ? 'active' : ''
                          }`}
                          onClick={() => handMotionTwo(v, i)}>
                          {v.sportName}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : null}
            {moreFlag ? (
              <div className='blood-sugar-more' onClick={() => handMore()}>
                +更多
              </div>
            ) : null}

            <Button
              className={`blood-suga-btn ${motionDisabled ? '' : 'active'}`}
              disabled={motionDisabled}
              onClick={() => handBloodMotionOk()}>
              保存
            </Button>
          </Drawer>
        ) : null}
        {title === '经期' ? null : (
          <div className='container'>
            {code === 'WEIGHT_HEIGHT' ? (
              !user || !user.hasIdCard ? (
                <div
                  className='container-btn picker'
                  onClick={() => {
                    if (!localStorage.getItem('token')) {
                      goLogin();
                      return;
                    }
                    if (!user || !user.hasIdCard) {
                      Toast.info('为保存您的打卡记录，请实名后进行健康打卡', 1);
                      return;
                    }
                    setShowNumber(1);
                  }}>
                  手动录入
                </div>
              ) : (
                <Picker
                  data={multiArray}
                  cascade={false}
                  value={multiData && multiData ? multiData : []}
                  title='身高体重'
                  indicatorStyle={{ color: '#FF5D50' }}
                  onChange={(e) => onChangeBasicData(e)}>
                  <div
                    className='container-btn picker'
                    onClick={() => {
                      setShowNumber(1);
                    }}>
                    手动录入
                  </div>
                </Picker>
              )
            ) : null}
            {code === 'BLOOD_GLUCOSE' ? (
              <div
                className='container-btn'
                onClick={() => {
                  if (!localStorage.getItem('token')) {
                    goLogin();
                    return;
                  }
                  if (!user || !user.hasIdCard) {
                    Toast.info('为保存您的打卡记录，请实名后进行健康打卡', 1);
                    return;
                  }
                  setShowNumber(2);
                }}>
                添加血糖记录
              </div>
            ) : null}
            {code === 'BLOOD_PRESSURE' ? (
              <div
                className='container-btn'
                onClick={() => {
                  if (!localStorage.getItem('token')) {
                    goLogin();
                    return;
                  }
                  if (!user || !user.hasIdCard) {
                    Toast.info('为保存您的打卡记录，请实名后进行健康打卡', 1);
                    return;
                  }
                  setShowNumber(3);
                }}>
                添加血压记录
              </div>
            ) : null}
            {code === 'HEART_RATE' ? (
              !user || !user.hasIdCard ? (
                <div
                  className='container-btn'
                  onClick={() => {
                    if (!localStorage.getItem('token')) {
                      goLogin();
                      return;
                    }
                    if (!user || !user.hasIdCard) {
                      Toast.info('为保存您的打卡记录，请实名后进行健康打卡', 1);
                      return;
                    }
                    setShowNumber(4);
                  }}>
                  添加心率记录
                </div>
              ) : (
                <Picker
                  data={heartRate}
                  cascade={false}
                  cols={1}
                  title='心率记录'
                  value={heartRateData}
                  indicatorStyle={{ color: '#FF5D50' }}
                  onChange={(e) => onChangeBloodRate(e)}>
                  <div
                    className='container-btn'
                    onClick={() => {
                      setShowNumber(4);
                    }}>
                    添加心率记录
                  </div>
                </Picker>
              )
            ) : null}
            {code === 'SPORT' ? (
              <div className='container-btn' onClick={() => setShowNumber(5)}>
                添加运动记录
              </div>
            ) : null}
            {code === 'SLEEP' ? (
              <div
                className='container-btn'
                onClick={() => history.push(`/record/healthSleep`)}>
                添加睡眠记录
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Page>
  );
}

export default HealthDetail;
