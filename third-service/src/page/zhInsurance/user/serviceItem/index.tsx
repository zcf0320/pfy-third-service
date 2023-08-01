/** @format */

import React, { useState } from 'react';
import { timeFormat } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { codeMap } from '@utils/filter';
import './index.scss';
import { Toast } from 'antd-mobile';
import { userCenterUrl } from '@utils/appConfig';
interface IProps {
  data: any;
}
const ServiceItem = (props: IProps) => {
  const history = useHistory();
  const {
    usedIds,
    effectiveDate,
    expirationDate,
    needCheck,
    failReason,
    serviceInfoName,
    usedServiceRecordId,
    status,
    serviceRecordIds,
    serviceInfoId,
    pageCode,
  } = props.data;
  const [show, setShow] = useState(false);
  const getStatus = () => {
    let tagText = '已使用';
    let text = '查看详情';
    if (status === 0) {
      tagText = '未使用';
      needCheck === 5 && (tagText = '审核失败');
    }
    // status === 0 && (tagText = '未使用')
    status === 1 && (tagText = '已使用');
    status === 2 && (tagText = '已过期');
    if (status === 0) {
      text = '立即使用';
      needCheck === 5 && (text = '重新提交');
    }
    status === 1 && (text = '查看详情');
    status === 2 && (text = '查看详情');
    return {
      tagText,
      text,
    };
  };
  const goDetail = () => {
    const type = codeMap[pageCode];
    let time = new Date().getTime();
    if (effectiveDate > time) {
      Toast.info(
        `等待期${timeFormat(effectiveDate, 'y-m-d')}前，服务无法使用`,
        3
      );
      return;
    }
    if (expirationDate < time) {
      Toast.info(
        `该服务已于${timeFormat(expirationDate, 'y-m-d')}过期，无法使用`,
        3
      );
      return;
    }
    if (status === 0) {
      if (type === 6 || type === 26) {
        history.push(
          `/zh/appointment?id=${serviceRecordIds[0]}&name=${serviceInfoName}&serviceInfoId=${serviceInfoId}&pageCode=${pageCode}`
        );
      }
      if (type === 14) {
        history.push(`/zh/phoneIndex?serviceRecordId=${serviceRecordIds[0]}`);
      }
      if (type === 17) {
        let url = `/zh/consultation?serviceRecordId=${serviceRecordIds[0]}`;
        needCheck === 3 &&
          (url = `/zh/examine?serviceRecordId=${serviceRecordIds[0]}&state=1`);
        needCheck === 4 &&
          (url = `/zh/examine?serviceRecordId=${serviceRecordIds[0]}&state=2`);
        // needCheck === 5 && (url = `/zh/examine?serviceRecordId=${serviceRecordIds[0]}&state=3`)
        history.push(url);
      }
    } else if (status === 1) {
      if (type === 14) {
        history.push('/zh/phoneDetail');
      }
      if (type === 17) {
        history.push(`/zh/report?serviceRecordId=${usedServiceRecordId}`);
      }
      if (type === 6 || type === 26) {
        history.push(`/zh/detail?id=${usedIds[0]}`);
      }
    } else if (status === 2) {
      Toast.info('已过期，无法使用', 3);
    } else {
      if (type === 6) {
        history.push(`/zh/record?serviceRecordId=${usedServiceRecordId}`);
      }
    }
  };
  return (
    <div className='user-service-list'>
      <div
        className={`service-item flex ${
          status !== 2 && status !== 0 ? 'active' : ''
        }  ${status === 1 && needCheck === 3 ? 'checking' : ''} ${
          status === 2 ? 'disable' : ''
        }`}
        onClick={goDetail}>
        <div className='left'>
          <div className='left-top flex'>
            <div className='title'>{serviceInfoName}</div>
            <div
              className={`tag flex tag-${status} need-check-${needCheck}`}></div>
          </div>
          <div className='left-bottom'>
            有效期日期：{timeFormat(effectiveDate, 'y.m.d')}-
            {timeFormat(expirationDate, 'y.m.d')}
          </div>
        </div>
        <div className='right flex'>{getStatus().text}</div>
      </div>
      {failReason && needCheck === 5 ? (
        <div className='service-reason'>
          <div className='reason-top flex'>
            <div className='top-left'>失败原因</div>
            <div
              className='top-right flex'
              onClick={() => {
                setShow(!show);
              }}>
              <span>{show ? '收起' : '展开'}</span>
              <img
                alt=''
                src={`${userCenterUrl}/top_icon.png`}
                className={`top-icon ${show ? '' : 'hide'}`}></img>
            </div>
          </div>
          {show ? <div className='reason'>{failReason}</div> : null}
        </div>
      ) : null}
    </div>
  );
};
export default ServiceItem;
