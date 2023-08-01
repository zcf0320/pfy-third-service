import React, { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';
import SexPicker from '../components/SexPicker/index';
import AgePicker from '../components/AgePicker/index';
import Page from '@components/Page';
import HeigthWeightPicker from '../components/HeightWeightPicker/index';
import EducationPicker from '../components/Education/index';
import HealthyPicker from '../components/Healthy/index';
import YesOrNo from '../components/YesOrNo/index';
import Habit from '../components/Habit/index';
import Sport from '../components/Sport/index';
import { useHistory } from 'react-router-dom';
import { getUrlParams } from '@utils/filter';
import { saveInfo } from '@api/dementia';
import './index.scss';
const infoStorage:any = {};

export default function EntryInformation() {
  const history = useHistory();
  const stepParam = 1;
  const [step, setStep] = useState(+stepParam);
  const [sex, setSex] = useState('');
  const [age, setAge] = useState(22);
  const [edu, setEdu] = useState(3);
  const [height, setHeight] = useState(166);
  const [weight, setWeight] = useState(60);
  const [sport, setSport] = useState(-1);
  const [cholesterol, setCholesterol] = useState('' as any);
  const [blood, setBlood] = useState('' as any);
  const [medicalHistoryFlag, setMedicalHistoryFlag] = useState(-1);
  const [medicineHistoryVos, setMedicineHistoryVos] = useState([] as any);
  const [habitFlag, setHabitFlag] = useState(-1);
  const [habitList, setHabitList] = useState([] as any);
  const [showDia, setShowDia] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [id, setId] = useState('');
  useEffect(() => {
    const stepParam = 1;
    setStep(+stepParam);
  }, []);
  const handlePrev = () => {
    if(step > 1) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    if (step === 1) {
      if (!sex) {
        Toast.fail('请先选择性别');
        return;
      }
      infoStorage.sex = sex === '男' ? 0 : 1;
      infoStorage.age = age;
      setStep(step + 1);
    }
    if (step === 2) {
      infoStorage.height = height;
      infoStorage.weight = weight;
        setStep(step + 1);
    }
    if (step === 3) {
      infoStorage.edu = edu;
        setStep(step + 1);
    }
    if (step === 4) {
      if(!cholesterol||!blood){
        Toast.fail('请检查输入！');
        return;
      }else if(blood < 100 || blood > 240){
        Toast.fail('收缩压范围：100-240mmHg');
        return;
      }else if(!/^\d+(\.\d{1,2})?$/.test(cholesterol)){
        Toast.fail('胆固醇最多2位小数');
        return;
      }else if(cholesterol<2 || cholesterol>8){
        Toast.fail('胆固醇范围：2.00-8.00');
        return;
      }
      infoStorage.cholesterol = cholesterol;
      infoStorage.blood = blood;
        setStep(step + 1);
    }
    if (step === 5) {
      if(sport === -1){
        Toast.fail('请选择否经常有体力活动！');
        return;
      }
      infoStorage.sport = sport;
      setStep(step + 1);
    }
    if (step === 6) {
      if (medicalHistoryFlag === -1) {
        Toast.fail('请选择是否有病史');
        return;
      }
      if (medicalHistoryFlag === 1) {
        if (!medicineHistoryVos.length) {
          Toast.fail('请添加病史');
          return;
        }
      }
      infoStorage.medicalHistoryFlag = medicalHistoryFlag;
      infoStorage.medicineHistoryVos = medicineHistoryVos;
      const list = [] as any;
      medicineHistoryVos.forEach((item: any) => {
        list.push({
          medicineId: item.id,
          medicineName: item.name,
        });
      });
      setStep(step + 1);
    }
    if (step === 7) {
      if(habitFlag === -1){
        Toast.fail('请选择不良习惯！');
        return;
      }
      if(habitFlag === 1&&habitList.length<=0){
        Toast.fail('请选择不良习惯！');
        return;
      }
      infoStorage.habitFlag = habitFlag;
      infoStorage.habitList = habitList;
      let diseaseArr:Array<string> = [];
      medicineHistoryVos.forEach(element => {
        diseaseArr.push(element.id);
      });
      let params = {
        age,
        badHabits: habitList.join(','),
        badHabitsFlag: habitFlag,
        cholesterol,
        educationYears: edu,
        familyDisease: diseaseArr.join(','),
        familyDiseaseFlag: medicalHistoryFlag,
        height,
        manualLabourFlag: sport,
        serviceRecordId: getUrlParams('serviceRecordId'),
        sex: sex==='男'?1:0,
        systolicPressure: blood,
        weight
      };
      saveInfo(params).then(res => {
        setPercentage(res.dementiaProbability);
        setId(res.serviceRecordId);
        setShowDia(true);
      });
      }
  };
  const gohome = () => {
    history.replace(`/dementia/home?serviceRecordId=${id}`);
    setShowDia(false);
  };
  return (
    <Page title="阿尔兹海默症数字疗法">
      <div className="entry-information-page">
        {step === 1 && (
          <div className="mb-32">
            <SexPicker
              value={sex}
              onChange={(val) => {
                setSex(val);
              }}
            ></SexPicker>
            <AgePicker
              value={age}
              onChange={(val) => {
                setAge(val);
              }}
            ></AgePicker>
          </div>
        )}
        {step === 2 && (
          <HeigthWeightPicker
            heightValue={height}
            weightValue={weight}
            onHeightChange={(val) => {
              setHeight(val);
            }}
            onWeightChange={(val) => {
              setWeight(val);
            }}
          ></HeigthWeightPicker>
        )}
        {step === 3 && (
          <EducationPicker
            value={edu}
              onChange={(val) => {
                setEdu(val);
              }} />
        )}
        {step === 4 && (
          <HealthyPicker
            cholesterol={cholesterol}
            blood={blood}
            onCholesterolChange={(val) => {
                setCholesterol(val);
              }}
              onBloodChange={(val) => {
                setBlood(val);
              }} />
        )}
        {step === 5 && (
          <Sport
            value={sport}
            onChange={(val) => {
              setSport(val);
            }}
          ></Sport>
        )}
        {step === 6 && (
          <YesOrNo
            value={medicalHistoryFlag}
            diseaseList={medicineHistoryVos}
            onChange={(val) => {
              setMedicalHistoryFlag(val);
            }}
            getDiseaseList={(list) => {
              setMedicineHistoryVos(list);
            }}
          ></YesOrNo>
        )}
        {step === 7 && (
          <Habit
            value={habitFlag}
            habitList={habitList}
            onChange={(val) => {
              setHabitFlag(val);
            }}
            getDiseaseList={(list) => {
              setHabitList(list);
            }}
          ></Habit>
        )}
        {step > 0 && (
          <div className="btn-next" onClick={handleNext}>
            {step >= 7 ? '生成测试结果' : '下一步'}
          </div>
        )}
        {step > 1 ? 
        <div className="btn-prev" onClick={handlePrev}>返回上一步</div> : null 
        }
        {
          showDia ? <div className="dementia-dia">
            <div className="dementia-dia-content">
              <div className="dementia-dia-content-title">阿尔兹海默症自测</div>
              <div className="dementia-dia-content-subtitle">根据CAIDE风险评分预测未来20年内您患病的风险为<strong>{percentage}%</strong></div>
              <div className="dementia-dia-content-btn" onClick={gohome}>开启预防数字疗法</div>
            </div>
          </div> : null
        }
      </div>
    </Page>
  );
}
