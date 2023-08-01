import React from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { toJS } from 'mobx';
import { debounce } from '@utils/filter';
interface IProps {
  partIndex: number;
  questionIndex: number;
  type: number;
  select: Function;
}
function Question(props: IProps) {
  const questionnaireStore = useStores('questionnaireStore');
  const { questionnaire } = toJS(questionnaireStore) || {};
  const { partIndex, questionIndex, type } = props;
  return (
    <div className='component-question flex'>
      {questionnaire.length &&
      !questionnaire[partIndex].questions[questionIndex].titleImg ? (
        <div className='question-list flex'>
          {questionnaire[partIndex].questions[questionIndex].answers.map(
            (item: any, index: number) => {
              return (
                <div
                  className={`question-item flex ${
                    item.select ? 'active' : ''
                  }`}
                  key={item.answerId}
                  onClick={() => {
                    debounce(
                      props.select(partIndex, questionIndex, index),
                      1000
                    );
                  }}>
                  <div className='question-item-content flex'>
                    <img
                      src={item.img}
                      alt=''
                      className={`i-${type}-${partIndex}-${questionIndex}-${index}`}
                    />
                  </div>
                  <span className='text'>{item.answerName}</span>
                </div>
              );
            }
          )}
        </div>
      ) : null}
      {questionnaire.length &&
      questionnaire[partIndex].questions[questionIndex].titleImg ? (
        <div className='question-img flex'>
          <div className='img-content flex'>
            <img
              alt=''
              src={questionnaire[partIndex].questions[questionIndex].titleImg}
              className={`i-${type}-${partIndex}-${questionIndex}`}></img>
          </div>
          {questionnaire[partIndex].questions[questionIndex].answers.map(
            (item: any, index: number) => {
              return (
                <div
                  className={`item flex ${item.select ? 'active' : ''}`}
                  key={item.answerId}
                  onClick={() => {
                    props.select(partIndex, questionIndex, index);
                  }}>
                  {item.answerName}
                </div>
              );
            }
          )}
        </div>
      ) : null}
    </div>
  );
}
export default Question;
