/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import { Toast } from 'antd-mobile';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number) => void;
}

function Pace6(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [heartRate, setHeartRate] = useState('');

  useEffect(() => {
    let { heartRate } = perfectRecordStore.healthData;
    heartRate && setHeartRate(heartRate);
  }, [perfectRecordStore.healthData]);

  return (
    <div className='pace6'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>请填写您的心率</div>
      <div className='part-title'>心率（次/分钟）</div>
      <input
        className='record-input'
        placeholder='请填写您的心率'
        type='number'
        value={heartRate}
        onChange={(e) => {
          setHeartRate(e.target.value);
        }}
      />
      <div className='tips flex'>
        <div className='tips-icon'></div>
        <div className='text'>
          小贴士：成人正常心率为60～100次/分钟，理想心率应为55～70次/分钟。
        </div>
      </div>
      <div className='region-bottom'>
        <Jump
          index={6}
          isClick={!!heartRate}
          showSkip
          next={() => {
            if (heartRate) {
              if (!/^(\d{1,3}(\.\d{1,3})?|300)$/.test(heartRate)) {
                Toast.info('心率填写格式错误', 2);
                return;
              } else {
                perfectRecordStore.setHealthData({
                  heartRate,
                });
                saveHealth({
                  step: 10,
                  scoreCode: 'HEART_RATE',
                  heartRate,
                }).then(() => {
                  props.setIndex(10);
                });
              }
            }
          }}
          back={() => {
            setIndex(8);
          }}
          skip={() => {
            updateStep(10).then(() => {
              props.setIndex(10);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace6);
