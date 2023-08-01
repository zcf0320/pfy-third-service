// import utils from '@utils/index';
import { getHealthFileDetailRecord } from '@api/healthRecord';
import React, { useState, useEffect } from 'react';
import Page from '../../../components/Page';
// import { timeFormat } from '@utils/time';
import { getUrlParams } from '@utils/filter';
import {useCallbackState} from '../components/useCallbackState';
import ListView from '../components/listView';
import './index.scss';

const pageNum : number= 1;
let pageSize: number = 10;

function RecordDataDetail () {
  
  const [data, setData]:any = useState([]);
  const [title, setTitle]:any = useState('');
  const [total, setTotal]:any = useState();
  // 基础数据
  const [heightPageNum,setHeightPageNum] = useCallbackState(1);
  // 血糖
  const [glucosePageNum,setGlucosePageNum] = useCallbackState(1);
  // 血压
  const [pressurePageNum,setPressurePageNum] = useCallbackState(1);
  // 心率
  const [hatePageNum,setHatePageNum] = useCallbackState(1);
  // const [current,setCurrent]
  useEffect(() => {
    let title = getUrlParams('title');
    setTitle(title);
    const data = {
      pageNum,
      pageSize,
      healthRecordEnum: 
      title === '基础数据'? 'WEIGHT_HEIGHT':
      title === '血糖' ?'BLOOD_GLUCOSE':
      title === '血压' ? 'BLOOD_PRESSURE':
      title === '心率' ? 'HEART_RATE': ''
    };
    getHealthFileDetailRecord(data)
      .then((res: any) => {
        setData(res.records);
        setTotal(res.total);
      })
      .catch(() => {}); 
  }, []);

 const callback = () =>{
  if (title === '基础数据') {
    setHeightPageNum((heightPageNum+1),(pageDataNum:any)=>{
      const data = {
        pageNum:pageDataNum,
        pageSize,
        healthRecordEnum: 'WEIGHT_HEIGHT'
      };
      getHealthFileDetailRecord(data)
        .then((res: any) => {
          setData((arr:any[])=>{
            arr = arr.concat([...res.records]);
            return [...arr];
          });
          setTotal(res.total);
        })
        .catch(() => {});
    });
  }
  if (title === '血糖') {
    setGlucosePageNum((glucosePageNum+1),(pageDataNum:any)=>{
      const data = {
        pageNum:pageDataNum,
        pageSize,
        healthRecordEnum: 'BLOOD_GLUCOSE'
      };
      getHealthFileDetailRecord(data)
        .then((res: any) => {
          setData((arr:any[])=>{
            arr = arr.concat([...res.records]);
            return [...arr];
          });
          setTotal(res.total);
        })
        .catch(() => {});
    });
 
  }
  if (title === '血压') {
    setPressurePageNum((pressurePageNum+1),(pageDataNum:any)=>{
      const data = {
        pageNum:pageDataNum,
        pageSize,
        healthRecordEnum: 'BLOOD_PRESSURE'
      };
      getHealthFileDetailRecord(data)
        .then((res: any) => {
          setData((arr:any[])=>{
            arr = arr.concat([...res.records]);
            return [...arr];
          });
          setTotal(res.total);
        })
        .catch(() => {});
    });
  }
  if (title === '心率') {
    setHatePageNum((hatePageNum+1),(pageDataNum:any)=>{
      const data = {
        pageNum:pageDataNum,
        pageSize,
        healthRecordEnum: 'HEART_RATE'
      };
      getHealthFileDetailRecord(data)
        .then((res: any) => {
          setData((arr:any[])=>{
            arr = arr.concat([...res.records]);
            return [...arr];
          });
          setTotal(res.total);
        })
        .catch(() => {});
    });

  }
 };
  return (
   <Page title = {title}>
     <div className='recordDataDetail'>
     <div>
       <ListView
        list={data}
        total={total}
        callback={callback}
        title = {title}
       ></ListView>
    </div>
    </div>
   </Page>
  );
}

export default RecordDataDetail;
