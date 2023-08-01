import React from 'react';
import './index.scss';
import { observer } from 'mobx-react';

interface IProps {
  detail: any;
}
const Rate = (props: IProps) => {
  return (
    <div className="rate">
      <div className="rate-pic">
        <div className="rate-box flex">
          企业信用评分：
          {props.detail.creditInfo && props.detail.creditInfo.totalScore}
          <div className="rate-box-s">
            {props.detail.creditInfo && props.detail.creditInfo.grade}
          </div>
        </div>
      </div>
      <div className="rate-card">
        <div className="rate-card-box flex">
          <div className="rate-card-box-name">企业名称：</div>
          <div className="rate-card-box-content">
            {props.detail.creditInfo && props.detail.creditInfo.name}
          </div>
        </div>
        <div className="rate-card-box flex">
          <div className="rate-card-box-name">所在地：</div>
          <div className="rate-card-box-content">
            {props.detail.creditInfo && props.detail.creditInfo.address}
          </div>
        </div>
        <div className="rate-card-box flex">
          <div className="rate-card-box-name">企业网址：</div>
          <div className="rate-card-box-content blue">
            {props.detail.creditInfo && props.detail.creditInfo.internetAddress}
          </div>
        </div>
      </div>
    </div>
  );
};
export default observer(Rate);
