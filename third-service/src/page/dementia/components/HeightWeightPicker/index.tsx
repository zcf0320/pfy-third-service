import React, { useEffect, useState } from 'react';
import { PickerView } from 'antd-mobile';
import './index.scss';

interface IProps {
  heightValue: number;
  weightValue: number;
  onHeightChange: (val: number) => void;
  onWeightChange: (val: number) => void;
}
export default function HeightWeightPicker(props: IProps) {
  const [height, setHeight] = useState([] as any);
  const [weight, setWeight] = useState([] as any);
  const heightData = [] as any;
  const heightColumn = [heightData];
  for (let i = 100; i < 240; i++) {
    heightData.push({ label: i, value: i });
  }

  const weightData = [] as any;
  const weightColumn = [weightData];
  for (let i = 30; i < 240; i++) {
    weightData.push({ label: i, value: i });
  }
  const onChange = (value: any) => {
    setHeight(value);
    props.onHeightChange(value[0]);
  };

  const onChange2 = (value: any) => {
    setWeight(value);
    props.onWeightChange(value[0]);
  };
  useEffect(() => {
    if (props.heightValue) {
      setHeight([props.heightValue]);
    }
    if (props.weightValue) {
      setWeight([props.weightValue]);
    }
  }, [props.heightValue, props.weightValue]);
  return (
    <div className="height-weight-picker">
      <div className="title">您的健康状况</div>
      <div className="subtitle">完善信息为您选择更适合您的方案</div>
      <div className="flex">
        <div className="height-picker">
          <div className="picker-title">身高(cm)</div>
          <PickerView
            value={height}
            data={heightColumn}
            cascade={false}
            onChange={(val: any) => {
              onChange(val);
            }}
          />
        </div>
        <div className="weight-picker">
          <div className="picker-title">体重(kg)</div>
          <PickerView
            value={weight}
            cascade={false}
            data={weightColumn}
            onChange={(val: any) => {
              onChange2(val);
            }}
          />
        </div>
      </div>
    </div>
  );
}
