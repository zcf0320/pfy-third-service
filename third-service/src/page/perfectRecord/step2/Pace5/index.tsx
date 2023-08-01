/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import { Toast } from 'antd-mobile';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number) => void;
}

function Pace5(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const commonStore = useStores('commonStore');

  const [fastingBloodGlucose, setFastingBloodGlucose] = useState(''); //血糖
  const [diastolicBloodPressure, setDiastolicBloodPressure] = useState(''); //舒张压
  const [systolicBloodPressure, setSystolicBloodPressure] = useState(''); //收缩压

  useEffect(() => {
    let { fastingBloodGlucose, diastolicBloodPressure, systolicBloodPressure } =
      perfectRecordStore.healthData;
    fastingBloodGlucose && setFastingBloodGlucose(fastingBloodGlucose);
    diastolicBloodPressure && setDiastolicBloodPressure(diastolicBloodPressure);
    systolicBloodPressure && setSystolicBloodPressure(systolicBloodPressure);
  }, [perfectRecordStore.healthData]);

  return (
    <div className='pace5'>
      <div className='subtitle'>您当前所处步骤:健康信息</div>
      <div className='record-title'>请填写您的血糖血压</div>
      <div className='part-title'>空腹血糖（mmol/L）</div>
      <input
        className='record-input'
        placeholder='请输入空腹血糖（mmol/L）'
        type='number'
        value={fastingBloodGlucose}
        onChange={(e) => {
          if (!/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(e.target.value)) {
            setFastingBloodGlucose('');
            return;
          }
          setFastingBloodGlucose(e.target.value);
        }}
      />
      <div className='tips flex'>
        <div className='tips-icon'></div>
        <div className='text'>
          小贴士:空腹血糖高于3.9mmol/L且低于6.1mmol/L的测量值通常可被视为正常范围。
        </div>
      </div>
      <div className='part-title'>血压（mmHg）</div>
      <div className='part-title mt56'>血压-收缩压</div>
      <input
        className='record-input'
        placeholder='请输入血压-收缩压（mmHg）'
        type='number'
        value={systolicBloodPressure}
        onChange={(e) => {
          if (!/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(e.target.value)) {
            return;
          }
          setSystolicBloodPressure(e.target.value);
        }}
      />
      <div className='part-title'>血压-舒张压</div>
      <input
        className='record-input'
        placeholder='请输入血压-舒张压（mmHg）'
        type='number'
        value={diastolicBloodPressure}
        onChange={(e) => {
          if (!/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(e.target.value)) {
            return;
          }
          setDiastolicBloodPressure(e.target.value);
        }}
      />
      <div className='tips flex'>
        <div className='tips-icon'></div>
        <div className='text'>
          小贴士:对于成年人而言，高于90/60mmHg且低于140/90mmHg的血压测量值通常被视为正常范围。
        </div>
      </div>
      <div className='region-bottom'>
        <Jump
          index={5}
          isClick={true}
          showSkip
          next={() => {
            let error = '';
            if (
              !fastingBloodGlucose ||
              (fastingBloodGlucose &&
                !/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(fastingBloodGlucose))
            ) {
              error = '血糖填写格式错误';
            }
            if (
              !diastolicBloodPressure ||
              (diastolicBloodPressure &&
                !/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(diastolicBloodPressure))
            ) {
              error = '舒张压填写格式错误';
            }
            if (
              !systolicBloodPressure ||
              (systolicBloodPressure &&
                !/^([1-9][0-9]*)+(\.[0-9]{1,2})?$/.test(systolicBloodPressure))
            ) {
              error = '收缩压填写格式错误';
            }
            if (error) {
              Toast.info(error, 2);
              return;
            } else {
              perfectRecordStore.setHealthData({
                fastingBloodGlucose: fastingBloodGlucose || null,
                diastolicBloodPressure: diastolicBloodPressure || null,
                systolicBloodPressure: systolicBloodPressure || null,
              });
              saveHealth({
                step: 9,
                scoreCode: 'GLUCOSE',
                fastingBloodGlucose: fastingBloodGlucose,
                diastolicBloodPressure: diastolicBloodPressure,
                systolicBloodPressure: systolicBloodPressure,
              }).then(() => {
                props.setIndex(9);
              });
            }
          }}
          back={() => {
            if (commonStore.userInfo.sex === 1) {
              props.setIndex(3);
            } else {
              props.setIndex(7);
            }
          }}
          skip={() => {
            updateStep(9).then(() => {
              props.setIndex(9);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace5);
