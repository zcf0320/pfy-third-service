import React, { useState } from 'react';
import Page from '@components/Page';
import { useHistory } from 'react-router-dom';
import { userSecond } from '@api/zhInsurance';
import './index.scss';
import { getUrlParams } from '@utils/filter';

function UseConsultation() {
  const [showModal, setShowModal] = useState(false);
  const [userDemand, setUserDemand] = useState('');
  const history = useHistory();
  const save = () => {
    if (userDemand) {
      userSecond({
        userDemand,
        serviceRecordId: getUrlParams('serviceRecordId'),
      }).then(() => {
        setShowModal(true);
      });
    }
  };
  return (
    <Page title="用户诉求">
      <div className="page-use-consultation flex">
        <div className="top flex">
          告诉我们您的诉求，便于我们与专业的医生沟通您的病情
        </div>
        <textarea
          name=""
          id=""
          className="textarea"
          maxLength={1000}
          onChange={(e) => {
            setUserDemand(e.target.value);
          }}
          placeholder="请告诉我们您想解决的问题……"
        ></textarea>
        <div
          className={`save flex ${userDemand ? '' : 'disable'}`}
          onClick={save}
        >
          提交服务申请
        </div>
        {showModal ? (
          <div className="modal flex">
            <div className="modal-content flex">
              <div className="modal-top flex">
                <div className="modal-title">您的服务申请已提交</div>
                <div className="modal-text">
                  医生将在24小时内分析您的资料并在3个工作日内为您生成服务报告
                </div>
              </div>
              <div
                className="close"
                onClick={() => {
                  setShowModal(false);
                  history.goBack();
                }}
              ></div>
            </div>
          </div>
        ) : null}
      </div>
    </Page>
  );
}
export default UseConsultation;
