import React from 'react';
import Page from '@components/Page';
import './index.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type PropsType = RouteComponentProps;

class Complete extends React.Component<PropsType> {
  // close = () => {
  //     // @ts-ignore：无法被执行的代码的错误
  //     wx.miniProgram.navigateBack()
  //     this.props.history.goBack()
  // }

  assess = () => {
    this.props.history.replace('/questionnaire/hra/start?code=BoRTUK');
  };

  render() {
    return (
      <Page title="完善健康档案">
        <div className="complete">
          <div className="complete-tips">星币奖励 +10</div>
          <div className="complete-img"></div>
          <div className="tips-text">恭喜您已经完成了健康档案！</div>
          <div className="tips-text-other">
            如果您想更了解自己的健康风险，可以继续完成寰宇关爱健康风险评估
          </div>
          <div className="assess" onClick={this.assess}>
            去进行HRA健康风险评估
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(Complete);
