/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import YesOrNo from 'page/perfectRecord/component/YesOrNo';
import Tag from 'page/perfectRecord/component/Tag';
import Jump from 'page/perfectRecord/component/Jump';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number) => void;
  // step: number;
}
const yes: Array<string> = ['足月', '早产', '流产'];
const no: Array<string> = ['未生育', '未生育、有流产'];

function Pace1(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const [judge, setJudge] = useState('是');
  const [choosedList, setChoosedList] = useState([]);
  let list: any = judge === '是' ? yes : no;
  useEffect(() => {
    if (perfectRecordStore.healthData.birth) {
      let arr = perfectRecordStore.healthData.birth.split(',');
      if (yes.indexOf(arr[0]) > -1) {
        setJudge('是');
      } else {
        setJudge('否');
      }
      setChoosedList(arr);
    }
  }, [perfectRecordStore.healthData.birth]);
  return (
    <div>
      <div className='pace1'>
        <div className='subtitle'>您当前所处步骤:健康信息</div>
        <div className='record-title'>您是否已生育</div>
        <YesOrNo
          choosed={judge}
          setChoosed={(data: string) => {
            setChoosedList([]);
            setJudge(data);
          }}
        />
        <Tag
          title={'请选择您的生育状况'}
          list={list} // 待选择列表
          choosed={choosedList} //选中的列表
          multiple={false} //是否多选
          setChoosed={(data: any) => {
            //传出选中的列表
            setChoosedList(data);
          }}
          size={'big'} //tag大小 big small medium
        />
        <div className='region-bottom'>
          <Jump
            isClick={!!judge && choosedList.length > 0}
            showSkip
            index={4}
            next={() => {
              perfectRecordStore.setHealthData({
                birth: choosedList.join(','),
              });
              saveHealth({
                step: 5,
                scoreCode: 'FERTILITY',
                birth: choosedList.join(','),
              }).then(() => {
                props.setIndex(5);
              });
            }}
            back={() => {
              props.setIndex(3);
            }}
            skip={() => {
              updateStep(5).then(() => {
                props.setIndex(5);
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default observer(Pace1);
