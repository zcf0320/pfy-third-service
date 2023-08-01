import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';

const HeadLength = () => {
  const [heightList, setHeightList] = useState<Array<any>>([]);
  const [value, setValue] = useState([50]);
  const HealthRecordStore = useStores('HealthRecordStore');

  useEffect(() => {
    let heightList = [] as any;
    for (let i = 30; i <= 70; i++) {
      heightList.push({
        label: i,
        value: i,
      });
    }
    const { headLength } = HealthRecordStore.healthyFile;
    headLength && setValue([headLength]);
    !headLength && HealthRecordStore.setHealthyFile({ headLength: 50 });
    setHeightList(heightList);
  }, [HealthRecordStore]);
  return (
    <div className='component-height flex'>
      <div className='title'>请选择孩子的头围</div>
      <div className='picker'>
        <div className='picker-content'>
          <PickerView
            data={heightList}
            cascade={false}
            value={value}
            onChange={(value) => {
              setValue(value);
              console.log(value);
              HealthRecordStore.setHealthyFile({ headLength: value[0] });
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
          <div className='union'>cm</div>
        </div>
      </div>
    </div>
  );
};
export default observer(HeadLength);
