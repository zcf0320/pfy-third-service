import React from 'react';
import { observer } from 'mobx-react';
import './index.scss';
import Bar from '../bar';

interface IProps {
  detail: any;
}
const Process = (props: IProps) => {
  return (
    <div className="process">
      <Bar
        percent={
          props.detail.creditInfo &&
          props.detail.creditInfo.socialEvaluation.score
        }
        title={'社会评价'}
        score={
          props.detail.creditInfo &&
          props.detail.creditInfo.socialEvaluation.score
        }
      />
      <div className="process-content">
        {props.detail.creditInfo &&
          props.detail.creditInfo.socialEvaluation.remark}
      </div>
      <Bar
        percent={props.detail.creditInfo && props.detail.creditInfo.risk.score}
        title={'工商风险'}
        score={props.detail.creditInfo && props.detail.creditInfo.risk.score}
      />
      <div className="process-content">
        {props.detail.creditInfo && props.detail.creditInfo.risk.remark}
      </div>
      <Bar
        percent={
          props.detail.creditInfo && props.detail.creditInfo.dispute.score
        }
        title={'诉讼纠纷'}
        score={props.detail.creditInfo && props.detail.creditInfo.dispute.score}
      />
      <div className="process-content">
        {props.detail.creditInfo && props.detail.creditInfo.dispute.remark}
      </div>
      <Bar
        percent={
          props.detail.creditInfo && props.detail.creditInfo.coverage.score
        }
        title={'覆盖范围'}
        score={
          props.detail.creditInfo && props.detail.creditInfo.coverage.score
        }
      />
      <div className="process-content">
        {props.detail.creditInfo && props.detail.creditInfo.coverage.remark}
      </div>
      <Bar
        percent={props.detail.creditInfo && props.detail.creditInfo.size.score}
        title={'企业规模'}
        score={props.detail.creditInfo && props.detail.creditInfo.size.score}
      />
      <div className="process-content">
        {props.detail.creditInfo && props.detail.creditInfo.size.remark}
      </div>
      <Bar
        percent={
          props.detail.creditInfo && props.detail.creditInfo.comment.score
        }
        title={'服务评价'}
        score={props.detail.creditInfo && props.detail.creditInfo.comment.score}
      />
      <div className="process-content">
        {props.detail.creditInfo && props.detail.creditInfo.comment.remark}
      </div>
    </div>
  );
};
export default observer(Process);
