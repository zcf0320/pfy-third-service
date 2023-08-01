import Page from '@components/Page';
import React,{useState,useEffect} from 'react';
import { Button, } from 'antd-mobile';
import {healthInsertOrUpdate} from '@api/points';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {asleepes,wakes,havaWakes,medicineFlags,haveSleepFlags,wakeFeelings} from '@utils/enum';
import './index.scss';
const healthSleepAsleep = ['晚上10点前','10点-11点','11点-12点','12点后'];
const healthSleepWake = ['早上五点前','5点-7点','7点-9点','9点后'];
const healthSleepHavaWake = ['1次','2-3次','3次以上','整夜未醒'];
const healthSleepMedicineFlag = ['否','是'];
const healthSleepShaveSleepFlag = ['否','是'];
const healthSleepWakeFeeling = ['神清气爽','头脑发昏','乏累困倦','腰酸背痛'];
const HealthSleep = () => {
  const [oneActiveIndex,setOneActiveIndex] = useState();
  const [asleep,setAsleep]:any = useState(0);
  const [twoActiveIndex,setTwoActiveIndex] = useState();
  const [wake, setWake]:any = useState(0);
  const [threeActiveIndex,setThreeActiveIndex] = useState();
  const [havaWake, setHavaWake]:any = useState(0);
  const [fourActiveIndex,setFourActiveIndex] = useState();
  const [medicineFlag, setMedicineFlag]:any = useState(3);
  const [fiveActiveIndex,setFiveActiveIndex] = useState();
  const [shaveSleepFlag,setShaveSleepFlag]:any = useState(3);
  const [disabled, setDisabled] = useState(true);
  const [wakeFeeling, setWakeFeeling]:any = useState([]);
  const [text,setText] = useState('');
  const history = useHistory();
  useEffect(()=>{
      if(asleep === 0||wake===0||havaWake===0
        ||medicineFlag===3||shaveSleepFlag===3
        ||wakeFeeling.length===0){
        setDisabled(true);
      }else{
        setDisabled(false);
      }
  },[asleep,wake,havaWake,medicineFlag,shaveSleepFlag,wakeFeeling]);
  const healthClickAsleep = (v,i) => {
   setAsleep(asleepes(v));
    setOneActiveIndex(i);
    
  };
 
  const healthClickWake = (v,i) => {
    setWake(wakes(v));
    
    setTwoActiveIndex(i);
  };
 
  const healthClickHavaWake = (v,i) => {
    setHavaWake(havaWakes(v));
    
    setThreeActiveIndex(i);
  };
  
  const healthClickMedicineFlag = (v,i) => {
    setMedicineFlag(medicineFlags(v));
    
    setFourActiveIndex(i);
  };
  
  const healthClickShaveSleepFlag = (v,i) => {
    setShaveSleepFlag(haveSleepFlags(v));
    
    setFiveActiveIndex(i);
  };
  
  const healthClickWakeFeeling = (v:any) => {
    
    setWakeFeeling([...wakeFeeling, wakeFeelings(v)]);
    if (wakeFeeling.includes(wakeFeelings(v))) {
      setWakeFeeling(wakeFeeling.filter((val: any) => val !== wakeFeelings(v)));
    } else {
      setWakeFeeling([...wakeFeeling, wakeFeelings(v)]);
    }
  };
  
  // 保存
  const handClick = () =>{

    let data ={
      asleep,
      havaWake,
      haveSleepFlag:shaveSleepFlag,
      medicineFlag,
      remark: text,
      wake,
      wakeFeeling: wakeFeeling.toString(),
    };
    
    healthInsertOrUpdate(data).then(res=>{
      if(res){
        history.push(`/record/recordDetail?title=睡眠`);
      }
      
    });
  };
  return (
    <Page title = '睡眠'>
        <div className='healthSleep'>
          
          <div className='health'>
          <div className='healthSleep-content'>
            <div className='sleep-clock'>
              <span>睡眠打卡</span><span>{moment().format('YY/MM/DD HH:MM')}</span>
            </div>
            <div className='healthSleep-content-one'>
              <div className='healthSleep-content-one-top'>
                <span>* </span>
                您昨晚大概几点睡的？
              </div>
              <div className='healthSleep-content-one-content'>
                {
                  healthSleepAsleep.length > 0 && healthSleepAsleep.map((v,i) => {
                    return (
                      <div className={`healthSleep-content-one-text ${oneActiveIndex === i ? 'active':''}`} 
                      onClick={()=>healthClickAsleep(v,i)}
                      key={i}>
                         {v}
                      </div>
                    );
                  })
                }
                
              </div>
            </div>
            <div className='healthSleep-content-two'>
              <div className='healthSleep-content-one-top'>
                <span>* </span>
                您今早几点醒来？
              </div>
              <div className='healthSleep-content-one-content'>
                {
                  healthSleepWake.length > 0 && healthSleepWake.map((v,i) => {
                    return (
                      <div className={`healthSleep-content-one-text ${twoActiveIndex === i ? 'active':''}`} 
                      onClick={()=>healthClickWake(v,i)}
                      key={i}>
                         {v}
                      </div>
                    );
                  })
                }
                
              </div>
            </div>
            <div className='healthSleep-content-two'>
              <div className='healthSleep-content-one-top'>
                <span>* </span>
                昨晚有醒过吗？
              </div>
              <div className='healthSleep-content-one-content'>
                {
                  healthSleepHavaWake.length > 0 && healthSleepHavaWake.map((v,i) => {
                    return (
                      <div className={`healthSleep-content-one-text ${threeActiveIndex === i ? 'active':''}`} 
                      onClick={()=>healthClickHavaWake(v,i)}
                      key={i}>
                         {v}
                      </div>
                    );
                  })
                }
                
              </div>
            </div>
            <div className='healthSleep-content-two'>
              <div className='healthSleep-content-one-top'>
                <span>* </span>
                昨天服用过助眠类药物吗？
              </div>
              <div className='healthSleep-content-four-content'>
                {
                  healthSleepMedicineFlag.length > 0 && healthSleepMedicineFlag.map((v,i) => {
                    return (
                      <div className={`healthSleep-content-one-text ${fourActiveIndex === i ? 'active':''}`} 
                      onClick={()=>healthClickMedicineFlag(v,i)}
                      key={i}>
                         {v}
                      </div>
                    );
                  })
                }
                
              </div>
            </div>
            <div className='healthSleep-content-two'>
              <div className='healthSleep-content-one-top'>
                <span>* </span>
                昨天白天有小睡一会吗？
              </div>
              <div className='healthSleep-content-four-content'>
                {
                  healthSleepShaveSleepFlag.length > 0 && healthSleepShaveSleepFlag.map((v,i) => {
                    return (
                      <div className={`healthSleep-content-one-text ${fiveActiveIndex === i ? 'active':''}`} 
                      onClick={()=>healthClickShaveSleepFlag(v,i)}
                      key={i}>
                         {v}
                      </div>
                    );
                  })
                }
                
              </div>
            </div>
            <div className='healthSleep-content-two'>
              <div className='healthSleep-content-one-top'>
                <span>* </span>
                今早起来感觉如何？
              </div>
              <div className='healthSleep-content-one-content'>
                {
                  healthSleepWakeFeeling.length > 0 && healthSleepWakeFeeling.map((v,i) => {
                    return (
                      <div className={`healthSleep-content-one-text ${wakeFeeling.includes(wakeFeelings(v)) ? 'active':''}`} 
                      onClick={()=>healthClickWakeFeeling(v)}
                      key={i}>
                         {v}
                      </div>
                    );
                  })
                }
                
              </div>
            </div>
            <div className='healthSleep-content-two'>
              <div className='healthSleep-content-one-top'>
               
              补充内容
              </div>
              <textarea
              className='textarea'
              value={text}
              maxLength={300}
              onChange={(e: any) => {
              setText(e.target.value);
            }}
              placeholder='请输入补充内容……'
              ></textarea>
            </div>
          </div>
          </div>
          <div className='healthSleep-footer'>
          <Button className={`healthSleep-btn ${disabled ? '':'active'}`}
          disabled={disabled}
          onClick={()=>handClick()}
          >保存</Button>
        </div>
        </div>
    </Page>
    
  );
};
export default HealthSleep;