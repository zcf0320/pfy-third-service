/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import YesOrNo from 'page/perfectRecord/component/YesOrNo';
import Tag from 'page/perfectRecord/component/Tag';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number) => void;
}
const list = ['擦伤', '骨折'];
function Pace10(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [judge, setJudge] = useState('是');
  const [choosedList, setChoosedList] = useState([]);

  useEffect(() => {
    let { trauma } = perfectRecordStore.healthData;
    if (trauma) {
      if (trauma === '否') {
        setJudge(trauma);
      } else {
        let add = trauma.split(',');
        list.concat(add);
        setChoosedList(add);
      }
    }
  }, [perfectRecordStore.healthData]);
  const addList = (text: string) => {
    list.push(text);
  };
  return (
    <div className='pace10'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您是否有外伤史</div>
      <YesOrNo
        choosed={judge}
        setChoosed={(data: string) => {
          setJudge(data);
        }}
      />
      {judge === '是' && (
        <Tag
          title={'外伤史'}
          list={list} // 待选择列表
          choosed={choosedList} //选中的列表
          multiple={true} //是否多选
          setChoosed={(data: any) => {
            //传出选中的列表
            setChoosedList(data);
          }}
          size={'big'} //tag大小 big small medium
          edit={true}
          editType={1}
          addList={addList}
        />
      )}
      <div className='region-bottom' style={{ marginTop: '54px' }}>
        <Jump
          index={11}
          isClick={judge === '否' || choosedList.length > 0}
          showSkip
          next={() => {
            perfectRecordStore.setHealthData({
              trauma: judge === '否' ? '否' : choosedList.join(','),
            });
            saveHealth({
              step: 16,
              scoreCode: 'TRAUMA_HISTORY',
              trauma: judge === '否' ? '否' : choosedList.join(','),
            }).then(() => {
              setIndex(16);
            });
          }}
          back={() => {
            setIndex(14);
          }}
          skip={() => {
            updateStep(16).then(() => {
              props.setIndex(16);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace10);
