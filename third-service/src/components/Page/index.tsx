/** @format */

import React from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import NavBar from '@components/NewNavBar';
import { toJS } from 'mobx';
import CustomModal from '@components/CustomModal';

const Page = (props: { title: string; children: any }) => {
  let { title = '' } = props;
  const commonStore = useStores('commonStore');

  return (
    <div className='page-component'>
      {toJS(commonStore).env !== 'weapp' && <NavBar title={title} />}
      <CustomModal></CustomModal>
      <div className='page-scroll-content'>{props.children}</div>
    </div>
  );
};
export default Page;
