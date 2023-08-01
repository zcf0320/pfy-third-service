import React from 'react';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const LIFE_LIST = [
  {
    text: '未婚',
    id: 4,
  },
  {
    text: '已婚未育',
    id: 5,
  },
  {
    text: '已婚已育',
    id: 6,
  },
  {
    text: '备孕中',
    id: 1,
  },
  {
    text: '已怀孕',
    id: 2,
  },
  {
    text: '哺乳期',
    id: 3,
  },
];
const PregnancyState = () => {
  const HealthRecordStore = useStores('HealthRecordStore');

  const { pregnancyState } = HealthRecordStore.healthyFile;
  return (
    <div className="component-life-stage flex">
      <div className="title">请选择您当前的人生阶段</div>
      <div className="shadow"></div>
      <div className="select-list flex">
        {LIFE_LIST.map((item) => {
          return (
            <div
              className={`select-item flex ${
                pregnancyState === item.id ? 'active' : ''
              }`}
              key={item.text}
              onClick={() => {
                HealthRecordStore.setHealthyFile({ pregnancyState: item.id });
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default observer(PregnancyState);
