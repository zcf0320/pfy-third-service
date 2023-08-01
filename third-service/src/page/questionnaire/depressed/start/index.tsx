/** @format */

import React, { Component } from 'react';
import './index.scss';
import Page from '@components/Page';
import { getUrlParams } from '@utils/filter';
import { observer, inject } from 'mobx-react';
import { isTimeLegal } from '@api/questionnaire';
import { QuestionnaireStore, CommonStore } from '@store/interface';
import { RouteComponentProps } from 'react-router-dom';

interface IState {
  isAjax: boolean;
  isLegal: boolean;
}
interface IProps {
  questionnaireStore: QuestionnaireStore;
  commonStore: CommonStore;
}
type PropsType = RouteComponentProps & IProps;
@inject('questionnaireStore')
@inject('commonStore')
@observer
class Depressed extends Component<PropsType, IState> {
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
    let serviceRecordId = getUrlParams('serviceRecordId');
    if (token) {
      // 获取用户信息
      localStorage.setItem('third_token', token);
    } else {
      this.setState({
        isAjax: false,
      });
      return;
    }
    serviceRecordId &&
      this.props.commonStore.setServiceRecordId(serviceRecordId);
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
          `/questionnaire/depressed/answer?channelId=${channelId}&serviceRecordId=${serviceRecordId}&code=${getUrlParams(
            'code'
          )}`
        );
      });
  }
  render() {
    const { isAjax, isLegal } = this.state;
    return (
      <Page title='抑郁自评问卷'>
        {isAjax && isLegal ? (
          <div className='page-depressed-start flex'>
            <div className='depressed-explain'>
              <div className='depressed-explain-c'>
                <div className='depressed-explain-l'></div>
                <div className='depressed-explain-r'></div>
                <p>抑郁是一种较常见的情绪障碍。 </p>
                <p>
                  病后会感到与自己处境不相符的悲伤、对生活失去兴趣、回避他人、精力下降；与一般悲伤、痛苦或精力不足不同，抑郁症可能导致患者对未来感到无望，甚至想要自杀。
                </p>
                <p>
                  本测验将有助于您进一步了解抑郁症的知识；请根据您近一周的感觉来进行评分，通过自我评估，了解自己是否存在抑郁，及其严重程度。
                </p>
              </div>
            </div>
            <div className='depressed-people'>
              <div className='depressed-people-c'>
                <div className='depressed-people-l'></div>
                <p>SDS适用于具有抑郁症状的成年人，具有较广泛的适用性。 </p>
              </div>
            </div>
            <div className='depressed-btn' onClick={this.start.bind(this)}>
              开始测评
            </div>
            <div className='depressed-bottom'>
              <div className='depressed-bottom-p'>
                仅作为自我检测管理的参考，不可代替医疗诊断
              </div>
            </div>
          </div>
        ) : null}
        {isAjax && !isLegal ? (
          <div className='none flex'>
            <div className='none-content flex'>
              <div className='none-bg'></div>
              <span>权益已过期</span>
            </div>
          </div>
        ) : null}
        {!isAjax ? (
          <div className='none flex'>
            <div className='none-content flex'>
              <div className='none-bg'></div>
              <span>未登录</span>
            </div>
          </div>
        ) : null}
      </Page>
    );
  }
}

export default Depressed;
