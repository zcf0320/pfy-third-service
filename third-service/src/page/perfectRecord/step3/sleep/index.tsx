/** @format */

import React, { useState, useEffect } from 'react';
import './index.scss';
import Tag from 'page/perfectRecord/component/Tag';
import Jump from 'page/perfectRecord/component/Jump';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

type IProps = {
  setIndex: (index: number, data?: any) => void;
};

const Sleep = (props: IProps) => {
  const perfectRecordStore = useStores('perfectRecordStore');

  const loseSleepList = ['每周<1次', '每周2-3次', '每周>3次'];
  const sleepDurationList = ['<6小时', '6-9小时', '>9小时'];
  const dreamList = ['每天做', '偶尔做', '几乎不做'];

  const [loseSleep, setLoseSleep] = useState([]);
  const [sleepDuration, setSleepDuration] = useState([]);
  const [dream, setDream] = useState([]);

  useEffect(() => {
    let { loseSleep, sleepDuration, dream } = toJS(
      perfectRecordStore.healthData
    );

    loseSleep && setLoseSleep(loseSleep.split(','));
    sleepDuration && setSleepDuration(sleepDuration.split(','));
    dream && setDream(dream.split(','));
  }, [perfectRecordStore.healthData]);

  return (
    <div className='sport'>
      <div className='sport-title'>您的睡眠情况</div>
      <div className='sport-item'>
        <Tag
          title={'您是否失眠'}
          list={loseSleepList}
          choosed={loseSleep}
          multiple={false}
          setChoosed={(data: any) => {
            setLoseSleep(data);
          }}
          size={'big'}
        />
      </div>
      <div className='sport-item'>
        <Tag
          title={'您的睡眠时长'}
          list={sleepDurationList}
          choosed={sleepDuration}
          multiple={false}
          setChoosed={(data: any) => {
            setSleepDuration(data);
          }}
          size={'big'}
        />
      </div>
      <div className='sport-item'>
        <Tag
          title={'您是否做梦'}
          list={dreamList}
          choosed={dream}
          multiple={false}
          setChoosed={(data: any) => {
            setDream(data);
          }}
          size={'big'}
        />
      </div>
      <Jump
        index={3}
        isClick={
          loseSleep.length > 0 && sleepDuration.length > 0 && dream.length > 0
        }
        next={() => {
          props.setIndex &&
            props.setIndex(4, {
              loseSleep: loseSleep.join(','),
              sleepDuration: sleepDuration.join(','),
              dream: dream.join(','),
            });
        }}
        back={() => {
          perfectRecordStore.setHealthData();
          props.setIndex &&
            props.setIndex(2, {
              loseSleep: loseSleep.join(''),
              sleepDuration: sleepDuration.join(''),
              dream: dream.join(''),
            });
        }}
        skip={() => {
          props.setIndex(3);
        }}
      />
    </div>
  );
};

export default observer(Sleep);
