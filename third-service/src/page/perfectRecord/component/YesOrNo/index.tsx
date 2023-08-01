import React from 'react';
import './index.scss';
interface IProps {
  choosed: string;
  setChoosed: Function;
}
function YesOrNo(props: IProps) {
  const { choosed, setChoosed } = props;
  return (
    <div className="yes-or-no flex">
      <div
        className={`circle ${choosed === '是' ? 'active' : null}`}
        onClick={() => {
          setChoosed('是');
        }}
      >
        <div className="inner">Y</div>
      </div>
      <div
        className={`circle ${choosed === '否' ? 'active' : null}`}
        onClick={() => {
          setChoosed('否');
        }}
      >
        <div className="inner">N</div>
      </div>
    </div>
  );
}
export default YesOrNo;
