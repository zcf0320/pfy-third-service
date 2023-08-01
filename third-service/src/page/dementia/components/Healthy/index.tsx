import React, { useEffect, useState } from 'react';
import { InputItem } from 'antd-mobile';
import './index.scss';
interface IProps {
    cholesterol: string;
    blood: string;
    onCholesterolChange: (val: string) => void;
    onBloodChange: (val: string) => void;
  }
  export default function HealthyPicker(props: IProps) {
    const [cholesterol, setCholesterol] = useState(props.cholesterol?props.cholesterol:'');
    const [blood, setBlood] = useState(props.blood?props.blood:'');
    useEffect(() => {

    }, []);
    return (
        <div className="healthypicker">
            <div className="title">您的健康状况</div>
            <div className="subtitle">完善信息为您选择更适合您的方案</div>
            <div className="healthypicker-input">
              <div className="healthypicker-input-title">您的总胆固醇为</div>
              <InputItem
              clear
              value={cholesterol}
              placeholder="请输入"
              onChange={(val) => {
                setCholesterol(val);
                props.onCholesterolChange(val);
              }}
               />
            </div>
            <div className="healthypicker-input">
              <div className="healthypicker-input-title">您的收缩压为（mmol/L）</div>
              <InputItem
              clear
              value={blood}
              type='number'
              placeholder="请输入"
              onChange={(val) => {
                setBlood(val);
                props.onBloodChange(val);
              }}
               />
            </div>
            <div className="tips flex m-b-32">
        <div className="tips-icon"></div>
        <div className="text">
          小贴士：对于成年人而言，高于90/60mmHg且低于140/90mmHg的血压测量值通常被视为正常范围；
        </div>
      </div>
        </div>
    );
  }