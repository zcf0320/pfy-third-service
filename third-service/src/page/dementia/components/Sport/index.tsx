import React, { useEffect, useState } from 'react';
import './index.scss';
interface IProps {
    value: number;
    onChange: (val: number) => void;
  }
export default function SportPage(props: IProps) {
    const [value, setValue] = useState(-1);
    const onChange = (val: number) => {
        setValue(val);
        props.onChange(val);
      };
      useEffect(() => {
        if(props.value !== -1) {
            setValue(props.value);
        }
      }, [props.value]);
    return (
        <div className="yes-no">
        <div className="title">您是否经常有体力活动</div>
        <div className="subtitle">完善信息为您选择更适合您的方案</div>
        <div className="flex-center mb-64">
            <div
            className={`item ${value === 1 ? 'active' : ''}`}
            onClick={() => onChange(1)}
            >
            是
            </div>
            <div
            className={`item ${value === 0 ? 'active' : ''}`}
            onClick={() => onChange(0)}
            >
            否
            </div>
        </div>
      </div>
    );
}