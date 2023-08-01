/** @format */

import React from 'react';
import Jump from 'page/perfectRecord/component/Jump';
import './index.scss';

type IProps = {
  setIndex: (index: number) => void;
  name: string;
  sex: number;
  age: number;
};

const PersonalInformation = (props: IProps) => {
  const { name, sex, age } = props;
  return (
    <div className='personal-information'>
      <div className='content'>
        <div className='title'>请确认以下个人信息</div>
        <div className='form'>
          <div className='form-item'>
            <div className='label'>姓名</div>
            <div className='text'>{name}</div>
          </div>
          <div className='form-item'>
            <div className='label'>性别</div>
            <div className='text'>{sex === 1 ? '男' : '女'}</div>
          </div>
          <div className='form-item'>
            <div className='label'>年龄</div>
            <div className='text'>{age}</div>
          </div>
        </div>
      </div>
      <Jump
        index={1}
        isClick={true}
        next={() => {
          props.setIndex && props.setIndex(2);
        }}
        back={() => {
          props.setIndex && props.setIndex(1);
        }}
        skip={() => {
          props.setIndex(3);
        }}
      />
    </div>
  );
};

export default PersonalInformation;
