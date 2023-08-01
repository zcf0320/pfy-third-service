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
  resultRemark: string;
}
interface IProps {
  questionnaireStore: QuestionnaireStore;
}
type PropsType = RouteComponentProps & IProps;
@inject('questionnaireStore')
@observer
class DepressedResult extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      result: {
        content: '',
        score: 0,
        resultRemark: '',
      },
      grade: '',
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
      <Page title="抑郁自评问卷">
        <div className="page-depressed-result flex">
          <div className="depressed-top">
            <p>抑郁评定的临界值为T=53，分值越高，抑郁倾向越明显。</p>
          </div>
          <div className="depressed-score">
            您的抑郁标准分为：{result.score}分
          </div>
          <div className="depressed-result">
            <div className="depressed-result-l"></div>
            <div className="depressed-result-r"></div>
            <div className="depressed-result-title">{result.resultRemark}</div>
            <p>{result.content}</p>
          </div>
          <div className="depressed-bottom">
            <div className="depressed-bottom-p">
              仅作为自我检测管理的参考，不可代替医疗诊断
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default DepressedResult;
