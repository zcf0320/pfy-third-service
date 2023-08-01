/** @format */

import React, { useState, useEffect } from 'react';
import Page from '@components/Page';
import './index.scss';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { addQuestionnaire } from '@api/questionnaire';
import { Toast } from 'antd-mobile';
import i18n from '@i18n/index';
const answerType: any = {
  1: '单选',
  2: '多选',
  3: '填空',
};
function Answer() {
  const questionnaireStore = useStores('questionnaireStore');
  const history = useHistory();
  const { style, config, questionnaireList, code } =
    questionnaireStore.customConfig || {};
  const { postData } = questionnaireStore;
  const { name: title, backgroundSettings } = style || {};
  const { verifyNode, needVerify } = config || {};
  const id = getUrlParams('id');
  const [qIndex, setQindex] = useState(0);
  useEffect(() => {
    !style &&
      questionnaireStore.getCustomConfig({
        questionnaireId: id,
      });
  }, [id, questionnaireStore, style]);
  const answer = (index: number) => {
    if (questionnaireList[qIndex].isSure) {
      return;
    }
    let answerIds = questionnaireList[qIndex].answerIds || [];
    const { answerType, answers } = questionnaireList[qIndex];
    if (answerType === 1) {
      answerIds = [answers[index].answerId];
    }
    if (answerType === 2) {
      let inIndex = answerIds.indexOf(answers[index].answerId);
      if (inIndex > -1) {
        answerIds.splice(inIndex, 1);
      } else {
        answerIds.push(answers[index].answerId);
      }
    }
    questionnaireList[qIndex].answerIds = answerIds;
    questionnaireStore.setCustomConfig({ questionnaireList });
  };
  const answerText = (text: string) => {
    questionnaireList[qIndex].answerText = text;
    questionnaireStore.setCustomConfig({ questionnaireList });
  };
  const pre = () => {
    setQindex(qIndex - 1);
  };
  const next = () => {
    if (questionnaireList[qIndex].required) {
      if (
        questionnaireList[qIndex].answerType !== 3 &&
        questionnaireList[qIndex].answerIds &&
        questionnaireList[qIndex].answerIds.length
      ) {
        if (!questionnaireList[qIndex].isSure) {
          questionnaireList[qIndex].isSure = true;
          return;
        }
        if (qIndex === questionnaireList.length - 1) {
          save();
          return;
        }
        setQindex(qIndex + 1);
      }
      if (
        questionnaireList[qIndex].answerType === 3 &&
        questionnaireList[qIndex].answerText
      ) {
        if (!questionnaireList[qIndex].isSure) {
          questionnaireList[qIndex].isSure = true;
          return;
        }
        if (qIndex === questionnaireList.length - 1) {
          save();
          return;
        }
        setQindex(qIndex + 1);
      }
    } else {
      if (!questionnaireList[qIndex].isSure) {
        questionnaireList[qIndex].isSure = true;
        return;
      }
      if (qIndex === questionnaireList.length - 1) {
        save();
        return;
      }
      setQindex(qIndex + 1);
    }
  };
  const save = () => {
    if (localStorage.getItem('isview') === '1') {
      Toast.info('预览页面不可提交！');
      return;
    }
    let answerReqs: any = [];
    questionnaireList.forEach((item: any) => {
      answerReqs.push({
        answerIds: item.answerIds,
        questionId: item.questionId,
        answerText: item.answerText,
      });
    });
    let obj: any = {
      answerReqs,
      code,
      questionnaireId: getUrlParams('id'),
    };
    getUrlParams('channelId') && (obj.channelCode = getUrlParams('channelId'));
    addQuestionnaire(Object.assign({}, obj, postData)).then((res: any) => {
      const { resultId } = res;
      let url = `/questionnaire/custom/result?id=${id}&resultId=${resultId}`;
      if (needVerify && verifyNode === 0) {
        url = `/questionnaire/custom/mobile?id=${id}&resultId=${resultId}`;
      }
      history.replace(url);
    });
  };
  return (
    <Page title={title}>
      <div
        className='page-custom-answer flex'
        style={{ backgroundColor: backgroundSettings }}>
        <div className='start-title'>{title}</div>
        <div className='question'>
          <div className='q-index'>
            Q{qIndex + 1}
            <span>
              (
              {questionnaireList[qIndex].required
                ? i18n.chain.questionnaire.required
                : i18n.chain.questionnaire.notRequired}
              )
            </span>
            :
          </div>
          <span>
            ({answerType[questionnaireList[qIndex].answerType]})
            {questionnaireList && questionnaireList[qIndex].questionName}
          </span>
        </div>
        <div className='question-list'>
          {questionnaireList &&
            questionnaireList[qIndex].answerType !== 3 &&
            questionnaireList[qIndex].answers.map(
              (item: any, index: number) => {
                return (
                  <div
                    className={`question-item flex ${
                      questionnaireList &&
                      questionnaireList[qIndex].answerIds &&
                      questionnaireList[qIndex].answerIds.indexOf(
                        item.answerId
                      ) > -1
                        ? 'select'
                        : 'no-select'
                    }`}
                    key={item.answerId}
                    onClick={() => {
                      answer(index);
                    }}>
                    <div
                      className='item-left flex'
                      style={{ backgroundColor: backgroundSettings }}>
                      {String.fromCharCode(Number(65 + index))}
                    </div>
                    <div
                      className='item-text'
                      style={{ color: backgroundSettings }}>
                      {item.answerName}
                    </div>
                  </div>
                );
              }
            )}
          {questionnaireList && questionnaireList[qIndex].answerType === 3 && (
            <div>
              <textarea
                className='user-demands'
                value={questionnaireList[qIndex].answerText || ''}
                disabled={questionnaireList[qIndex].isSure}
                maxLength={300}
                placeholder={i18n.chain.questionnaire.enterAnswer}
                onChange={(e) => {
                  answerText(e.target.value);
                }}></textarea>
            </div>
          )}
          {/* 问卷提示 */}
          {questionnaireList[qIndex].tip && questionnaireList[qIndex].isSure ? (
            <div className='question-tip'>{questionnaireList[qIndex].tip}</div>
          ) : null}
        </div>
        <div className={`action-list flex ${qIndex ? '' : 'only'}`}>
          {qIndex ? (
            <div
              className='action-item flex'
              style={{ backgroundColor: backgroundSettings }}
              onClick={pre}>
              {i18n.chain.button.last}
            </div>
          ) : null}
          {questionnaireList[qIndex].isSure ? (
            <div className='action-item flex next' onClick={next}>
              {questionnaireList && qIndex !== questionnaireList.length - 1
                ? i18n.chain.button.next
                : i18n.chain.button.complete}
            </div>
          ) : (
            <div className='action-item flex next' onClick={next}>
              {i18n.chain.button.confirm}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
export default observer(Answer);
