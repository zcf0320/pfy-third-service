/** @format */

import React, { useEffect, useState } from 'react';
import Page from '@components/Page';
import './index.scss';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { isDeleteLegal } from '@api/questionnaire';
import i18n from '@i18n/index';
function Start() {
  const questionnaireStore = useStores('questionnaireStore');
  const [bg, setBg] = useState({});
  const history = useHistory();
  const id = getUrlParams('id');
  const channelId = getUrlParams('channelId');
  const [isAjax, setIsAjax] = useState(false);
  const [isLegal, setIsLegal] = useState(true);
  localStorage.setItem('isview', getUrlParams('isview'));
  useEffect(() => {
    let params: any = {
      questionnaireId: id,
    };
    channelId && (params.channelCode = channelId);
    isDeleteLegal(params).then((res: any) => {
      setIsLegal(res);
      setIsAjax(true);
    });
  }, [channelId, id]);
  useEffect(() => {
    questionnaireStore
      .getCustomConfig({
        questionnaireId: id,
      })
      .then((res: any) => {
        console.log('res', res);
        const { style } = questionnaireStore.customConfig;
        const { coverSelect, coverSettings } = style || {};
        let bg: any = {};
        if (coverSelect) {
          bg.backgroundImage = `url(${coverSettings})`;
        } else {
          bg.background = coverSettings;
          // bg = coverSettings
        }
        setBg(bg);
      });
  }, [id, questionnaireStore]);
  const { style, config } = questionnaireStore.customConfig;
  const { name, secondName, buttonText } = style || {};
  const { needVerify, verifyNode, isCollectPersonalInfo } = config || {};
  return (
    <Page title={name}>
      {isAjax && isLegal ? (
        <div className='page-custom-start flex' style={bg}>
          <div className='start-title'>{name}</div>
          {secondName ? <div className='sub-title'>{secondName}</div> : null}
          <div
            className='start flex'
            onClick={() => {
              let url = `/questionnaire/custom/answer?id=${id}&channelId=${
                getUrlParams('channelId') || ''
              }`;
              if (isCollectPersonalInfo) {
                url = `/questionnaire/custom/info?id=${id}&channelId=${
                  getUrlParams('channelId') || ''
                }`;
              }
              if (needVerify && verifyNode === 1) {
                url = `/questionnaire/custom/mobile?id=${id}&channelId=${
                  getUrlParams('channelId') || ''
                }`;
              }

              history.push(url);
            }}>
            {buttonText}
          </div>
        </div>
      ) : (
        <div className='none flex'>
          <div className='none-content flex'>
            <div className='none-bg'></div>
            <span>{i18n.chain.questionnaire.interestExpired}</span>
          </div>
        </div>
      )}
    </Page>
  );
}
export default observer(Start);
