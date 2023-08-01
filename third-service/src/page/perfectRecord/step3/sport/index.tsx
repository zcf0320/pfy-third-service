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

const Sport = (props: IProps) => {
  const perfectRecordStore = useStores('perfectRecordStore');

  const sportFrequencyList = ['<2次', '3-4次', '>4次'];
  const sportDurationList = ['<30分钟', '30-60分钟', '>60分钟'];
  const sportEventList = [
    '跑步/快走',
    '游泳',
    '舞蹈/广场舞',
    '太极/内功',
    '健身房团课',
    '器械',
    '其他',
  ];

  const [sportFrequency, setSportFrequency] = useState([]);
  const [sportDuration, setSportDuration] = useState([]);
  const [sportEvent, setSportEvent] = useState([]);

  useEffect(() => {
    let { sportFrequency, sportDuration, sportEvent } = toJS(
      perfectRecordStore.healthData
    );

    sportFrequency && setSportFrequency(sportFrequency.split(','));
    sportDuration && setSportDuration(sportDuration.split(','));
    sportEvent && setSportEvent(sportEvent.split(','));
  }, [perfectRecordStore.healthData]);

  return (
    <div className='sport'>
      <div className='sport-title'>您的运动情况</div>
      <div className='sport-item'>
        <Tag
          title={'每周运动频率'}
          list={sportFrequencyList}
          choosed={sportFrequency}
          multiple={false}
          setChoosed={(data: any) => {
            setSportFrequency(data);
          }}
          size={'big'}
        />
      </div>
      <div className='sport-item'>
        <Tag
          title={'单次运动时长'}
          list={sportDurationList}
          choosed={sportDuration}
          multiple={false}
          setChoosed={(data: any) => {
            setSportDuration(data);
          }}
          size={'big'}
        />
      </div>
      <div className='sport-item'>
        <Tag
          title={'运动项目（可多选）'}
          list={sportEventList}
          choosed={sportEvent}
          multiple={true}
          setChoosed={(data: any) => {
            setSportEvent(data);
          }}
          size={'big'}
        />
      </div>
      <Jump
        index={2}
        isClick={
          sportFrequency.length > 0 &&
          sportDuration.length > 0 &&
          sportEvent.length > 0
        }
        next={() => {
          props.setIndex &&
            props.setIndex(3, {
              sportFrequency: sportFrequency.join(','),
              sportDuration: sportDuration.join(','),
              sportEvent: sportEvent.join(','),
            });
        }}
        back={() => {
          props.setIndex &&
            props.setIndex(1, {
              sportFrequency: sportFrequency.join(','),
              sportDuration: sportDuration.join(','),
              sportEvent: sportEvent.join(','),
            });
        }}
        skip={() => {
          props.setIndex(3);
        }}
      />
    </div>
  );
};

export default observer(Sport);
