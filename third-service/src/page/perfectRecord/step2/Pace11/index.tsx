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
const list = ['高血压', '糖尿病', '脑梗', '白癜风', '癫痫', '哮喘'];
function Pace11(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [judge, setJudge] = useState('是');
  const [show, setShow] = useState(false);
  const [choosedList, setChoosedList] = useState([]);

  useEffect(() => {
    let { existingDiseases } = perfectRecordStore.healthData;
    if (existingDiseases) {
      if (existingDiseases === '否') {
        setJudge(existingDiseases);
      } else {
        let add = existingDiseases.split(',');
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
    <div className='pace11'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您是否有现病史</div>
      <YesOrNo
        choosed={judge}
        setChoosed={(data: string) => {
          setJudge(data);
        }}
      />
      {judge === '是' && (
        <Tag
          title={'请选择现病史（可多选）'}
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
          index={12}
          isClick={judge === '否' || choosedList.length > 0}
          showSkip
          next={() => {
            perfectRecordStore.setHealthData({
              existingDiseases: judge === '否' ? '否' : choosedList.join(','),
            });
            saveHealth({
              step: 17,
              scoreCode: 'ILLNESS_HISTORY',
              existingDiseases: judge === '否' ? '否' : choosedList.join(','),
            }).then(() => {
              props.setIndex(17);
            });
          }}
          back={() => {
            setIndex(15);
          }}
          skip={() => {
            updateStep(17).then(() => {
              props.setIndex(17);
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
          type={2}
        />
      )}
    </div>
  );
}
export default observer(Pace11);
