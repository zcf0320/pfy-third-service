import React, { useState, useEffect } from 'react';
import { PickerView } from 'antd-mobile';

import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';

type IProps = {
  selected: Array<number>;
};

const RegionPicker = React.forwardRef((props: IProps, ref: any) => {
  const perfectRecordStore = useStores('perfectRecordStore');

  const { selected } = props;

  const [value, setValue] = useState(selected);
  const [list, setList] = useState([]);

  useEffect(() => {
    const { allRegionList } = perfectRecordStore;
    setList(allRegionList);
  }, [perfectRecordStore]);

  return (
    <div className="picker-content">
      <PickerView
        ref={ref}
        data={list}
        onChange={(value) => {
          setValue(value);
        }}
        value={value}
        prefixCls="picker-view flex"
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
  );
});

export default observer(RegionPicker);
