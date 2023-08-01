import React, { useEffect, useState } from 'react';
import YesAndNo from '../YesAndNo';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
import SearchDisease from '../SearchDisease';
const SURGERY_LIST = [
  { text: '阑尾切除术', select: false },
  { text: '甲状腺手术', select: false },
  { text: '拔牙术', select: false },
  { text: '肿瘤切除术', select: false },
  { text: '主动脉缩窄术', select: false },
  { text: '其他手术', select: false },
];
const SurgeryHistory = () => {
  const [values, setValue] = useState<string | boolean>('');
  const HealthRecordStore = useStores('HealthRecordStore');
  const { surgeryHistory } = HealthRecordStore.healthyFile;
  const [surgeryList, setSurgeryList] = useState(SURGERY_LIST);
  const [showSearchDisease, setShowSearchDisease] = useState(false);
  const yes = () => {
    HealthRecordStore.delHealthyFile('surgeryHistory');
    surgeryList.forEach((item) => {
      item.select = false;
    });
    setSurgeryList([...surgeryList]);
    setValue(true);
  };
  const no = () => {
    setValue(false);
    HealthRecordStore.setHealthyFile({ surgeryHistory: '' });
  };
  useEffect(() => {
    if (surgeryHistory) {
      let selectPast = surgeryHistory.split(',');
      let neverPast: any = [];
      selectPast.forEach((item: string) => {
        let isHas = false;
        surgeryList.forEach((pItem: any) => {
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
      setSurgeryList([...surgeryList, ...neverPast]);
      setValue(true);
    }
  }, [surgeryHistory, surgeryList]);
  const setSurgeryHistoryStr = () => {
    let surgeryHistoryStr = '';
    surgeryList.forEach((item) => {
      item.select &&
        (surgeryHistoryStr += `${surgeryHistoryStr ? ',' : ''}${item.text}`);
    });
    HealthRecordStore.setHealthyFile({ surgeryHistory: surgeryHistoryStr });
    !surgeryHistoryStr && HealthRecordStore.delHealthyFile('surgeryHistory');
  };
  return (
    <div className='component-past flex'>
      <YesAndNo
        yes={yes}
        no={no}
        title='您是否有手术史'
        value={values}></YesAndNo>
      {showSearchDisease ? (
        <SearchDisease
          list={surgeryList}
          type={16}
          cb={(name) => {
            if (name) {
              surgeryList.push({ text: name, select: true });
              setSurgeryList([...surgeryList]);
              setSurgeryHistoryStr();
            }
            setShowSearchDisease(false);
          }}></SearchDisease>
      ) : null}
      {values ? (
        <div className='past'>
          <div className='past-title'>请选择疾病史（可多选）</div>
          <div className='past-list flex'>
            {surgeryList.length &&
              surgeryList.map((item, index) => {
                return (
                  <div
                    className={`past-item flex ${item.select ? 'active' : ''}`}
                    key={item.text}
                    onClick={() => {
                      surgeryList[index].select = !surgeryList[index].select;
                      setSurgeryList([...surgeryList]);
                      setSurgeryHistoryStr();
                    }}>
                    <div className='past-item-content'>{item.text}</div>
                  </div>
                );
              })}
            <div
              className='past-item flex'
              onClick={() => {
                setShowSearchDisease(true);
              }}>
              +更多
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default observer(SurgeryHistory);
