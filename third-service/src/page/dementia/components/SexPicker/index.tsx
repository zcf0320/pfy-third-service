import React, { useState } from 'react';
import './index.scss';

interface IProps {
  value: string;
  onChange: (val: string) => void;
}
export default function SexPicker(props: IProps) {
  const [sex, setSex] = useState(props.value);
  const handleChange = (val: string) => {
    setSex(val);
    props.onChange(val);
  };
  return (
    <div className="select-sex-page">
      <div className="select-sex-page-title">请选择您的性别</div>
      <div className="select-sex-page-sex">
        <div
          className="select-sex-page-sex-boy"
          onClick={() => {
            handleChange('男');
          }}
        >
          <div className={`boy-img ${sex === '男' ? 'active' : ''}`}></div>
          <div className="boy-text">男</div>
        </div>
        <div className="select-sex-page-sex-girl">
          <div
            className={`girl-img ${sex === '女' ? 'active' : ''}`}
            onClick={() => {
              handleChange('女');
            }}
          ></div>
          <div className="girl-text">女</div>
        </div>
      </div>
    </div>
  );
}
