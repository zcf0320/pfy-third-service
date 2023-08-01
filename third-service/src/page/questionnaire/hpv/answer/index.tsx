import Page from '@components/Page';
import { useStores } from '@utils/useStore';
import React, { useState, useEffect } from 'react';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { observer } from 'mobx-react';
const HPVResult = () => {
  const questionnaireStore = useStores('questionnaireStore');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const history = useHistory();
  useEffect(() => {
    let code = getUrlParams('code');
    // 获取答题信息
    questionnaireStore
      .getQuestionnaire({
        code,
      })
      .then((res: any) => {
        console.log(res.questionnaire);
        questionnaireStore.setQuestionnaire(res.questionnaire);
      });
  }, [questionnaireStore]);
  // 选择的答案
  const selectAnswer = (index: number) => {
    const { questions } = questionnaireStore.questionnaire[0];
    if (questions[questionIndex].userAnswer !== undefined) {
      return;
    }
    questions[questionIndex].userAnswer =
      questions[questionIndex].answers[index].rightAnswer;
    questions[questionIndex].selectAnswerIndex = index;
    setUserAnswer(questions[questionIndex].answers[index].rightAnswer);
    questions[questionIndex].answers[index].select = true;
    questionnaireStore.setQuestionnaire(questionnaireStore.questionnaire);
    setTimeout(() => {
      setUserAnswer('');
    }, 1000);
  };
  const pre = () => {
    setQuestionIndex(questionIndex - 1);
  };
  const next = () => {
    const { questions } = questionnaireStore.questionnaire[0];
    if (questions[questionIndex].userAnswer === '') {
      return;
    }
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

      let params: any = {
        answerReqs,
      };
      let code = getUrlParams('code');
      let channelId = getUrlParams('channelId');
      let serviceRecordId = getUrlParams('serviceRecordId');

      code && (params.code = code);
      channelId && (params.channelCode = channelId);
      serviceRecordId && (params.serviceRecordId = serviceRecordId);
      questionnaireStore.addQuestionnaire(params).then(() => {
        history.replace('/questionnaire/hpv/result');
      });
      return;
    }
    setQuestionIndex(questionIndex + 1);
  };
  console.log(questionnaireStore.questionnaire);
  return (
    <Page title='女性预防宫颈癌知识问卷'>
      {userAnswer !== '' ? (
        <div className='modal'>
          <div className='modal-content flex'>
            <span>回答{userAnswer ? '正确' : '错误'}</span>
            <div className={`yes ${userAnswer ? '' : 'no'}`}></div>
          </div>
        </div>
      ) : null}
      <div className='page-hpv-answer flex'>
        <span className='hpv-title'>女性预防宫颈癌测试</span>
        <span className='hpv-sub-title'>
          PREVEVTION OF CERVICAL CANCER TEST
        </span>
        <div className='dot-list flex'>
          <div className='dot-content flex'>
            {questionnaireStore.questionnaire.length
              ? questionnaireStore.questionnaire[0].questions.map(
                  (item: any) => {
                    return (
                      <div
                        className={`dot ${
                          item.userAnswer !== undefined ? 'selected' : ''
                        } ${item.userAnswer === false ? 'no' : ''}`}
                        key={item.questionId}></div>
                    );
                  }
                )
              : null}
            {/* <div className="dot selected no"></div> */}
          </div>
        </div>
        <div className='question-item flex'>
          <div className='question'>
            <div className='question-index'>Q{questionIndex + 1}:</div>
            {questionnaireStore.questionnaire.length ? (
              <div className='question-name'>
                {
                  questionnaireStore.questionnaire[0].questions[questionIndex]
                    .questionName
                }
              </div>
            ) : null}
          </div>
          <div className='answer-list flex'>
            {questionnaireStore.questionnaire.length
              ? questionnaireStore.questionnaire[0].questions[
                  questionIndex
                ].answers.map((item: any, index: number) => {
                  return (
                    <div
                      className={`answer-item flex ${
                        questionnaireStore.questionnaire[0].questions[
                          questionIndex
                        ].userAnswer !== undefined
                          ? questionnaireStore.questionnaire[0].questions[
                              questionIndex
                            ].userAnswer === item.rightAnswer
                            ? ''
                            : 'no-select'
                          : ''
                      }`}
                      key={item.answerID}
                      onClick={() => {
                        selectAnswer(index);
                      }}>
                      <span>{item.answerName}</span>
                      {item.select ? (
                        <div
                          className={`answer-yes ${
                            item.rightAnswer ? '' : 'answer-no'
                          }`}></div>
                      ) : null}
                    </div>
                  );
                })
              : null}
          </div>
          {questionnaireStore.questionnaire.length &&
          questionnaireStore.questionnaire[0].questions[questionIndex]
            .userAnswer !== undefined ? (
            <div className='knowledge flex'>
              <div className='knowledge-title'>健康知识</div>
              <div className='knowledge-text'>
                {
                  questionnaireStore.questionnaire[0].questions[questionIndex]
                    .tips
                }
              </div>
            </div>
          ) : null}
        </div>
        {questionnaireStore.questionnaire.length &&
        questionnaireStore.questionnaire[0].questions[questionIndex]
          .userAnswer !== undefined &&
        userAnswer === '' ? (
          <div className='action-list flex'>
            {questionIndex ? (
              <div className='action-item flex pre' onClick={pre}>
                上一题
              </div>
            ) : null}
            {questionnaireStore.questionnaire.length ? (
              <div
                className={`action-item flex ${!questionIndex ? 'only' : ''}`}
                onClick={next}>
                {questionIndex !==
                questionnaireStore.questionnaire[0].questions.length - 1
                  ? '下一题'
                  : '完成'}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Page>
  );
};
export default observer(HPVResult);
