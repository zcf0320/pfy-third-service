/**
 *
 * @format
 * @Author: Safi.Sun
 * @Date: 2022-03-07 10:33:34
 * @Last Modified by: Safi.Sun
 * @Last Modified time: 2022-03-07 14:34:05
 */

import Page from '@components/Page';
import React, { useState, useEffect } from 'react';
import { InputItem } from 'antd-mobile';
import {
  getAlzheimerQuestionnaire,
  addQuestionnaire,
} from '@api/questionnaire';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import './index.scss';

const AlzheimerAnswer = () => {
  const [questions, setQuestions] = useState([] as any);
  const [questionIndex, setQuestionIndex] = useState(0);
  const history = useHistory();
  const code = getUrlParams('code');
  const serviceRecordId = getUrlParams('serviceRecordId');
  useEffect(() => {
    getAlzheimerQuestionnaire(code).then((res: any) => {
      setQuestions(res);
    });
  }, [code]);
  // 选择的答案
  const selectAnswer = (index: number) => {
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
    }
    setQuestions([...questions]);
  };
  const answerText = (text: string) => {
    questions[questionIndex].answerText = text;
    setQuestions([...questions]);
  };
  //下一题是否高亮
  const nextIsLight = (questionIndex: any) => {
    // const { questions } = questions[0];
    let bool = false;
    if (questions[questionIndex].answerType !== 3) {
      bool = questions[questionIndex].answers.some((item: any) => {
        if (item.select) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      if (questions[questionIndex].answerText) {
        bool = true;
      } else {
        bool = false;
      }
    }

    return bool;
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
    // const { questions } = questions[0];
    if (questions[questionIndex].userAnswer === '') {
      return;
    }
    if (questionIndex === questions.length - 1) {
      let answers: any = [];
      questions.forEach((qItem: any) => {
        let result: any = {
          questionId: qItem.questionId,
          answerText: '',
          answerIds: [],
        };
        if (qItem.answerType !== 3) {
          qItem.answers.forEach((AItem: any) => {
            AItem.select && result.answerIds.push(AItem.answerId);
          });
          answers.push(result);
        } else {
          result.answerText = qItem.answerText;
          answers.push(result);
        }
      });
      addQuestionnaire({
        serviceRecordId,
        code: code,
        answerReqs: answers,
      }).then((res: any) => {
        history.replace(
          `/questionnaire/alzheimer/result?code=${code}&resultId=${res.resultId}&serviceRecordId=${serviceRecordId}`
        );
      });
      return;
    }
    setQuestionIndex(questionIndex + 1);
  };
  return (
    <Page title='阿尔兹海默症数字疗法'>
      <div className='page-alzheimer-answer flex'>
        <span className='alzheimer-title'>阿尔兹海默症数字疗法</span>
        <span className='alzheimer-sub-title'>
          Alzheimer's digital therapy test
        </span>
        <div className='dot-list flex'>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
          <div className='dot'></div>
        </div>
        <div className='alzheimer-content flex'>
          <div className='question-item flex'>
            <div className='question'>
              <div className='question-index'>Q{questionIndex + 1}:</div>
              {questions.length ? questions[questionIndex].questionName : null}
            </div>
            <div className='answer-list flex'>
              {questions.length && questions[questionIndex].answerType !== 3 ? (
                questions[questionIndex].answers.map(
                  (item: any, index: number) => {
                    return (
                      <div
                        className={`answer-item ${
                          item.select ? 'active' : ''
                        } flex`}
                        key={item.answerId}
                        onClick={() => {
                          selectAnswer(index);
                        }}>
                        <div className='answer-text'>{item.answerName}</div>
                      </div>
                    );
                  }
                )
              ) : (
                <div className='input-answer'>
                  <InputItem
                    className='input'
                    value={
                      (questions.length &&
                        questions[questionIndex].answerText) ||
                      ''
                    }
                    disabled={
                      questions.length && questions[questionIndex].isSure
                    }
                    maxLength={30}
                    placeholder='请输入您的答案……'
                    onChange={(value) => {
                      answerText(value);
                    }}></InputItem>
                </div>
              )}
            </div>
          </div>
        </div>
        {questions.length && (
          <div className='action-item'>
            <div
              className={`action-next ${
                nextIsLight(questionIndex) ? '' : 'disable'
              }`}
              onClick={next}>
              {questionIndex !== questions.length - 1 ? '下一题' : '提交评估'}
            </div>
            {questionIndex ? (
              <div className='action-pre' onClick={pre}>
                返回上一题
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Page>
  );
};
export default AlzheimerAnswer;
