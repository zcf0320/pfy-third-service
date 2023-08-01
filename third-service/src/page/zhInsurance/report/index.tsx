import React, { useState, useEffect } from 'react';
import Page from '@components/Page';
import './index.scss';
import { userCenterUrl } from '@utils/appConfig';
import { getReport } from '@api/zhInsurance';
import { getUrlParams } from '@utils/filter';
import PreviewImage from '@components/PreviewImage';
function Report() {
  const [url, setUrl] = useState('');
  const [isAjax, setIsAjax] = useState(false);
  const [showPre, setShowPre] = useState(false);
  useEffect(() => {
    getReport({
      serviceRecordId: getUrlParams('serviceRecordId'),
    }).then((res: string) => {
      setUrl(res);
      setIsAjax(true);
    });
  }, []);
  return (
    <Page title='服务报告'>
      {isAjax ? (
        <div className='page'>
          {url ? (
            <div className='page-report flex'>
              <div className='report-content flex'>
                <div className='content-top flex'>
                  <div className='mouth-title-border'>
                    <span className='mouth-title-text'>您的服务报告已生成</span>
                  </div>
                  <img
                    alt=''
                    className='mouth-docter'
                    src={`${userCenterUrl}mouth-docter.png`}></img>
                  <img alt='' src={url} className='report' />
                </div>
                <div
                  onClick={() => {
                    setShowPre(true);
                  }}>
                  -点击预览-
                </div>
              </div>
            </div>
          ) : (
            <div className='page-empty flex'>
              <div className='empty-icon'></div>
              <div className='empty-title'>您的服务申请已提交</div>
              <div className='empty-text'>
                医生将在3个工作日内为您生成服务报告
              </div>
            </div>
          )}
        </div>
      ) : null}
      {showPre ? (
        <PreviewImage
          imgList={[url]}
          close={() => {
            setShowPre(false);
          }}></PreviewImage>
      ) : null}
    </Page>
  );
}
export default Report;
