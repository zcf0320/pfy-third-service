import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';

const Height = () => {
  const [weightList, setWeightList] = useState<Array<any>>([]);
  const [value, setValue] = useState([60]);
  const HealthRecordStore = useStores('HealthRecordStore');

  useEffect(() => {
    let weightList = [] as any;
    for (let i = 0; i < 200; i++) {
      weightList.push({
        label: i + 1,
        value: i + 1,
      });
    }
    const { weight } = HealthRecordStore.healthyFile;
    weight && setValue([weight]);
    !weight && HealthRecordStore.setHealthyFile({ weight: 60 });
    setWeightList(weightList);
  }, [HealthRecordStore]);
  return (
    <div className='component-weight flex'>
      <div className='title'>
        {HealthRecordStore.fileType === '4'
          ? '请选择孩子的体重(kg)'
          : '请选择您的体重(kg)'}
      </div>
      <div className='picker'>
        {/* <div className="union">kg</div> */}
        <div className='picker-content'>
          <PickerView
            data={weightList}
            cascade={false}
            value={value}
            onChange={(value) => {
              setValue(value);
              console.log(value);
              HealthRecordStore.setHealthyFile({ weight: value[0] });
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
    </div>
  );
};
export default observer(Height);
