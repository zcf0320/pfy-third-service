import React, { Component } from 'react';
import './index.scss';
import Page from '@components/Page';
import { getUrlParams } from '@utils/filter';
import { userCenterUrl } from '@utils/appConfig';
import { RouteComponentProps } from 'react-router-dom';
import { getFailReason } from '@api/zhInsurance';

interface IState {
  state: string; //1待审核、2成功、3失败,
  failReason: string;
}

class Examine extends Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      state: '',
      failReason: '',
    };
  }
  componentDidMount() {
    let state = getUrlParams('state');
    state &&
      this.setState({
        state,
      });
    state === '3' && this.getFailReason();
  }
  getFailReason() {
    getFailReason({
      serviceRecordId: getUrlParams('serviceRecordId'),
    }).then((res: string) => {
      this.setState({
        failReason: res,
      });
    });
  }
  render() {
    const { state, failReason } = this.state;
    let url: string = '';
    let black: string = '';
    let gray: string = '';
    // let title = '';
    if (state === '1') {
      url = 'claims_exam.png';
      black = '您的理赔申请已提交成功，正在审核中...';
      gray = '预计1-3个工作日内给您答复，请耐心等待';
      // title = '待审核';
    } else if (state === '2') {
      url = 'claims_exam_success.png';
      black = '理赔成功';
      // title = '审核成功';
    } else if (state === '3') {
      url = 'claims_exam_fail.png';
      black = '您提交的理赔申请审核失败';
      gray = '可返回重新申请';
      // title = '审核失败';
    }
    return (
      <Page title='审核'>
        <div className='claims-examine'>
          <div>
            <div className='claims-examine-box'>
              <img
                alt=''
                src={`${userCenterUrl}${url}`}
                className='claims-examine-img'
              />
              <div className='claims-examine-333'>{black}</div>
              {state !== '2' && (
                <div className='claims-examine-999'>{gray}</div>
              )}
            </div>
          </div>
          {state === '2' ? (
            <div
              className='use-service'
              onClick={() => {
                this.props.history.replace(
                  `/zh/useConsultation?serviceRecordId=${getUrlParams(
                    'serviceRecordId'
                  )}`
                );
              }}>
              立即使用服务
            </div>
          ) : null}
          {state === '3' && (
            <div>
              <div className='claims-examine-container'>
                <div className='claims-examine-fail'>失败原因</div>
                <div className='claims-examine-reason'>
                  <div className='claims-examine-dot'></div>
                  <div className='claims-examine-text'>{failReason}</div>
                </div>
              </div>
              <div
                className='claims-examine-reset'
                onClick={() => {
                  this.props.history.replace(
                    `/zh/consultation?serviceRecordId=${getUrlParams(
                      'serviceRecordId'
                    )}`
                  );
                }}>
                重新提交
              </div>
            </div>
          )}
        </div>
      </Page>
    );
  }
}

export default Examine;
