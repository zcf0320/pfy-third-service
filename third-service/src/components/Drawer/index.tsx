/* eslint-disable react/react-in-jsx-scope */

import React, { ReactNode } from 'react';
import './index.scss';

interface IProps {
  children: ReactNode;
  title: string;
  close: () => any;
}

const Drawer = (props: IProps) => {
  const { title } = props;
  return (
    <div className='drawer-overlay'>
      <div className='drawer'>
        <div className='drawer-header'>
          <div className='title'>{title}</div>
          <div className='icon_close' onClick={props.close}></div>
        </div>
        <div className='drawer-content'>{props.children}</div>
      </div>
    </div>
  );
};

export default Drawer;
