/** @format */

import React, { Component } from 'react';
import './index.scss';
import Page from '@components/Page';
import { QuestionnaireStore } from '@store/interface';
import { observer, inject } from 'mobx-react';
import { getUrlParams } from '@utils/filter';
import { RouteComponentProps } from 'react-router-dom';
import { getLaborResult } from '@api/questionnaire';
interface IState {
  result: result;
}
interface result {
  content: string;
  score: number;
  resultRemark: string;
}
interface IProps {
  questionnaireStore: QuestionnaireStore;
}
type PropsType = RouteComponentProps & IProps;
@inject('questionnaireStore')
@observer
class AnxiousResult extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      result: {
        content: '',
        score: 0,
        resultRemark: '',
      },
    };
  }
  componentDidMount() {
    let resultId = getUrlParams('resultId');
    let data = { resultId };
    getLaborResult(data).then((val: any) => {
      this.setState({
        result: val,
      });
    });
  }
  render() {
    const { result } = this.state;
    return (
      <Page title='焦虑自评问卷'>
        <div className='page-anxious-result flex'>
          <div className='anxious-o3'></div>
          <div className='anxious-light'></div>
          <div className='anxious-top'>
            <p>按照中国常模结果：</p>
            <p>SAS标准分的分界值为50分</p>
            <p>若您的标准分低于50分，说明您心理状况正常，</p>
            <p>
              若超过50分说明有焦虑症状，分值越高，说明您的焦虑症状越严重，需要接受心理咨询甚至需要在医生指导下服药。
            </p>
            <div className='anxious-o2'></div>
            <div className='anxious-book'></div>
          </div>
          <div className='anxious-score'>
            您的焦虑标准分为：{result.score}分
          </div>
          <div className='depressed-result'>
            <div className='depressed-result-l'></div>
            <div className='depressed-result-r'></div>
            <div className='depressed-result-title'>{result.resultRemark}</div>
            <p>{result.content}</p>
          </div>
          <div className='anxious-bottom'></div>
        </div>
      </Page>
    );
  }
}

export default AnxiousResult;
