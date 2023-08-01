/** @format */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
const back = require('@assert/back.png');

const NavBar = (props: { title: string }) => {
  const [showBack, setShowBack] = useState(false);
  let history = useHistory();
  useEffect(() => {
    const { length } = history;
    length !== 1 && setShowBack(true);
  }, [history]);
  let { title = '' } = props;
  return (
    <div className='component-navbar flex'>
      {showBack && (
        <img
          src={back}
          alt=''
          className='back'
          onClick={() => {
            history.goBack();
            // @ts-ignore
            wx.miniProgram.navigateBack();
          }}
        />
      )}
      <span className='title'>{title}</span>
    </div>
  );
};
export default NavBar;
