import React from 'react';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const MenstruationDetail = () => {
  const HealthRecordStore = useStores('HealthRecordStore');
  const {
    fastingBloodGlucose = '',
    systolicBloodPressure = '',
    diastolicBloodPressure = '',
  } = HealthRecordStore.healthyFile;

  return (
    <div className="component-menstruation-detail flex">
      <div className="component-title">请填写您的血糖血压</div>
      <div className="label">空腹血糖（mmol/L）</div>
      <input
        className="input"
        placeholder="请输入空腹血糖（mmol/L）"
        type="text"
        value={fastingBloodGlucose}
        onChange={(e) => {
          HealthRecordStore.setHealthyFile({
            fastingBloodGlucose: e.target.value,
          });
        }}
      />
      <div className="tips flex">
        <div className="tips-icon"></div>
        <div className="text">
          小贴士：空腹血糖高于3.9mmol/L且低于6.1mmol/L的测量值通常可被视为正常范围。
        </div>
      </div>
      <div className="label m-t">血压（mmHg）</div>
      <div className="sub-title">血压-收缩压</div>
      <input
        className="input"
        placeholder="请输入血压-收缩压（mmHg）"
        type="number"
        value={systolicBloodPressure}
        onChange={(e) => {
          HealthRecordStore.setHealthyFile({
            systolicBloodPressure: e.target.value,
          });
        }}
      />
      <div className="sub-title">血压-舒张压</div>
      <input
        className="input"
        placeholder="请输入血压-舒张压（mmHg）"
        type="number"
        value={diastolicBloodPressure}
        onChange={(e) => {
          HealthRecordStore.setHealthyFile({
            diastolicBloodPressure: e.target.value,
          });
        }}
      />
      <div className="tips flex m-b-32">
        <div className="tips-icon"></div>
        <div className="text">
          小贴士：对于成年人而言，高于90/60mmHg且低于140/90mmHg的血压测量值通常被视为正常范围；
        </div>
      </div>
    </div>
  );
};
export default observer(MenstruationDetail);
