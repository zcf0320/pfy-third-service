import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import './index.scss';

interface IProps {
  value: number;
  onChange: (val: number) => any;
}
export default function AgePicker(props: IProps) {
  const [value, setValue] = useState([38] as any);

  const age = [] as any;
  for (let i = 20; i < 99; i++) {
    age.push({ label: i + ' 岁', value: i });
  }
  const column = [...age];
  const onChange = (value: any) => {
    setValue(value);
    props.onChange(value[0]);
  };
  useEffect(() => {
    if (props.value) {
      setValue([props.value]);
    }
  }, [props.value]);
  return (
    <div className="age-picker">
      <div className="title">请选择您的年龄</div>
      <PickerView
        value={value}
        data={column}
        cascade={false}
        onChange={(val: any) => {
          onChange(val);
        }}
      />
    </div>
  );
}
