import React, { Component } from 'react';
import Page from '@components/Page';
import { RouteComponentProps } from 'react-router-dom';
import './index.scss';
import { createMobile } from '@api/zhInsurance';
import { getUrlParams } from '@utils/filter';
const mustIcon = require('@assert/must.png');
interface IProps {}
interface IState {
  user: any;
  mobile: string;
  patientDescribe: string;
}
type PageProps = IProps & RouteComponentProps;
class Phone extends Component<PageProps, IState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      user: {},
      mobile: '',
      patientDescribe: '',
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.setState({
      user,
      mobile: user.mobile,
    });
  }
  save() {
    const { mobile, patientDescribe } = this.state;
    if (!mobile) {
      return;
    }
    let params: any = {
      serviceRecordId: getUrlParams('serviceRecordId'),
      mobile,
    };
    patientDescribe && (params.patientDescribe = patientDescribe);
    createMobile(params).then(() => {
      this.props.history.replace('/zh/phoneDetail');
    });
  }
  render() {
    const { user, mobile } = this.state;
    const { name, age, sex } = user;
    return (
      <Page title='选择患者'>
        <div className='page-phone flex'>
          <div className='content flex'>
            <div className='top'>
              此次服务仅为健康咨询，并非医疗建议。您若有任何身体不适，建议至最近的医院就诊，感谢！
            </div>
            <div className='info'>
              <div className='title flex'>
                <span className='label'>患者信息</span>
                <span>仅限本人使用</span>
              </div>
              <div className='common flex'>
                <span className='label'>问诊人姓名</span>
                <span>{name}</span>
              </div>
              <div className='common flex'>
                <span className='label'>性别</span>
                <span>{sex === 1 ? '男' : '女'}</span>
              </div>
              <div className='common flex'>
                <span className='label'>年龄（岁）</span>
                <span>{age}</span>
              </div>
            </div>
            <div className='phone-content'>
              <div className='title flex'>
                <div className='left flex'>
                  <span>填写预留手机号</span>
                  <img alt='' src={mustIcon} className='must'></img>
                </div>
                <input
                  className='right'
                  value={mobile}
                  placeholder='请填写手机号'
                  onChange={(e) => {
                    this.setState({
                      mobile: e.target.value,
                    });
                  }}></input>
              </div>
              <div className='dease-info'>
                <div className='tips'>
                  <span>描述本次疾病概要</span>
                  <span className='min'>（便于医生更快了解您的病情）</span>
                </div>
                <input
                  className='input-content'
                  placeholder='描述您本次所患的症状'
                  onChange={(e) => {
                    this.setState({
                      patientDescribe: e.target.value,
                    });
                  }}></input>
              </div>
            </div>
          </div>
          <div
            className={`bottom flex ${mobile ? '' : 'disable'}`}
            onClick={() => {
              this.save();
            }}>
            提交
          </div>
        </div>
      </Page>
    );
  }
}
export default Phone;
