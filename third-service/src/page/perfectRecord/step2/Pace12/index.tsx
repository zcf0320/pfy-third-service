/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import Tag from 'page/perfectRecord/component/Tag';
import LongTag from 'page/perfectRecord/component/LongTag';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number) => void;
}
const list: Array<string> = ['脸肿', '脚肿'];
function Pace12(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [edema, setEdema] = useState('');
  const [bleed, setBleed] = useState('');
  const [choosedList, setChoosedList] = useState<Array<string>>([]);
  const [longchoosed, setLongchoosed] = useState([]);
  const [focus, setFocus] = useState(false);
  const [addValue, setAddValue] = useState('');

  const bleedList: any = [
    { title: '瘀点', note: '有直径2mm的出血点' },
    { title: '血肿', note: '有直径约3-5mm的出血点' },
    { title: '紫癜', note: '有直径5mm的出血点' },
    { title: '瘀斑', note: '片状出血并伴有皮肤显著隆起' },
  ];

  useEffect(() => {
    let { edema, subcutaneous } = perfectRecordStore.healthData;
    if (edema) {
      if (edema === '否') {
        setEdema('1');
      } else {
        setEdema('0');
        let arr = edema.split(',');
        setChoosedList(arr);
        list.concat(arr);
      }
    }
    if (subcutaneous) {
      if (subcutaneous === '否') {
        setBleed('1');
      } else {
        setBleed('0');
        setLongchoosed(subcutaneous.split(','));
      }
    }
  }, [perfectRecordStore.healthData]);

  return (
    <div className='pace12'>
      <div className='record-cur'>您当前所处步骤：健康信息</div>
      <div className='record-title'>您是否有如下亚健康状况</div>
      <div
        className={`part-title flex radio-box ${
          edema === '1' ? 'mb124' : 'mb24'
        }`}>
        <div>您是否容易水肿{edema === '0' && '（多选）'}</div>
        <div>
          <div className='flex choose-box'>
            <div
              className='yes flex'
              onClick={() => {
                setChoosedList([]);
                setEdema('0');
              }}>
              <div className={` ${edema === '0' ? 'active1' : 'circle'}`}></div>
              <span>是</span>
            </div>
            <div
              className='no flex'
              onClick={() => {
                setChoosedList([]);
                setEdema('1');
              }}>
              <div className={` ${edema === '1' ? 'active1' : 'circle'}`}></div>
              <span>否</span>
            </div>
          </div>
        </div>
      </div>
      {edema === '0' && (
        <Tag
          list={list} // 待选择列表
          choosed={choosedList} //选中的列表
          multiple={true} //是否多选
          setChoosed={(data: any) => {
            //传出选中的列表
            setChoosedList(data);
          }}
          size={'big'} //tag大小 big small medium
        />
      )}
      {edema === '0' && (
        <div className='add-content flex'>
          <input
            className='left'
            placeholder='请输入您的水肿部位'
            value={addValue}
            onChange={(e) => {
              setAddValue(e.target.value);
            }}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setFocus(false);
              }, 500);
            }}></input>
          <div className='right flex'>
            {focus ? (
              <div
                className='del'
                onClick={() => {
                  setAddValue('');
                }}></div>
            ) : null}
            <div
              className='add'
              onClick={() => {
                if (addValue) {
                  list.push(addValue);
                  choosedList.push(addValue);
                  setAddValue('');
                  setChoosedList([...choosedList]);
                }
              }}>
              确认
            </div>
          </div>
        </div>
      )}
      <div
        className={`part-title flex radio-box ${
          (!edema || edema === '1') && 'mt24'
        } `}>
        <div>您是否有皮下出血{bleed === '0' && '（多选）'}</div>
        <div>
          <div className='flex choose-box'>
            <div
              className='yes flex'
              onClick={() => {
                setLongchoosed([]);
                setBleed('0');
              }}>
              <div className={` ${bleed === '0' ? 'active1' : 'circle'}`}></div>
              <span>是</span>
            </div>
            <div
              className='no flex'
              onClick={() => {
                setLongchoosed([]);
                setBleed('1');
              }}>
              <div className={` ${bleed === '1' ? 'active1' : 'circle'}`}></div>
              <span>否</span>
            </div>
          </div>
        </div>
      </div>
      {bleed === '0' && (
        <LongTag
          list={bleedList} // 待选择列表
          choosed={longchoosed} //选中的列表
          multiple={true} //是否多选
          setChoosed={(data: any) => {
            //传出选中的列表
            setLongchoosed(data);
          }}
        />
      )}
      <div className='region-bottom'>
        <Jump
          index={13}
          showSkip
          isClick={
            (edema === '1' || choosedList.length > 0) &&
            (bleed === '1' || longchoosed.length > 0) &&
            !!bleed &&
            !!edema
          }
          next={() => {
            if (edema === '1') {
              perfectRecordStore.setHealthData({
                edema: '否',
              });
            } else {
              perfectRecordStore.setHealthData({
                edema: choosedList.join(','),
              });
            }
            if (bleed === '1') {
              perfectRecordStore.setHealthData({
                subcutaneous: '否',
              });
            } else {
              perfectRecordStore.setHealthData({
                subcutaneous: longchoosed.join(','),
              });
            }
            saveHealth({
              step: 11,
              scoreCode: 'SUB_HEALTH',
              edema: edema === '1' ? '否' : choosedList.join(','),
              subcutaneous: bleed === '1' ? '否' : longchoosed.join(','),
            }).then(() => {
              props.setIndex(11);
            });
          }}
          back={() => {
            setIndex(9);
          }}
          skip={() => {
            updateStep(11).then(() => {
              props.setIndex(11);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace12);
