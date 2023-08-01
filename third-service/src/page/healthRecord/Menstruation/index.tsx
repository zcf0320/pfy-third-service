import React from 'react';
import YesAndNo from '../YesAndNo';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';
const Menstruation = () => {
  const HealthRecordStore = useStores('HealthRecordStore');
  const { menstruation } = HealthRecordStore.healthyFile;
  const yes = () => {
    HealthRecordStore.setHealthyFile({ menstruation: true });
  };
  const no = () => {
    HealthRecordStore.setHealthyFile({ menstruation: false });
  };
  return (
    <div className="component-menstruation flex">
      <YesAndNo
        title="您是否来月经"
        value={menstruation}
        yes={yes}
        no={no}
      ></YesAndNo>
    </div>
  );
};
export default observer(Menstruation);
