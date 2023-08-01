import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
import { healthRecordStore } from '@store/interface';

const Height = () => {
  const [heightList, setHeightList] = useState<Array<any>>([]);
  const [value, setValue] = useState([160]);
  const HealthRecordStore: healthRecordStore = useStores('HealthRecordStore');

  useEffect(() => {
    let heightList = [] as any;
    for (let i = 0; i < 240; i++) {
      heightList.push({
        label: i + 1,
        value: i + 1,
      });
    }
    const { height } = HealthRecordStore.healthyFile;
    height && setValue([height]);
    !height && HealthRecordStore.setHealthyFile({ height: 160 });
    setHeightList(heightList);
  }, [HealthRecordStore]);
  return (
    <div className='component-height flex'>
      <div className='title'>
        {HealthRecordStore.fileType === '4'
          ? '请选择孩子的身高(cm)'
          : '请选择您的身高(cm)'}
      </div>
      <div className='picker'>
        {/* <div className="union">cm</div> */}
        <div className='picker-content'>
          <PickerView
            data={heightList}
            cascade={false}
            value={value}
            onChange={(value) => {
              setValue(value);
              HealthRecordStore.setHealthyFile({ height: value[0] });
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
