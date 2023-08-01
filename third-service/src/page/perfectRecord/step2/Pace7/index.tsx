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

function Pace7(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [judge, setJudge] = useState('是');
  const [show, setShow] = useState(false);
  const [choosedList, setChoosedList] = useState([]);
  const [list, setList] = useState([
    '高血压',
    '糖尿病',
    '脑梗',
    '白癜风',
    '癫痫',
    '哮喘',
  ]);

  useEffect(() => {
    let { disease } = perfectRecordStore.healthData;
    if (disease) {
      if (disease === '否') {
        setJudge(disease);
      } else {
        setChoosedList(disease.split(','));
      }
    }
  }, [perfectRecordStore.healthData]);

  const updateList = (name: string) => {
    let old = list;
    list.push(name);
    setList(old);
    setShow(false);
  };

  return (
    <div className='pace7'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您是否有疾病史</div>
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
            console.log(data);
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
          index={7}
          showSkip
          isClick={judge === '否' || choosedList.length > 0}
          next={() => {
            if (judge === '否') {
              perfectRecordStore.setHealthData({
                disease: '否',
              });
            } else {
              perfectRecordStore.setHealthData({
                disease: choosedList.join(','),
              });
            }
            saveHealth({
              scoreCode: 'DISEASE_HISTORY',
              disease: judge === '否' ? '否' : choosedList.join(','),
            }).then(() => {
              setIndex(13);
            });
          }}
          back={() => {
            setIndex(11);
          }}
          skip={() => {
            updateStep(13).then(() => {
              props.setIndex(13);
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
export default observer(Pace7);
