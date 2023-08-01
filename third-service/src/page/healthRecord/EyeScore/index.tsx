import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';

const EyeScore = () => {
  const [eysScoreList, setEysScoreList] = useState<Array<any>>([]);
  const [value, setValue] = useState([5, 5]);
  const HealthRecordStore = useStores('HealthRecordStore');

  useEffect(() => {
    let eyeList = [] as any;
    for (let i = 40; i <= 53; i++) {
      eyeList.push({
        label: (i / 10).toFixed(1),
        value: i / 10,
      });
    }
    const { leftEyeScore, rightEyeScore } = HealthRecordStore.healthyFile;
    if (leftEyeScore && rightEyeScore) {
      setValue([leftEyeScore, rightEyeScore]);
    } else {
      HealthRecordStore.setHealthyFile({ leftEyeScore: 5, rightEyeScore: 5 });
    }

    setEysScoreList([eyeList, eyeList]);
  }, [HealthRecordStore]);
  return (
    <div className='component-height flex'>
      <div className='title'>请选择孩子的视力</div>
      <div className='picker'>
        <div className='picker-content'>
          <div className='eye-list flex'>
            <div className='eye-item'>左眼</div>
            <div className='eye-item'>右眼</div>
          </div>
          <div className='white'></div>
          <PickerView
            data={eysScoreList}
            cascade={false}
            value={value}
            onChange={(value) => {
              setValue(value);
              HealthRecordStore.setHealthyFile({
                leftEyeScore: value[0],
                rightEyeScore: value[1],
              });
            }}
            prefixCls='picker-view flex'
            // pickerPrefixCls='picker-list'
            itemStyle={{ height: '34px', lineHeight: '34px' }}
            indicatorStyle={{
              height: '34px',
              borderTop: '1px solid rgba(204,204,204, 0.5)',
              color: '#333',
              fontSize: '40px',
              borderBottom: '1px solid rgba(204,204,204, 0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default observer(EyeScore);
