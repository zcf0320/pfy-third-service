import Page from '@components/Page';
import React, { useState, useEffect } from 'react';
import { useStores } from '@utils/useStore';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { observer } from 'mobx-react';
const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const HRAAnswer = () => {
  const questionnaireStore = useStores('questionnaireStore');
  const [questionIndex, setQuestionIndex] = useState(0);
  const history = useHistory();
  useEffect(() => {}, []);
  // 选择的答案
  const selectAnswer = (index: number) => {
    const { questions } = questionnaireStore.questionnaire[0];
    const arr = [103, 110, 107, 106];
    if (questions[questionIndex].answerType === 1) {
      questions[questionIndex].userAnswer =
        questions[questionIndex].answers[index].rightAnswer;
      questions[questionIndex].selectAnswerIndex = index;
      questions[questionIndex].isSelect = true;
      questions[questionIndex].answers.forEach((item: any) => {
        item.select = false;
      });
      questions[questionIndex].answers[index].select = true;
    }
    if (questions[questionIndex].answerType === 2) {
      questions[questionIndex].userAnswer =
        questions[questionIndex].answers[index].rightAnswer;
      questions[questionIndex].isSelect = true;
      questions[questionIndex].answers[index].select =
        !questions[questionIndex].answers[index].select;
      if (arr.includes(questions[questionIndex].questionId)) {
        if (
          index === questions[questionIndex].answers.length - 1 &&
          questions[questionIndex].answers[
            questions[questionIndex].answers.length - 1
          ].select === true
        ) {
          questions[questionIndex].answers.forEach((item: any) => {
            item.select = false;
          });
          questions[questionIndex].answers[
            questions[questionIndex].answers.length - 1
          ].select = true;
        } else {
          questions[questionIndex].answers[
            questions[questionIndex].answers.length - 1
          ].select = false;
        }
      }
    }
    questionnaireStore.setQuestionnaire(questionnaireStore.questionnaire);
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
  const pre = () => {
    if (!questionIndex) {
      return;
    }
    setQuestionIndex(questionIndex - 1);
  };
  const next = () => {
    if (!nextIsLight(questionIndex)) {
      return;
    }
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
      questionnaireStore.setSubInfo({
        answerReqs,
      });
      let params: any = questionnaireStore.subInfo;
      let code = getUrlParams('code');

      code && (params.code = code);
      for (let key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      questionnaireStore.addQuestionnaire(params).then((res: any) => {
        history.replace(
          `/questionnaire/hra/result?code=${getUrlParams('code')}&resultId=${
            res.resultId
          }`
        );
      });
      return;
    }
    setQuestionIndex(questionIndex + 1);
  };
  return (
    <Page title='HRA健康方式风险评估'>
      <div className='page-hra-answer flex'>
        <span className='hra-title'>HRA健康方式风险测试</span>
        <span className='hra-sub-title'>HRA HRALTHY WAY RISK TEST</span>
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
          {questionnaireStore.questionnaire.length && (
            <div className='action-item flex'>
              <div
                className={`action-pre ${!questionIndex ? 'disable' : ''}`}
                onClick={pre}>
                上一题
              </div>
              <div
                className={`action-next ${
                  nextIsLight(questionIndex) ? '' : 'disable'
                }`}
                onClick={next}>
                {questionIndex !==
                questionnaireStore.questionnaire[0].questions.length - 1
                  ? '下一题'
                  : '提交评估'}
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};
export default observer(HRAAnswer);
