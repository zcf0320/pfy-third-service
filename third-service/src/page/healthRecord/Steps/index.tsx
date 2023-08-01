import React, { useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { healthRecordStore } from '@store/interface';
import { useHistory } from 'react-router-dom';
import { saveHealthyFile } from '@api/healthRecord';
import { Toast } from 'antd-mobile';

function Steps() {
  const HealthRecordStore: healthRecordStore = useStores('HealthRecordStore');
  const { currentIndex, healthList, setCurrentIndex, healthyFile, fileType } =
    HealthRecordStore;
  const [showEndModal, setShowEndModal] = useState(false);
  let history = useHistory();
  const next = () => {
    if (!watchData()) {
      return;
    }
    const { type } = healthList[currentIndex];
    const {
      menstruation,
      fastingBloodGlucose,
      systolicBloodPressure,
      diastolicBloodPressure,
    } = healthyFile;
    if (type === 7) {
      let error = '';
      if (!/^(\d{1,2}(\.\d{1,2})?|99)$/.test(fastingBloodGlucose)) {
        error = '血糖填写格式错误';
      }
      if (!/^([1-9]\d{1,2}|\d)$/.test(diastolicBloodPressure)) {
        error = '舒张压填写格式错误';
      }
      if (!/^([1-9]\d{1,2}|\d)$/.test(systolicBloodPressure)) {
        error = '收缩压填写格式错误';
      }
      if (error) {
        Toast.info(error, 3);
        return;
      }
    }
    if (currentIndex === healthList.length - 1) {
      save();
      return;
    }
    // const { menstruation } = healthyFile
    // 向前前进的步数
    let go = 1;
    // 选择月经为no
    healthList[currentIndex].selectNo && menstruation === false && (go = 2);
    setCurrentIndex(currentIndex + go);
  };
  const back = () => {
    let backPage = 1;
    const { menstruation } = healthyFile;
    if (fileType === '2' && menstruation === false && currentIndex === 3) {
      backPage = 2;
    }
    // 返回
    setCurrentIndex(currentIndex - backPage);
  };
  const skip = () => {
    if (currentIndex === healthList.length - 1) {
      save();
      return;
    }
    if (healthList.length) {
      const { type } = healthList[currentIndex];
      // 血型
      type === 6 && HealthRecordStore.delHealthyFile('bloodTypeId');
      if (type === 7) {
        HealthRecordStore.delHealthyFile('fastingBloodGlucose');
        HealthRecordStore.delHealthyFile('systolicBloodPressure');
        HealthRecordStore.delHealthyFile('diastolicBloodPressure');
      }
    }
    setCurrentIndex(currentIndex + 1);
  };
  const save = () => {
    let params = HealthRecordStore.healthyFile;
    const {
      diastolicBloodPressure,
      fastingBloodGlucose,
      systolicBloodPressure,
    } = params;
    if (
      diastolicBloodPressure &&
      fastingBloodGlucose &&
      systolicBloodPressure
    ) {
      let bloodParams = {
        diastolicBloodPressure,
        fastingBloodGlucose,
        systolicBloodPressure,
      };
      HealthRecordStore.saveBlood(bloodParams);
    }
    params.bmi = getBMI();
    saveHealthyFile(params).then(() => {
      setShowEndModal(true);
    });
  };
  const getBMI = () => {
    const { weight, height } = HealthRecordStore.healthyFile;
    if (!weight || !height) {
      return '-';
    }
    let minHeight = height / 100;
    return (weight / (minHeight * minHeight)).toFixed(1);
  };
  // 监听下一步的状态
  const watchData = () => {
    let result = false;
    if (healthList.length) {
      const { type } = healthList[currentIndex];
      const {
        pregnancyState,
        menstruation,
        menstrualCycle,
        menstrualFlow,
        menstrualPeriod,
        height,
        weight,
        bloodTypeId,
        fastingBloodGlucose,
        systolicBloodPressure,
        diastolicBloodPressure,
        past,
        allergy,
        familyDiseaseHistory,
        liverFunction,
        kidneyFunction,
        headLength,
        toothNum,
        caries,
        leftEyeScore,
        rightEyeScore,
        leftEyeDegree,
        rightEyeDegree,
        surgeryHistory,
      } = healthyFile;
      if (type === 1) {
        pregnancyState && (result = true);
      }
      if (type === 2) {
        menstruation !== undefined && (result = true);
      }
      if (type === 3) {
        menstrualCycle && menstrualFlow && menstrualPeriod && (result = true);
      }
      if (type === 4) {
        height && (result = true);
      }
      if (type === 5) {
        weight && (result = true);
      }
      if (type === 6) {
        bloodTypeId && (result = true);
      }
      if (type === 7) {
        fastingBloodGlucose &&
          systolicBloodPressure &&
          diastolicBloodPressure &&
          (result = true);
      }
      if (type === 8) {
        past !== undefined && (result = true);
      }
      if (type === 9) {
        allergy !== undefined && (result = true);
      }
      if (type === 10) {
        familyDiseaseHistory !== undefined && (result = true);
      }
      if (type === 11) {
        liverFunction !== undefined &&
          kidneyFunction !== undefined &&
          (result = true);
      }
      if (type === 12) {
        headLength && (result = true);
      }
      if (type === 13) {
        toothNum && caries !== undefined && (result = true);
      }
      if (type === 14) {
        leftEyeScore && rightEyeScore && (result = true);
      }
      if (type === 15) {
        leftEyeDegree !== undefined &&
          rightEyeDegree !== undefined &&
          (result = true);
      }
      if (type === 16) {
        surgeryHistory !== undefined && (result = true);
      }
    }
    return result;
  };
  return (
    <div className="component-steps flex">
      {healthList.length && healthList[currentIndex].skip ? (
        <div className="skip" onClick={skip}>
          跳过此步
        </div>
      ) : null}
      <div
        className={`next flex ${watchData() ? '' : 'disable'}`}
        onClick={next}
      >
        {currentIndex === healthList.length - 1 ? '保存' : '下一步'}
      </div>
      {currentIndex !== 0 ? (
        <div className="back" onClick={back}>
          返回上一步
        </div>
      ) : null}
      <div className="tips">
        {(healthList.length && healthList[currentIndex].text) || ''}
      </div>
      <div className="step">
        <div
          className="step-content"
          style={{
            width: `${((currentIndex + 1) / healthList.length) * 100}%`,
          }}
        ></div>
      </div>
      {showEndModal ? (
        <div className="modal flex">
          <div className="modal-content flex">
            <div className="img">
              <div className="text">恭喜您已经完成了健康档案！</div>
              <div className="score-text">
                星币奖励<span className="score">+10</span>
              </div>
            </div>
            <div
              className="close"
              onClick={() => {
                // history.goBack()
                // @ts-ignore：无法被执行的代码的错误
                wx.miniProgram.navigateBack();
                history.goBack();
              }}
            ></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default observer(Steps);
