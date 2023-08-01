/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import YesOrNo from 'page/perfectRecord/component/YesOrNo';
import Tag from 'page/perfectRecord/component/Tag';
import Disease from 'page/perfectRecord/component/Disease';
import { saveHealth } from '@api/perfectRecord';
import { useHistory } from 'react-router-dom';

interface IProps {
  setIndex: (index: number) => void;
}
const list = [
  '抗生素过敏',
  '花粉过敏',
  '牛奶过敏',
  '动物毛发过敏',
  '海鲜类食物过敏',
];

function Pace14(props: IProps) {
  const history = useHistory();
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [judge, setJudge] = useState('是');
  const [choosedList, setChoosedList] = useState([]);
  const [choosedDrug, setChoosedDrug] = useState([]);
  const [show, setShow] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [score, setScore] = useState(0);

  const [drugList, setDrugList] = useState<Array<string>>([]);

  useEffect(() => {
    let { allergyHistory, drugAllergy } = perfectRecordStore.healthData;

    if (allergyHistory && drugAllergy) {
      if (allergyHistory === '否' && drugAllergy === '否') {
        setJudge(allergyHistory);
      } else {
        let add = allergyHistory.split(',');
        list.concat(add);

        setChoosedList(add);
        let drugAdd = drugAllergy ? drugAllergy.split(',') : [];
        // let arr1 = list.concat(drugAdd);
        // arr1 = Array.from(new Set(arr));
        setDrugList(drugAdd);
        setChoosedDrug(drugAdd);
      }
    } else {
      let add = allergyHistory ? allergyHistory.split(',') : [];
      list.concat(add);
      if (allergyHistory) {
        setChoosedList(add);
      } else {
        let drugAdd = drugAllergy ? drugAllergy.split(',') : [];
        // let arr1 = list.concat(drugAdd);
        // arr1 = Array.from(new Set(arr));
        setDrugList(drugAdd);
        setChoosedDrug(drugAdd);
      }
    }
  }, [perfectRecordStore.healthData]);
  const addList = (text: string) => {
    let old: any = list;
    old.push(text);
  };
  const updateList = (name: string) => {
    drugList.push(name.split('-')[0]);
    setDrugList(drugList);
    setShow(false);
  };
  return (
    <div className='pace14'>
      <div className='record-cur'>您当前所处步骤:健康信息</div>
      <div className='record-title'>您是否有过敏史</div>
      <YesOrNo
        choosed={judge}
        setChoosed={(data: string) => {
          setJudge(data);
        }}
      />
      {judge === '是' && (
        <Tag
          title={'请选择过敏史（可多选）'}
          list={list} // 待选择列表
          choosed={choosedList} //选中的列表
          multiple={true} //是否多选
          setChoosed={(data: any) => {
            //传出选中的列表
            setChoosedList(data);
          }}
          size={'big'} //tag大小 big small medium
          edit={true}
          addList={addList}
          openSearch={() => {
            setShow(true);
          }}
          drugList={drugList}
          choosedDrug={choosedDrug}
          setChoosedDrug={(data: any) => {
            //传出选中的列表
            setChoosedDrug(data);
          }}
          editType={2}
        />
      )}
      <div className='region-bottom'>
        <Jump
          index={8}
          isClick={
            judge === '否' || choosedList.length > 0 || choosedDrug.length > 0
          }
          nextText='完成'
          next={() => {
            perfectRecordStore.setHealthData({
              allergyHistory: judge === '否' ? '否' : choosedList.join(','),
              drugAllergy: judge === '否' ? '否' : choosedDrug.join(','),
            });
            saveHealth({
              step: 18,
              scoreCode: 'ALLERGY_HISTORY',
              allergyHistory: judge === '否' ? '否' : choosedList.join(','),
              drugAllergy: judge === '否' ? '否' : choosedDrug.join(','),
            }).then((res) => {
              setScore(res);
              setShowEndModal(true);
            });
          }}
          back={() => {
            setIndex(16);
          }}
          skip={() => {}}
        />
      </div>
      {show && (
        <Disease
          updateList={updateList}
          exsitList={drugList}
          close={() => {
            setShow(false);
          }}
          type={3}
        />
      )}
      {showEndModal ? (
        <div className='hra-modal flex'>
          <div className='hra-modal-content flex'>
            <div className='hra-modal-complete-tips'>
              完成HRA评估再加<span>10</span>星币！
            </div>
            <div className='hra-modal-img'>
              <div className='hra-modal-text'>恭喜您已经完成了健康档案！</div>
              <div className='hra-modal-score-text'>
                共获得星币奖励<span className='score'>+{score}</span>
              </div>
            </div>
            <div
              className='hra-modal-assess'
              onClick={() => {
                history.replace('/questionnaire/hra/start?code=BoRTUK');
              }}>
              去评估
            </div>
            <div
              className='hra-modal-close'
              onClick={() => {
                // @ts-ignore：无法被执行的代码的错误
                wx.miniProgram.navigateBack();
                history.goBack();
              }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default observer(Pace14);
