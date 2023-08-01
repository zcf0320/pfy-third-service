import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import Page from '@components/Page';
import { getUrlParams } from '@utils/filter';
function PhoneIndex() {
  const history = useHistory();
  return (
    <Page title="电话问诊">
      <div className="page-phone-index flex">
        <div className="phone-index">
          <div className="phone-image"></div>
        </div>
        <div
          className="phone-bottom flex"
          onClick={() => {
            history.push(
              `/zh/phone?serviceRecordId=${getUrlParams('serviceRecordId')}`
            );
          }}
        >
          我已知悉，开始问诊
        </div>
      </div>
    </Page>
  );
}
export default PhoneIndex;
