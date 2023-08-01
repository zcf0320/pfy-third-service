import React, { Component } from 'react';
import './index.scss';
import { InputItem, Toast } from 'antd-mobile';
import { auth } from '@api/zhInsurance';
import { observer, inject } from 'mobx-react';
import { CommonStore } from '@store/interface';
import { RouteComponentProps } from 'react-router-dom';
import { getUrlParams } from '@utils/filter';
interface IProps {
  commonStore: CommonStore;
}
interface IState {
  user: any;
  mobile: string;
  validCode: string;
  idCard: string;
  codeText: string;
  codeState: boolean;
  isLoading: boolean;
}
type PageProps = IProps & RouteComponentProps;
@inject('zhInsuranceStore')
@inject('commonStore')
@observer
class FirstLogin extends Component<PageProps, IState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      user: {},
      mobile: '',
      validCode: '',
      idCard: '',
      codeText: '获取验证码',
      codeState: false,
      isLoading: false,
    };
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.setState({
      user,
    });
  }
  saveStateChange() {
    const { idCard, mobile, validCode } = this.state;
    if (idCard && mobile && validCode) {
      return false;
    } else {
      return true;
    }
  }
  validCodeChange(value: string) {
    this.setState(
      {
        validCode: value,
      },
      () => this.saveStateChange.call(this)
    );
  }
  idCardChange(value: string) {
    this.setState(
      {
        idCard: value,
      },
      () => this.saveStateChange.call(this)
    );
  }
  phoneChange(value: string) {
    this.setState(
      {
        mobile: value,
      },
      () => this.saveStateChange.call(this)
    );
  }
  //提交
  save() {
    const { idCard, mobile, validCode, isLoading } = this.state;
    if (this.saveStateChange() || isLoading) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    //校验身份证和手机号
    if (
      !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        idCard
      )
    ) {
      Toast.info('身份证号码格式错误', 3);
      return;
    }
    if (!/^1[0-9]{10}$/.test(mobile)) {
      Toast.info('手机号码格式错误', 3);
      return;
    }
    if (!validCode) {
      Toast.info('请输入验证码', 3);
      return;
    }
    let params = {
      idCard,
      mobile,
      validCode,
    };

    auth(params)
      .then((res: any) => {
        this.setState({
          isLoading: false,
        });
        const { token } = res;
        this.props.commonStore.setToken(token);
        this.props.commonStore.setUserInfo(res);
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('third_token', token);
        this.props.history.replace(
          `/zh/user?vcPolicyNo=${getUrlParams('vcPolicyNo')}`
        );
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }
  //获取验证吗
  sendMessage() {
    const { mobile, codeState } = this.state;
    if (!/^1[0-9]{10}$/.test(mobile)) {
      Toast.info('手机号码格式错误', 3);
      return;
    }
    if (codeState) {
      return;
    }
    this.setState({
      codeState: true,
    });
    this.state.codeState ||
      this.props.commonStore
        .sendMessage({
          mobile,
        })
        .then(() => {
          this.setState({
            codeState: true,
          });
          let num = 60;
          let time = setInterval(() => {
            --num;
            this.setState({
              codeText: num + '秒',
            });
            if (num <= 0) {
              clearInterval(time);
              this.setState({
                codeState: false,
                codeText: '重新获取',
              });
            }
          }, 1000);
        })
        .catch(() => {
          this.setState({
            codeState: false,
          });
        });
  }
  render() {
    const { name } = this.state.user;
    const { codeText, codeState } = this.state;
    const idCard = localStorage.getItem('idCard') || '-';
    return (
      <div className="first-login">
        <div className="top">
          <div className="user flex">
            <span>您好，</span>
            <span>用户{idCard || '-'}</span>
          </div>
          <div className="tip">为保障被保险人利益，首次使用需完善以下信息</div>
          <div className="user-name">
            <span className="label">
              被保人姓名<i>*</i>
            </span>
            <InputItem type="text" className="input" disabled value={name} />
          </div>
        </div>
        <div className="user-info">
          <div className="user-infos">
            <div>
              <span className="label">
                被保人身份证<i>*</i>
              </span>
              <InputItem
                maxLength={18}
                type="text"
                className="input"
                onChange={this.idCardChange.bind(this)}
                placeholder="请输入被保人身份证"
              />
            </div>
          </div>
          <div className="user-infos">
            <div>
              <span className="label">
                手机号<i>*</i>
              </span>
              <InputItem
                maxLength={11}
                type="text"
                className="input"
                onChange={this.phoneChange.bind(this)}
                placeholder="用于服务联系及账号登录"
              />
            </div>
          </div>
          <div className="user-infos">
            <div>
              <span className="label">
                验证码<i>*</i>
              </span>
              <InputItem
                type="text"
                className="input"
                onChange={this.validCodeChange.bind(this)}
              />
              <div
                className={`code ${codeState ? 'disable' : ''}`}
                onClick={this.sendMessage.bind(this)}
              >
                {codeText}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`save ${this.saveStateChange() ? 'disable' : ''}`}
          onClick={this.save.bind(this)}
        >
          确认
        </div>
      </div>
    );
  }
}
export default FirstLogin;
