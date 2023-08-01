/** @format */

import React, { useState, useEffect } from 'react';
import './index.scss';
import Tag from 'page/perfectRecord/component/Tag';
import Jump from 'page/perfectRecord/component/Jump';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

type IProps = {
  setIndex: (index: number, data?: any) => void;
};

const Food = (props: IProps) => {
  const perfectRecordStore = useStores('perfectRecordStore');
  const [food, setFood] = useState<string>();

  const list = ['偏甜', '偏咸', '偏辣', '偏淡'];
  const [choosesList, setChoosesList] = useState<Array<string>>([]);

  useEffect(() => {
    let { food, flavor } = toJS(perfectRecordStore.healthData);
    food && setFood(food);
    flavor && setChoosesList(flavor.split(','));
  }, [perfectRecordStore.healthData]);

  return (
    <div className='food'>
      <div className='step-title'>您的饮食情况</div>
      <div className='food-details'>
        <div
          className='item'
          onClick={() => {
            setFood('偏食');
          }}>
          <div className={`img ${food === '偏食' ? 'img-3' : 'img-1'}`}></div>
          <div className='text'>偏食</div>
        </div>
        <div
          className='item'
          onClick={() => {
            setFood('正常');
          }}>
          <div className={`img ${food === '正常' ? 'img-4' : 'img-2'}`}></div>
          <div className='text'>正常</div>
        </div>
      </div>
      {food === '偏食' && (
        <div className='flavor'>
          <Tag
            title={'您的口味（多选）'}
            list={list} // 待选择列表
            choosed={choosesList} //选中的列表
            multiple={true} //是否多选
            setChoosed={(data: any) => {
              //传出选中的列表
              setChoosesList(data);
            }}
            size={'small'}
          />
        </div>
      )}
      <div className={`${food !== '偏食' && 'food-bottom'}`}>
        <Jump
          index={1}
          isClick={!!food || (food === '正常' && choosesList.length > 0)}
          next={() => {
            if (food === '偏食') {
              props.setIndex &&
                props.setIndex(2, {
                  food,
                  flavor: choosesList.join(','),
                });
            } else {
              props.setIndex &&
                props.setIndex(2, {
                  food,
                });
            }
          }}
          back={() => {
            props.setIndex && props.setIndex(0);
          }}
          skip={() => {
            props.setIndex(3);
          }}
        />
      </div>
    </div>
  );
};

export default observer(Food);
