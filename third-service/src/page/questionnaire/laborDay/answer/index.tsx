import Page from '@components/Page';
import React, { useState, useEffect } from 'react';
import { useStores } from '@utils/useStore';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { observer } from 'mobx-react';
const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const LaborAnswer = () => {
  const questionnaireStore = useStores('questionnaireStore');
  const [questionIndex, setQuestionIndex] = useState(0);
  const history = useHistory();
  useEffect(() => {}, []);
  // 选择的答案
  const selectAnswer = (index: number) => {
    const { questions } = questionnaireStore.questionnaire[0];
    questions[questionIndex].userAnswer =
      questions[questionIndex].answers[index].rightAnswer;
    questions[questionIndex].selectAnswerIndex = index;
    questions[questionIndex].isSelect = true;
    questions[questionIndex].answers.forEach((item: any) => {
      item.select = false;
    });
    questions[questionIndex].answers[index].select = true;
    questionnaireStore.setQuestionnaire(questionnaireStore.questionnaire);
    //下一题
    if (questionIndex === questions.length - 1) {
      return;
    }
    setQuestionIndex(questionIndex + 1);
  };
  //下一题是否高亮
  const nextIsLight = (questionIndex: any) => {
    const { questions } = questionnaireStore.questionnaire[0];
    let bol = questions[questionIndex].answers.some((item: any) => {
      if (item.select) {
        return true;
      } else {
        return false;
      }
    });
    return bol;
  };
  const prev = () => {
    setQuestionIndex(questionIndex - 1);
  };
  const submit = () => {
    if (!nextIsLight(questionIndex)) {
      return;
    }
    const { questions } = questionnaireStore.questionnaire[0];
    if (questionIndex === questions.length - 1) {
      let answerReqs: any = [];
      questionnaireStore.questionnaire.forEach((qItem: any) => {
        qItem.questions.forEach((item: any) => {
          let result: any = {
            questionId: item.questionId,
            answerIds: [],
          };
          item.answers.forEach((AItem: any) => {
            AItem.select && result.answerIds.push(AItem.answerId);
          });
          answerReqs.push(result);
        });
      });
      questionnaireStore.setSubInfo({
        answerReqs,
      });
      let params: any = questionnaireStore.subInfo;
      let code = getUrlParams('code');
      let channelId = getUrlParams('channelId');

      code && (params.code = code);
      for (let key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      let serviceRecordId = getUrlParams('serviceRecordId');
      serviceRecordId && (params.serviceRecordId = serviceRecordId);
      channelId && (params.channelCode = channelId);
      questionnaireStore.addQuestionnaire(params).then((res: any) => {
        history.replace(
          `/questionnaire/laborDay/result?code=${getUrlParams(
            'code'
          )}&resultId=${res.resultId}`
        );
      });
      return;
    }
  };
  return (
    <Page title='劳动人民健康问卷'>
      <div className='page-labor-answer flex'>
        <span className='hra-title'>劳动人民健康测试</span>
        <span className='hra-sub-title'>WORKING PEOPLE HEALTH TEST</span>
        <div className='dot-list flex'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        <div className='hra-content flex'>
          <div className='question-item flex'>
            <div className='question'>
              <div className='question-index'>Q{questionIndex + 1}:</div>
              {questionnaireStore.questionnaire.length
                ? questionnaireStore.questionnaire[0].questions[questionIndex]
                    .questionName
                : null}
            </div>
            <div className='answer-list flex'>
              {questionnaireStore.questionnaire.length
                ? questionnaireStore.questionnaire[0].questions[
                    questionIndex
                  ].answers.map((item: any, index: number) => {
                    return (
                      <div
                        className={`answer-item ${
                          item.select ? 'active' : ''
                        } flex`}
                        key={item.answerId}
                        onClick={() => {
                          selectAnswer(index);
                        }}>
                        <span className='letter'>{letter[index]}</span>
                        <div className='answer-text'>{item.answerName}</div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
        {questionIndex !== 0 && (
          <div className='action-item flex'>
            <div
              className={
                questionIndex ===
                questionnaireStore.questionnaire[0].questions.length - 1
                  ? 'action-pre'
                  : 'action-pre-l'
              }
              onClick={prev}>
              上一题
            </div>
            {questionIndex ===
              questionnaireStore.questionnaire[0].questions.length - 1 && (
              <div
                className={`action-submit ${
                  nextIsLight(questionIndex) ? '' : 'disable'
                }`}
                onClick={submit}>
                获取测试结果
              </div>
            )}
          </div>
        )}
        <div className='labor-bottom'></div>
      </div>
    </Page>
  );
};

export default observer(LaborAnswer);
