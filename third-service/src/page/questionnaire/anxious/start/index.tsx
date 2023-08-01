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
class Anxious extends Component<PropsType, IState> {
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
    } else {
      this.setState({
        isAjax: false,
      });
      return;
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
          `/questionnaire/anxious/answer?channelId=${channelId}&serviceRecordId=${serviceRecordId}&code=${getUrlParams(
            'code'
          )}`
        );
      });
  }
  render() {
    const { isAjax, isLegal } = this.state;
    return (
      <Page title="焦虑自评问卷">
        {isAjax && isLegal ? (
          <div className="page-anxious-start flex">
            <div className="anxious-o3"></div>
            <div className="anxious-light"></div>
            <div className="anxious-bord">
              <div className="anxious-title"></div>
              <div className="anxious-people"></div>
              <div className="anxious-cat"></div>
              <div className="anxious-o2"></div>
              <div className="anxious-o1"></div>
              <div className="anxious-book"></div>
              <div className="anxious-text">
                <div className="anxious-text-title">
                  <span>测试说明</span>
                </div>
                <div className="anxious-text-content">
                  焦虑是一种较常见的情绪障碍。工作压力大或长期得不到放松，大多数人都会有不同程度的抑郁、焦虑。
                  <p>你是否焦虑，焦虑程度是怎样的？欢迎参加正规测评！</p>
                </div>
                <div className="anxious-text-title">
                  <span>适用人群</span>
                </div>
                <div className="anxious-text-content">
                  SAS适用于具有焦虑症状的成年人，具有较广泛的适用性，主要用于疗效评估。
                </div>
              </div>
            </div>
            <div className="anxious-btn" onClick={this.start.bind(this)}>
              开始测验
            </div>
            <div className="anxious-tip">
              仅作为自我检测管理的参考，不可代替医疗诊断
            </div>
            <div className="anxious-bottom"></div>
          </div>
        ) : null}
        {isAjax && !isLegal ? (
          <div className="none flex">
            <div className="none-content flex">
              <div className="none-bg"></div>
              <span>权益已过期</span>
            </div>
          </div>
        ) : null}
        {!isAjax ? (
          <div className="none flex">
            <div className="none-content flex">
              <div className="none-bg"></div>
              <span>未登录</span>
            </div>
          </div>
        ) : null}
      </Page>
    );
  }
}

export default Anxious;
