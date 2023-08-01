/** @format */

import React, { useEffect, useState } from 'react';
import Page from '@components/Page';
import './index.scss';
import { useStores } from '@utils/useStore';
import { getQuestionnaireResult, commitAfterMobile } from '@api/questionnaire';
import { getUrlParams, checkPhone } from '@utils/filter';
import { observer } from 'mobx-react';
import { Toast } from 'antd-mobile';
import i18n from '@i18n/index';
function Result() {
  const questionnaireStore = useStores('questionnaireStore');
  const id = getUrlParams('id');
  const [data, setData] = useState({
    score: '',
    content: '',
    conclusionId: '',
  });
  const [mobile, setMobile] = useState('');
  const { style, config } = questionnaireStore.customConfig || {};
  const { resultPageSettings, name, backgroundSettings } = style || {};
  useEffect(() => {
    !style &&
      questionnaireStore.getCustomConfig({
        questionnaireId: id,
      });
  }, [id, questionnaireStore, style]);
  useEffect(() => {
    getQuestionnaireResult({
      resultId: getUrlParams('resultId'),
    }).then((res: any) => {
      setData(res);
    });
  }, []);
  const submitPhone = () => {
    if (!checkPhone(mobile)) {
      Toast.info(i18n.chain.questionnaire.enterCorrectPhoneNumber, 3);
      return;
    }
    let obj: any = {
      score: data.score,
      conclusionId: data.conclusionId,
      questionnaireId: getUrlParams('id'),
      mobile,
    };
    commitAfterMobile(obj).then(() => {
      Toast.info('提交成功！', 3);
    });
  };
  const { needVerify, verifyNode } = config || {};
  return (
    <Page title={name}>
      <div
        className='page-custom-result flex'
        style={{ backgroundColor: resultPageSettings }}>
        <div className='result-content flex'>
          <div className='result-title'>
            {i18n.chain.questionnaire.healthScore}
            <span className='score' style={{ color: resultPageSettings }}>
              {data.score || ''}
            </span>
          </div>
          <div className='text'>{data.content}</div>
        </div>
        {needVerify && verifyNode === 2 ? (
          <div className='phone-submit'>
            <div className='phone-submit-title'>
              {i18n.chain.questionnaire.submitTitle}
            </div>
            <div className='phone-submit-phone'>
              <span className='phone-submit-phone-l'>
                {i18n.chain.questionnaire.phoneNumber}:
              </span>
              <input
                type='text'
                className='phone-submit-phone-r'
                placeholder={i18n.chain.questionnaire.enterPhoneNumber}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </div>
            <div
              style={{ backgroundColor: backgroundSettings }}
              className={`${mobile ? '' : 'disable'} phone-submit-btn`}
              onClick={submitPhone}>
              {i18n.chain.button.submit}
            </div>
          </div>
        ) : null}
      </div>
    </Page>
  );
}
export default observer(Result);
