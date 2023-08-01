import React, { Component } from 'react';
import './index.scss';
import Page from '@components/Page';
import { getUrlParams } from '@utils/filter';
import { observer, inject } from 'mobx-react';
import { isTimeLegal } from '@api/questionnaire';
import { QuestionnaireStore } from '@store/interface';
import { RouteComponentProps } from 'react-router-dom';
interface IState {
  isAjax: boolean;
  isLegal: boolean;
}
interface IProps {
  questionnaireStore: QuestionnaireStore;
}
type PropsType = RouteComponentProps & IProps;
@inject('questionnaireStore')
@observer
class LaborDay extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      isAjax: false,
      isLegal: true,
    };
  }
  componentDidMount() {
    let questionnaireCode = getUrlParams('code');
    let channelId = getUrlParams('channelId');
    let token = getUrlParams('token');
    if (token) {
      // 获取用户信息
      localStorage.setItem('third_token', token);
    }
    channelId &&
      isTimeLegal({
        questionnaireCode,
        channelCode: channelId,
      }).then((res: any) => {
        this.setState({
          isAjax: true,
          isLegal: res,
        });
      });
    !channelId &&
      this.setState({
        isAjax: true,
      });
  }
  start() {
    let questionnaireCode = getUrlParams('code');
    let serviceRecordId = getUrlParams('serviceRecordId') || '';
    let channelId = getUrlParams('channelId') || '';
    // 获取答题信息
    this.props.questionnaireStore
      .getQuestionnaire({
        code: questionnaireCode,
      })
      .then((res: any) => {
        res.questionnaire &&
          res.questionnaire[0].questions.forEach((item: any) => {
            item.answers.forEach((ele: any) => {
              ele.select = false;
            });
          });
        this.props.questionnaireStore.setQuestionnaire(res.questionnaire);
        this.props.history.push(
          `/questionnaire/laborDay/answer?channelId=${channelId}&serviceRecordId=${serviceRecordId}&code=${getUrlParams(
            'code'
          )}`
        );
      });
  }
  render() {
    const { isAjax, isLegal } = this.state;
    return (
      <Page title="劳动人民健康问卷">
        {isAjax && isLegal ? (
          <div className="page-labor-start">
            <div className="labor-top">
              <div className="labor-top-tip">
                <p>
                  日复一日的工作是否已经影响到了您的健康，四个简单动作带您了解自己的身体状况。
                </p>
                <div className="labor-top-tips"></div>
              </div>
            </div>
            <div className="labor-center">
              <div className="labor-center-btn" onClick={this.start.bind(this)}>
                开始问卷
              </div>
            </div>
            <div className="labor-bottom"></div>
          </div>
        ) : null}
      </Page>
    );
  }
}

export default LaborDay;
