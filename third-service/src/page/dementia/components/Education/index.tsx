import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import './index.scss';

interface IProps {
  value: number;
  onChange: (val: number) => any;
}
export default function EducationPicker(props: IProps) {
  const [value, setValue] = useState([38] as any);

  const age = [
    { label: '< 7', value: 3 },
    { label: '7-9', value: 2 },
    { label: '>= 10', value: 1 }
  ];
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
    <div className="edu-picker">
      <div className="title">您的受教育年限（年）</div>
      <div className="subtitle">您的受教育年限（年）</div>
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
