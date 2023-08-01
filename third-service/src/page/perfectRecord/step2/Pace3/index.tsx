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
const list: any = ['<21天', '21-35天', '>35天', '无规律'];
const list1: any = ['<3天', '3-7天', '>7天', '无规律'];
const list2: any = ['鲜红色', '暗红色', '淡红色', '都不是'];
function Pace3(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [choosedList, setChoosedList] = useState([]);
  const [choosedList1, setChoosedList1] = useState([]);
  const [choosedList2, setChoosedList2] = useState([]);

  const imgList: any = [
    'ferfectRecord/blood1.png',
    'ferfectRecord/blood2.png',
    'ferfectRecord/blood3.png',
    'ferfectRecord/blood4.png',
  ];

  useEffect(() => {
    let { menstrualCycle, menstrualDuration, menstrualColor } =
      perfectRecordStore.healthData;
    menstrualCycle && setChoosedList(menstrualCycle.split(','));
    menstrualDuration && setChoosedList1(menstrualDuration.split(','));
    menstrualColor && setChoosedList2(menstrualColor.split(','));
  }, [perfectRecordStore.healthData]);

  return (
    <div className='pace3'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您的月经情况</div>
      <Tag
        title={'月经周期（天）'}
        list={list} // 待选择列表
        choosed={choosedList} //选中的列表
        multiple={false} //是否多选
        setChoosed={(data: any) => {
          //传出选中的列表
          setChoosedList(data);
        }}
        size={'medium'} //tag大小 big small medium
      />
      <Tag
        title={'月经时长（天）'}
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
        title={'颜色'}
        list={list2} // 待选择列表
        choosed={choosedList2} //选中的列表
        imgList={imgList} //icon列表
        multiple={false} //是否多选
        setChoosed={(data: any) => {
          //传出选中的列表
          setChoosedList2(data);
        }}
        size={'medium'} //tag大小 big small medium
      />
      <div className='region-bottom'>
        <Jump
          isClick={
            choosedList.length > 0 &&
            choosedList1.length > 0 &&
            choosedList2.length > 0
          }
          showSkip
          index={3}
          next={() => {
            perfectRecordStore.setHealthData({
              menstrualCycle: choosedList.join(','),
              menstrualDuration: choosedList1.join(','),
              menstrualColor: choosedList2.join(','),
            });
            saveHealth({
              step: 7,
              menstrualCycle: choosedList.join(','),
              menstrualDuration: choosedList1.join(','),
              menstrualColor: choosedList2.join(','),
            }).then(() => {
              props.setIndex(7);
            });
          }}
          back={() => {
            perfectRecordStore.setHealthData({
              menstrualCycle: choosedList.join(','),
              menstrualDuration: choosedList1.join(','),
              menstrualColor: choosedList2.join(','),
            });
            setIndex(5);
          }}
          skip={() => {
            updateStep(7).then(() => {
              props.setIndex(7);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace3);
