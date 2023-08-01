import Page from '@components/Page';
import React from 'react';
import './index.scss';
const HPVResult = () => {
  return (
    <Page title='女性预防宫颈癌知识问卷'>
      <div className='page-hpv-result flex'>
        <div className='result-content flex'>
          <div className='bg'></div>
          <span>恭喜您完成问卷！</span>
        </div>
      </div>
    </Page>
  );
};
export default HPVResult;
