/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import YesOrNo from 'page/perfectRecord/component/YesOrNo';
import Jump from 'page/perfectRecord/component/Jump';
import { saveHealth, updateStep } from '@api/perfectRecord';
interface IProps {
  setIndex: (index: number) => void;
}

function Pace2(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const [judge, setJudge] = useState('是');

  useEffect(() => {
    let { menses } = perfectRecordStore.healthData;

    if (menses) {
      if (menses === '否') {
        setJudge('否');
      } else {
        setJudge('是');
      }
    }
  }, [perfectRecordStore.healthData]);

  return (
    <div className='pace2'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您是否来过月经</div>
      <YesOrNo
        choosed={judge}
        setChoosed={(data: string) => {
          setJudge(data);
        }}
      />
      <div className='region-bottom'>
        <Jump
          isClick={true}
          showSkip
          index={2}
          next={() => {
            perfectRecordStore.setHealthData({
              menses: judge === '否' ? '否' : '是',
            });
            saveHealth({
              scoreCode: 'LUNARIA',
              step: 6,
              menses: judge === '否' ? '否' : '是',
            }).then(() => {
              props.setIndex(6);
            });
          }}
          back={() => {
            if (judge === '否') {
              perfectRecordStore.setHealthData({
                menses: '否',
              });
            } else {
              perfectRecordStore.setHealthData({
                menses: '是',
              });
            }
            props.setIndex(4);
          }}
          skip={() => {
            updateStep(6).then(() => {
              props.setIndex(6);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace2);
