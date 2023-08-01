import React from 'react';
import './index.scss';

type IProps = {
  step: Number;
};

const Header = (props: IProps) => {
  let { step } = props;
  return (
    <div className="header-step">
      <div className={`step-img step-${step}`}></div>
    </div>
  );
};

export default Header;
