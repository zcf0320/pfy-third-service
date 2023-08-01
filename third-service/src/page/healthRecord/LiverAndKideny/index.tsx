import React from 'react';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const SELECT_LIST = ['异常', '正常'];

const LiverAndKideny = () => {
  const HealthRecordStore = useStores('HealthRecordStore');
  const { liverFunction, kidneyFunction } = HealthRecordStore.healthyFile;
  return (
    <div className="component-liver-kideny flex">
      <div className="title">您的肝肾功能是否正常</div>
      <div className="select-list flex">
        <div className="select-title">肝功能</div>
        <div className="select-content flex">
          {SELECT_LIST.map((item, index) => {
            return (
              <div
                className={`select-item flex ${
                  liverFunction === Boolean(index) ? 'active' : ''
                }`}
                key={item}
                onClick={() => {
                  HealthRecordStore.setHealthyFile({
                    liverFunction: Boolean(index),
                  });
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="select-list flex">
        <div className="select-title">肾功能</div>
        <div className="select-content flex">
          {SELECT_LIST.map((item, index) => {
            return (
              <div
                className={`select-item flex ${
                  kidneyFunction === Boolean(index) ? 'active' : ''
                }`}
                key={item}
                onClick={() => {
                  HealthRecordStore.setHealthyFile({
                    kidneyFunction: Boolean(index),
                  });
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default observer(LiverAndKideny);
