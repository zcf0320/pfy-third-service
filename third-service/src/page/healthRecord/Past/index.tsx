import React, { useEffect, useState } from 'react';
import YesAndNo from '../YesAndNo';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
import SearchDisease from '../SearchDisease';
import { healthRecordStore } from '@store/interface';
const PAST_LIST = [
  { text: '高血压', select: false },
  { text: '糖尿病', select: false },
  { text: '脑梗', select: false },
  { text: '白癜风', select: false },
  { text: '癫痫', select: false },
  { text: '哮喘', select: false },
];
const Past = () => {
  const [values, setValue] = useState<string | boolean>('');
  const HealthRecordStore: healthRecordStore = useStores('HealthRecordStore');
  const { past } = HealthRecordStore.healthyFile;
  const [pastList, setPastList] = useState(PAST_LIST);
  const [showSearchDisease, setShowSearchDisease] = useState(false);
  const yes = () => {
    HealthRecordStore.delHealthyFile('past');
    pastList.forEach((item) => {
      item.select = false;
    });
    setPastList([...pastList]);
    setValue(true);
  };
  const no = () => {
    setValue(false);
    HealthRecordStore.setHealthyFile({ past: '' });
  };
  useEffect(() => {
    if (past) {
      let selectPast = past.split(',');
      let neverPast: any = [];
      selectPast.forEach((item: string) => {
        let isHas = false;
        pastList.forEach((pItem: any) => {
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
      setPastList([...pastList, ...neverPast]);
      setValue(true);
    }
  }, [past, pastList]);
  const setPastStr = () => {
    let pastStr = '';
    pastList.forEach((item) => {
      item.select && (pastStr += `${pastStr ? ',' : ''}${item.text}`);
    });
    pastStr && HealthRecordStore.setHealthyFile({ past: pastStr });
    !pastStr && HealthRecordStore.delHealthyFile('past');
  };
  return (
    <div className='component-past flex'>
      <YesAndNo
        yes={yes}
        no={no}
        title={
          HealthRecordStore.fileType === '4'
            ? '孩子是否有疾病史'
            : '您是否有疾病史'
        }
        value={values}></YesAndNo>
      {showSearchDisease ? (
        <SearchDisease
          list={pastList}
          cb={(name) => {
            if (name) {
              pastList.push({ text: name, select: true });
              setPastList([...pastList]);
              setPastStr();
            }
            setShowSearchDisease(false);
          }}></SearchDisease>
      ) : null}
      {values ? (
        <div className='past'>
          <div className='past-title'>请选择疾病史（可多选）</div>
          <div className='past-list flex'>
            {pastList.length &&
              pastList.map((item, index) => {
                return (
                  <div
                    className={`past-item flex ${item.select ? 'active' : ''}`}
                    key={item.text}
                    onClick={() => {
                      pastList[index].select = !pastList[index].select;
                      setPastList([...pastList]);
                      setPastStr();
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
export default observer(Past);
