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
  grade: string;
}
interface result {
  content: string;
  score: number;
}
interface IProps {
  questionnaireStore: QuestionnaireStore;
}
type PropsType = RouteComponentProps & IProps;
@inject('questionnaireStore')
@observer
class LaborResult extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      result: {
        content: '',
        score: 0,
      },
      grade: '',
    };
  }
  componentDidMount() {
    let resultId = getUrlParams('resultId');
    let data = { resultId };
    let grade = '';
    getLaborResult(data).then((val: any) => {
      if (val.score <= 5) {
        grade = '优秀';
      } else if (val.score <= 9 && val.score >= 6) {
        grade = '良好';
      } else if (val.score <= 14 && val.score >= 10) {
        grade = '中等';
      } else if (val.score <= 20 && val.score >= 15) {
        grade = '较差';
      }
      this.setState({
        result: val,
        grade,
      });
    });
  }
  render() {
    const { content } = this.state.result;
    const { grade } = this.state;
    return (
      <Page title="劳动人民健康问卷">
        <div className="page-labor-result">
          <div className="labor-result-top">
            <div className="result-top-score">
              <div className="result-top-score-bg"></div>
              <div className="result-top-score-detail">
                您的健康状况：<span className="detail-result">{grade}</span>
              </div>
            </div>
            <div className="result-top-tip">{content}</div>
          </div>
          <div className="labor-result-bottom"></div>
        </div>
      </Page>
    );
  }
}

export default LaborResult;
