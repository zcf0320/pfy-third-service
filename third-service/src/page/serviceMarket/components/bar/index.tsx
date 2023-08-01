import React from 'react';
import './index.scss';
interface IProps {
  percent: number;
  title: string;
  score: number;
}
const Bar = (props: IProps) => {
  const { percent, title, score } = props;
  return (
    <div className="bar">
      <div className="bar-title">
        {title}：{score}
      </div>
      <div className="bar-out">
        <div className="bar-inner" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};
export default Bar;
