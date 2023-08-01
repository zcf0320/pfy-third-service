import React from 'react';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const MENSTRUATION_FLOW_LIST = ['很少', '偏少', '正常', '偏多', '很多'];
const MenstruationDetail = () => {
  const HealthRecordStore = useStores('HealthRecordStore');
  const {
    menstrualCycle = '',
    menstrualPeriod = '',
    menstrualFlow,
  } = HealthRecordStore.healthyFile;

  return (
    <div className='component-menstruation-detail flex'>
      <div className='component-title'>您的月经情况</div>
      <div className='label'>月经周期（天）</div>
      <input
        className='input'
        placeholder='请输入您的月经周期'
        type='number'
        value={menstrualCycle}
        onChange={(e) => {
          HealthRecordStore.setHealthyFile({ menstrualCycle: e.target.value });
        }}
      />
      <div className='label'>月经经期（天）</div>
      <input
        className='input'
        placeholder='请输入您的月经时长'
        type='number'
        value={menstrualPeriod}
        onChange={(e) => {
          HealthRecordStore.setHealthyFile({ menstrualPeriod: e.target.value });
        }}
      />
      <div className='label'>月经量</div>
      <div className='list flex'>
        {MENSTRUATION_FLOW_LIST.map((item) => {
          return (
            <div
              className={`list-item flex ${
                menstrualFlow === item ? 'active' : ''
              }`}
              key={item}
              onClick={() => {
                HealthRecordStore.setHealthyFile({ menstrualFlow: item });
              }}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default observer(MenstruationDetail);
