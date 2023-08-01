import React from 'react';
import './index.scss';
interface IProps {
  title?: string;
  yes?: () => void;
  no?: () => void;
  value?: boolean | string;
}
const YesAndNo = (props: IProps) => {
  const { title, value = '' } = props;
  return (
    <div className="component-yes-no flex">
      <div className="component-title">{title}</div>
      <div className="select-list flex">
        <div
          className={`select-item flex ${value === true ? 'active' : ''}`}
          onClick={() => {
            if (!value) {
              props.yes && props.yes();
            }
          }}
        >
          Y
        </div>
        <div
          className={`select-item flex ${value === false ? 'active' : ''}`}
          onClick={() => {
            if (value === true || value === '') {
              props.no && props.no();
            }
          }}
        >
          N
        </div>
      </div>
    </div>
  );
};
export default YesAndNo;
