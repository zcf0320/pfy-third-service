import React from 'react';
import { useHistory } from 'react-router-dom';
import { timeFormat } from '@utils/filter';
import './index.scss';
interface IProps {
  recordDetail: {
    itemName: string;
    address: string;
    reserveTime: number;
    state: number;
    reserveId: string;
    reportId: string;
    serviceRecordId: number;
    commentId: string;
    serviceId: string;
    pageCode: string;
    comment: string;
    serviceInfoId: string;
  };
}
const RecordItem = (props: IProps) => {
  const history = useHistory();
  const getStatus = (status: number): string => {
    let span = '预约成功';
    status === 1 && (span = '待确认');
    status === 2 && (span = '预约失败');
    return span;
  };
  const goDetail = () => {
    const { reserveId } = props.recordDetail;
    history.push(`/zh/detail?id=${reserveId}`);
  };
  // 再次预约
  const again = () => {
    const { serviceInfoId, itemName, serviceRecordId, pageCode } =
      props.recordDetail;
    history.replace(
      `/zh/appointment?id=${serviceRecordId}&name=${itemName}&serviceInfoId=${serviceInfoId}&pageCode=${pageCode}`
    );
  };
  const { state, itemName, address, reserveTime, comment } =
    props.recordDetail || {};

  // 判断重疾绿通 不需要上传报告
  return (
    <div className="item">
      <div className="component-record-item">
        <div className="item-content">
          <div className="title flex">
            <span>{itemName}</span>
            <span className={`status ${state}`}>{getStatus(state)}</span>
          </div>
          <div className="content flex">
            <span>预约网点：{address}</span>
            <span className="time">
              预约时间：{timeFormat(reserveTime, 'y/m/d h:m')}
            </span>
            <span className="reason">
              <span>
                {state === 1 ? '工作人员将会尽快与您联系，请耐心等待' : ''}
              </span>
              <span>{state === 2 ? `失败原因：${comment}` : ''}</span>
            </span>
            <div className="actions flex">
              {!state ? (
                <div className="flex">
                  <div className="action-item evidence" onClick={goDetail}>
                    预约凭证
                  </div>
                </div>
              ) : state === 2 ? (
                <div className="action-item" onClick={again}>
                  再次预约
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecordItem;
