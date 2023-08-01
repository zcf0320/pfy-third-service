/** @format */

import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import { toJS } from 'mobx';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number) => void;
}

const Weight = (props: IProps) => {
  const perfectRecordStore = useStores('perfectRecordStore');

  const [weightList, setWeightList] = useState<Array<any>>([]);
  const [value, setValue] = useState<Array<number>>([60]);

  useEffect(() => {
    let weightList = [] as any;
    for (let i = 0; i < 200; i++) {
      weightList.push({
        label: i + 1,
        value: i + 1,
      });
    }
    setWeightList(weightList);
    const { weight } = toJS(perfectRecordStore.healthData);
    weight && setValue([weight]);
  }, [perfectRecordStore.healthData]);
  return (
    <div className='component-weight flex'>
      <div className='subtitle'>您当前所处步骤:基本信息</div>
      <div className='title'>请选择您的体重 (kg)</div>
      <div className='picker'>
        <div className='picker-content'>
          <PickerView
            data={weightList}
            cascade={false}
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
            prefixCls='picker-view flex'
            // pickerPrefixCls='picker-list'
            itemStyle={{ height: '34px', lineHeight: '34px' }}
            indicatorStyle={{
              height: '34px',
              borderTop: '1px solid rgba(204,204,204, 0.5)',
              color: '#333',
              fontSize: '44px',
              borderBottom: '1px solid rgba(204,204,204, 0.5)',
            }}
          />
        </div>
      </div>
      <div className='region-bottom'>
        <Jump
          index={2}
          showSkip
          isClick={!!value}
          next={() => {
            perfectRecordStore.setHealthData({
              weight: value[0],
              bmi: (
                value[0] /
                Math.pow(perfectRecordStore.healthData.height / 100, 2)
              ).toFixed(1),
            });
            saveHealth({ step: 3, scoreCode: 'HEIGHT', weight: value[0] }).then(
              () => {
                props.setIndex(3);
              }
            );
          }}
          back={() => {
            perfectRecordStore.setHealthData({
              weight: value[0],
              bmi: (
                value[0] /
                Math.pow(perfectRecordStore.healthData.height / 100, 2)
              ).toFixed(1),
            });
            props.setIndex(1);
          }}
          skip={() => {
            updateStep(3).then(() => {
              props.setIndex(3);
            });
          }}
        />
      </div>
    </div>
  );
};
export default observer(Weight);
