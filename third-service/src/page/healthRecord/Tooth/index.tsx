import React, { useEffect, useState } from 'react';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const SELECT_LIST = ['无', '有'];

const Tooth = () => {
  const HealthRecordStore = useStores('HealthRecordStore');
  const { toothNum = '', caries } = HealthRecordStore.healthyFile;
  const [showCarise, setShowCarise] = useState<boolean | string>('');
  useEffect(() => {}, []);
  return (
    <div className="component-tooth flex">
      <div className="title">请填写孩子的牙齿生长状况</div>
      <div className="content">
        <div className="label">牙齿数量（颗）</div>
        <input
          type="number"
          className="input"
          placeholder="请输入牙齿颗数"
          value={toothNum}
          onChange={(e) => {
            HealthRecordStore.setHealthyFile({ toothNum: e.target.value });
          }}
        />
        <div className="label">有无龋齿</div>
        <div className="select-list flex">
          {SELECT_LIST.map((item, index) => {
            return (
              <div
                className={`select-item flex ${
                  showCarise === Boolean(index) ? 'active' : ''
                }`}
                key={item}
                onClick={() => {
                  setShowCarise(Boolean(index));
                  Boolean(index) && HealthRecordStore.delHealthyFile('caries');
                  !index && HealthRecordStore.setHealthyFile({ caries: '' });
                }}
              >
                ;{item}
              </div>
            );
          })}
        </div>
        {showCarise ? (
          <input
            type="number"
            className="input"
            placeholder="请输入龋齿颗数"
            value={caries}
            onChange={(e) => {
              HealthRecordStore.setHealthyFile({ caries: e.target.value });
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
export default observer(Tooth);
