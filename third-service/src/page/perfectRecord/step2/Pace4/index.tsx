/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Tag from 'page/perfectRecord/component/Tag';
import Jump from 'page/perfectRecord/component/Jump';
import { saveHealth, updateStep } from '@api/perfectRecord';
interface IProps {
  setIndex: (index: number) => void;
}
const list: any = ['<10片', '10-20片', '>20片', '不清楚'];
const list1: any = ['有', '无', '不确定'];
const list2: any = ['是', '否'];
function Pace4(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [choosedList, setChoosedList] = useState([]);
  const [choosedList1, setChoosedList1] = useState([]);
  const [choosedList2, setChoosedList2] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let { bloodVolume, bloodClot, dysmenorrhea } =
      perfectRecordStore.healthData;
    bloodVolume && setChoosedList(bloodVolume.split(','));
    bloodClot && setChoosedList1(bloodClot.split(','));
    dysmenorrhea && setChoosedList2(dysmenorrhea.split(','));
  }, [perfectRecordStore.healthData]);

  const showTip = (data: boolean) => {
    setShow(data);
  };
  return (
    <div
      className='pace4'
      onClick={() => {
        setShow(false);
      }}>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您的月经情况</div>
      <Tag
        title={'血量'}
        list={list} // 待选择列表
        choosed={choosedList} //选中的列表
        multiple={false} //是否多选
        setChoosed={(data: any) => {
          //传出选中的列表
          setChoosedList(data);
        }}
        size={'medium'} //tag大小 big small medium
        tips={'每次月经按照每天4-5次更换卫生巾计算'} //提示
        showTip={showTip}
        isShow={show}
      />
      <Tag
        title={'血块'}
        list={list1} // 待选择列表
        choosed={choosedList1} //选中的列表
        multiple={false} //是否多选
        setChoosed={(data: any) => {
          //传出选中的列表
          setChoosedList1(data);
        }}
        size={'medium'} //tag大小 big small medium
      />
      <Tag
        title={'是否痛经'}
        list={list2} // 待选择列表
        choosed={choosedList2} //选中的列表
        multiple={false} //是否多选
        setChoosed={(data: any) => {
          //传出选中的列表
          setChoosedList2(data);
        }}
        size={'medium'} //tag大小 big small medium
      />
      <div className='region-bottom'>
        <Jump
          index={4}
          isClick={
            choosedList.length > 0 &&
            choosedList1.length > 0 &&
            choosedList2.length > 0
          }
          showSkip
          next={() => {
            perfectRecordStore.setHealthData({
              bloodVolume: choosedList.join(','),
              bloodClot: choosedList1.join(','),
              dysmenorrhea: choosedList2.join(','),
            });
            saveHealth({
              step: 8,
              scoreCode: 'LUNARIA_CONDITION',
              bloodVolume: choosedList.join(','),
              bloodClot: choosedList1.join(','),
              dysmenorrhea: choosedList2.join(','),
            }).then(() => {
              props.setIndex(8);
            });
          }}
          back={() => {
            perfectRecordStore.setHealthData({
              bloodVolume: choosedList.join(','),
              bloodClot: choosedList1.join(','),
              dysmenorrhea: choosedList2.join(','),
            });
            setIndex(6);
          }}
          skip={() => {
            updateStep(8).then(() => {
              props.setIndex(8);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace4);
