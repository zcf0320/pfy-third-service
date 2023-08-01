import React, { useState, useEffect } from 'react';
import YesAndNo from '../YesAndNo';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const ALLERGY_LIST = [
  { text: '抗生素过敏', select: false },
  { text: '花粉过敏', select: false },
  { text: '牛奶过敏', select: false },
  { text: '动物毛发过敏', select: false },
  { text: '海鲜类食物过敏', select: false },
];
const Allergy = () => {
  const [values, setValue] = useState<string | boolean>('');
  const HealthRecordStore = useStores('HealthRecordStore');
  const { allergy } = HealthRecordStore.healthyFile;
  const [allergyList, setAllergyList] = useState(ALLERGY_LIST);
  const [addValue, setAddValue] = useState('');
  const [focus, setFocus] = useState(false);
  const yes = () => {
    HealthRecordStore.delHealthyFile('allergy');
    allergyList.forEach((item) => {
      item.select = false;
    });
    setAllergyList([...allergyList]);
    setValue(true);
  };
  const no = () => {
    setValue(false);
    HealthRecordStore.setHealthyFile({ allergy: '' });
  };
  useEffect(() => {
    if (allergy) {
      let selectAllergy = allergy.split(',');
      let neverPast: any = [];
      selectAllergy.forEach((item: string) => {
        let isHas = false;
        allergyList.forEach((pItem: any) => {
          // 判断是否有
          if (item === pItem.text) {
            isHas = true;
            pItem.select = true;
          }
        });
        !isHas &&
          neverPast.push({
            text: item,
            select: true,
          });
      });
      setAllergyList([...allergyList, ...neverPast]);
      setValue(true);
    }
  }, [allergy, allergyList]);
  const setAllergyStr = () => {
    let allergyStr = '';
    allergyList.forEach((item) => {
      item.select && (allergyStr += `${allergyStr ? ',' : ''}${item.text}`);
    });
    HealthRecordStore.setHealthyFile({ allergy: allergyStr });
    !allergyStr && HealthRecordStore.delHealthyFile('allergy');
  };
  return (
    <div className='component-past flex'>
      <YesAndNo
        yes={yes}
        no={no}
        title={
          HealthRecordStore.fileType === '4'
            ? '孩子是否有过敏史'
            : '您是否有过敏史'
        }
        value={values}></YesAndNo>
      {values ? (
        <div className='past'>
          <div className='past-title'>请选择过敏史（可多选）</div>
          <div className='past-list flex'>
            {allergyList.length &&
              allergyList.map((item, index) => {
                return (
                  <div
                    className={`past-item flex ${item.select ? 'active' : ''}`}
                    key={item.text}
                    onClick={() => {
                      allergyList[index].select = !allergyList[index].select;
                      setAllergyList([...allergyList]);
                      setAllergyStr();
                    }}>
                    <div className='past-item-content'>{item.text}</div>
                  </div>
                );
              })}
          </div>
          <div className='add-content flex'>
            <input
              className='left'
              placeholder='请输入其他过敏史'
              value={addValue}
              onChange={(e) => {
                setAddValue(e.target.value);
              }}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setFocus(false);
                }, 500);
              }}></input>
            <div className='right flex'>
              {focus ? (
                <div
                  className='del'
                  onClick={() => {
                    setAddValue('');
                  }}></div>
              ) : null}
              <div
                className='add'
                onClick={() => {
                  allergyList.push({ text: addValue, select: true });
                  setAddValue('');
                  setAllergyList([...allergyList]);
                  setAllergyStr();
                }}>
                确认
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default observer(Allergy);
