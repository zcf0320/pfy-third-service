/** @format */

import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import { saveHealth, updateStep } from '@api/perfectRecord';
import './index.scss';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import { toJS } from 'mobx';

interface IProps {
  setIndex: (index: number) => void;
}

const Height = (props: IProps) => {
  const perfectRecordStore = useStores('perfectRecordStore');
  const [value, setValue] = useState<Array<number>>([160]);
  let heightList = [] as any;
  for (let i = 0; i < 240; i++) {
    heightList.push({
      label: i + 1,
      value: i + 1,
    });
  }
  useEffect(() => {
    const { height } = toJS(perfectRecordStore.healthData);
    height && setValue([+height]);
  }, [perfectRecordStore.healthData]);
  return (
    <div className='component-height flex'>
      <div className='subtitle'>您当前所处步骤:基本信息</div>
      <div className='title'>请选择您的身高 (cm)</div>
      <div className='picker'>
        <div className='picker-content'>
          <PickerView
            data={heightList}
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
          index={1}
          isClick={!!value}
          showSkip
          next={() => {
            perfectRecordStore.setHealthData({
              height: value[0],
            });
            saveHealth({ step: 2, height: value[0] }).then(() => {
              props.setIndex && props.setIndex(2);
            });
          }}
          back={() => {
            perfectRecordStore.setHealthData({
              height: value[0],
            });
            props.setIndex && props.setIndex(1);
          }}
          skip={() => {
            updateStep(2).then(() => {
              props.setIndex(2);
            });
          }}
        />
      </div>
    </div>
  );
};
export default observer(Height);
