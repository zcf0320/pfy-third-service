/** @format */

import React from 'react';
import './index.scss';
import { useStores } from '@utils/useStore';
import { toJS } from 'mobx';
const logoTiger = require('@assert/logo_tiger.png');
const clawIcon = require('@assert/claw.png');
interface IProps {
  questionIndex: number;
  partIndex: number;
}
function QuestionName(props: IProps) {
  const questionnaireStore = useStores('questionnaireStore');
  const { questionnaire } = toJS(questionnaireStore) || {};
  const { partIndex, questionIndex } = props;
  return (
    <div className='component-question-name'>
      <img src={logoTiger} alt='' className='logo' />
      <div className='content flex'>
        <img alt='' src={clawIcon} className='icon-claw' />
        <span>
          {questionnaire.length &&
            questionnaire[partIndex].questions[questionIndex].questionName}
        </span>
        <span>
          {questionnaire.length &&
            questionnaire[partIndex].questions[questionIndex].questionRemark}
        </span>
      </div>
      <span className='num'>
        <span className='current'>{questionIndex + 1}</span>/
        {questionnaire.length && questionnaire[partIndex].questions.length}
      </span>
    </div>
  );
}
export default QuestionName;
