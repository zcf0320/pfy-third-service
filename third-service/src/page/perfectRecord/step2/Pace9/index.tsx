/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import YesOrNo from 'page/perfectRecord/component/YesOrNo';
import Tag from 'page/perfectRecord/component/Tag';
import Disease from 'page/perfectRecord/component/Disease';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number) => void;
}
const list = [
  '阑尾切除术',
  '甲状腺手术',
  '拔牙术',
  '肿瘤切除术',
  '主动脉缩窄术',
  '其他手术',
];
function Pace9(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [judge, setJudge] = useState('是');
  const [show, setShow] = useState(false);
  const [choosedList, setChoosedList] = useState([]);

  useEffect(() => {
    let { operation } = perfectRecordStore.healthData;
    if (operation) {
      if (operation === '否') {
        setJudge(operation);
      } else {
        let add = operation.split(',');
        list.concat(add);
        setChoosedList(add);
      }
    }
  }, [perfectRecordStore.healthData]);

  const updateList = (name: string) => {
    list.push(name);
    setShow(false);
  };
  return (
    <div className='pace9'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您是否有手术史</div>
      <YesOrNo
        choosed={judge}
        setChoosed={(data: string) => {
          setJudge(data);
        }}
      />
      {judge === '是' && (
        <Tag
          title={'请选择疾病史（可多选）'}
          list={list} // 待选择列表
          choosed={choosedList} //选中的列表
          multiple={true} //是否多选
          setChoosed={(data: any) => {
            //传出选中的列表
            setChoosedList(data);
          }}
          size={'big'} //tag大小 big small medium
          addTag={true}
          openSearch={() => {
            setShow(true);
          }}
        />
      )}
      <div className='region-bottom'>
        <Jump
          index={10}
          isClick={judge === '否' || choosedList.length > 0}
          showSkip
          next={() => {
            perfectRecordStore.setHealthData({
              operation: judge === '否' ? '否' : choosedList.join(','),
            });
            saveHealth({
              step: 15,
              scoreCode: 'SURGICAL_HISTORY',
              operation: judge === '否' ? '否' : choosedList.join(','),
            }).then(() => {
              setIndex(15);
            });
          }}
          back={() => {
            setIndex(13);
          }}
          skip={() => {
            updateStep(15).then(() => {
              props.setIndex(15);
            });
          }}
        />
      </div>
      {show && (
        <Disease
          updateList={updateList}
          exsitList={list}
          close={() => {
            setShow(false);
          }}
          type={1}
        />
      )}
    </div>
  );
}
export default observer(Pace9);
