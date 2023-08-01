import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const BLOOD_ID_LIST = [
  { label: 'A型', value: 34 },
  { label: 'B型', value: 35 },
  { label: 'AB型', value: 36 },
  { label: 'O型', value: 37 },
];
const Height = () => {
  const [value, setValue] = useState([36]);
  const HealthRecordStore = useStores('HealthRecordStore');

  useEffect(() => {
    const { bloodTypeId } = HealthRecordStore.healthyFile;
    bloodTypeId && setValue([bloodTypeId]);
    !bloodTypeId && HealthRecordStore.setHealthyFile({ bloodTypeId: 36 });
  }, [HealthRecordStore]);
  return (
    <div className="component-height flex">
      <div className="title">请选择您的血型</div>
      <div className="picker">
        <div className="picker-content">
          <PickerView
            data={BLOOD_ID_LIST}
            cascade={false}
            value={value}
            onChange={(value) => {
              setValue(value);
              console.log(value);
              HealthRecordStore.setHealthyFile({ bloodTypeId: value[0] });
            }}
            prefixCls="picker-view flex"
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
export default observer(Height);
