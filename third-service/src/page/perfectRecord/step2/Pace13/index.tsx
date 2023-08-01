/** @format */

import React, { useEffect, useState } from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import Jump from 'page/perfectRecord/component/Jump';
import { saveHealth, updateStep } from '@api/perfectRecord';

interface IProps {
  setIndex: (index: number, type?: boolean) => void;
}

function Pace13(props: IProps) {
  const perfectRecordStore = useStores('perfectRecordStore');
  const { setIndex } = props;
  const [liverFunction, setLiverFunction] = useState(''); //肝功能
  const [renalFunction, setRenalFunction] = useState(''); //肾功能

  useEffect(() => {
    let { liverFunction, renalFunction } = perfectRecordStore.healthData;
    liverFunction && setLiverFunction(liverFunction);
    renalFunction && setRenalFunction(renalFunction);
  }, [perfectRecordStore.healthData]);

  return (
    <div className='pace13'>
      <div className='record-cur'>您当前所处步骤:健康信息</div>
      <div className='record-title'>您的肝肾功能是否正常</div>
      <div className='function flex'>
        <div>肝功能</div>
        <div className='radio flex'>
          <div
            className={`circle normal ${liverFunction === '正常' && 'active'}`}
            onClick={() => {
              setLiverFunction('正常');
            }}>
            <div className={'type'}>正常</div>
          </div>
          <div
            className={`circle ${liverFunction === '异常' && 'active'}`}
            onClick={() => {
              setLiverFunction('异常');
            }}>
            <div className={'type'}>异常</div>
          </div>
        </div>
      </div>
      <div className='function flex' style={{ marginBottom: '200px' }}>
        <div>肾功能</div>
        <div className='radio flex'>
          <div
            className={`circle normal ${renalFunction === '正常' && 'active'}`}
            onClick={() => {
              setRenalFunction('正常');
            }}>
            <div className={'type'}>正常</div>
          </div>
          <div
            className={`circle ${renalFunction === '异常' && 'active'}`}
            onClick={() => {
              setRenalFunction('异常');
            }}>
            <div className={'type'}>异常</div>
          </div>
        </div>
      </div>
      <div className='region-bottom'>
        <Jump
          index={14}
          showSkip
          isClick={!!liverFunction && !!renalFunction}
          next={() => {
            perfectRecordStore.setHealthData({
              liverFunction,
              renalFunction,
            });
            saveHealth({
              step: 12,
              scoreCode: 'LIVER',
              liverFunction,
              renalFunction,
            }).then(() => {
              setIndex(12);
            });
          }}
          back={() => {
            setIndex(10);
          }}
          skip={() => {
            updateStep(12).then(() => {
              props.setIndex(12);
            });
          }}
        />
      </div>
    </div>
  );
}
export default observer(Pace13);
