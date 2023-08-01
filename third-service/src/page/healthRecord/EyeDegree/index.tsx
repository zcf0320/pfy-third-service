import React, { useState } from 'react';
import YesAndNo from '../YesAndNo';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const EyeDegree = () => {
  const HealthRecordStore = useStores('HealthRecordStore');
  const [showEyeDegree, setShowEyeDegree] = useState<boolean | string>('');
  // const {} = HealthRecordStore.healthyFile;
  const yes = () => {
    HealthRecordStore.delHealthyFile('leftEyeDegree');
    HealthRecordStore.delHealthyFile('rightEyeDegree');
    setShowEyeDegree(true);
  };
  const no = () => {
    HealthRecordStore.setHealthyFile({ leftEyeDegree: '', rightEyeDegree: '' });
    setShowEyeDegree(false);
  };
  // useEffect(() => {}, []);
  return (
    <div className='component-eye-degree flex'>
      <YesAndNo
        title='孩子是否戴眼镜'
        value={showEyeDegree}
        yes={yes}
        no={no}></YesAndNo>
      {showEyeDegree ? (
        <div className='eyes'>
          <div className='label'>请选择您的眼镜度数</div>
          <div className='eye-list flex'>
            <div className='item flex'>
              <div className='item-label'>左眼</div>
              <input
                className='input'
                type='number'
                placeholder='请输入左眼度数'
                onChange={(e) => {
                  HealthRecordStore.setHealthyFile({
                    leftEyeDegree: e.target.value,
                  });
                }}></input>
            </div>
            <div className='item flex'>
              <div className='item-label'>右眼</div>
              <input
                className='input'
                type='number'
                placeholder='请输入右眼度数'
                onChange={(e) => {
                  HealthRecordStore.setHealthyFile({
                    rightEyeDegree: e.target.value,
                  });
                }}></input>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default observer(EyeDegree);
