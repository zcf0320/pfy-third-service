/** @format */

import React, { useState, useEffect } from 'react';
import Jump from 'page/perfectRecord/component/Jump';
import './index.scss';
import YesOrNo from 'page/perfectRecord/component/YesOrNo';
import Tag from 'page/perfectRecord/component/Tag';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { saveHealth, updateStep } from '@api/perfectRecord';

type IProps = {
  setIndex: (index: number, type?: boolean) => void;
};

const BadHabits = (props: IProps) => {
  const perfectRecordStore = useStores('perfectRecordStore');
  const commonStore = useStores('commonStore');
  const [choose, setChoose] = useState<string>('');
  const list = ['吸烟', '喝酒'];
  const [choosedList, setChoosedList] = useState([]);

  useEffect(() => {
    let { badHabits } = perfectRecordStore.healthData;

    if (badHabits) {
      if (badHabits === '否') {
        setChoose('否');
      } else {
        setChoose('是');
        setChoosedList(badHabits.split(','));
      }
    }
  }, [perfectRecordStore.healthData]);

  return (
    <div className='habit'>
      <div className='content'>
        <div className='subtitle'>您当前所处步骤:基本信息</div>
        <div className='content-title'>您是否有不良习惯</div>
        <div className='main'>
          <YesOrNo
            choosed={choose}
            setChoosed={(answer: string) => {
              setChoose(answer);
            }}
          />
          {choose === '是' && (
            <Tag
              title={'请选择不良习惯（可多选）'}
              list={list} // 待选择列表
              choosed={choosedList} //选中的列表
              multiple={true} //是否多选
              setChoosed={(data: any) => {
                //传出选中的列表
                setChoosedList(data);
              }}
              size={'big'}
            />
          )}
        </div>
      </div>
      <div className='region-bottom'>
        <Jump
          index={3}
          isClick={choose === '否' ? !!choose : choosedList.length > 0}
          showSkip
          next={() => {
            if (choose === '否') {
              perfectRecordStore.setHealthData({
                badHabits: '否',
              });
            } else {
              perfectRecordStore.setHealthData({
                badHabits: choosedList.join(','),
              });
            }
            saveHealth({
              step: 4,
              scoreCode: 'BAD_HABITS',
              badHabits: choose === '否' ? '否' : choosedList.join(','),
            }).then(() => {
              if (commonStore.userInfo.sex === 1) {
                props.setIndex(8);
              } else {
                props.setIndex(4);
              }
            });
          }}
          back={() => {
            if (choose === '否') {
              perfectRecordStore.setHealthData({
                badHabits: '否',
              });
            } else {
              perfectRecordStore.setHealthData({
                badHabits: choosedList.join(','),
              });
            }
            props.setIndex(2);
          }}
          skip={() => {
            updateStep(4).then(() => {
              if (commonStore.userInfo.sex === 1) {
                props.setIndex(8);
              } else {
                props.setIndex(4);
              }
            });
          }}
        />
      </div>
    </div>
  );
};

export default observer(BadHabits);
