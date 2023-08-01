import React, { Component } from 'react';
import Page from '@components/Page';
import './index.scss';
import Material from './material';
// import PredivImage from "@components/PredivImage";
import { observer, inject } from 'mobx-react';
import { CommonStore } from '@store/interface';
import { zhInsuranceStore } from '@store/zhInsurance/interface';
import { checkMail, getUrlParams, checkPhone } from '@utils/filter';
import { getIdCard } from '@api/common';
import { saveMaterials } from '@api/zhInsurance';
import { toJS } from 'mobx';
import { RouteComponentProps } from 'react-router-dom';
import { Toast } from 'antd-mobile';
interface IProps {
  commonStore: CommonStore;
  zhInsuranceStore: zhInsuranceStore;
}
type PropsType = RouteComponentProps & IProps;
interface IState {
  commitUserdemand: boolean;
  userDetailCodeList: Array<string>;
  userDemand: string;
  userInfo: {
    name?: string;
    idCard?: string;
    mobile?: string;
    email?: string;
    childName?: string;
  };
}
@inject('zhInsuranceStore')
@inject('commonStore')
@observer
class Consultation extends Component<PropsType, IState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      commitUserdemand: false,
      userDemand: '',
      userDetailCodeList: [],
      userInfo: {},
    };
  }
  componentDidMount() {
    getIdCard().then((res: string) => {
      this.setState({
        userInfo: {
          idCard: res,
          mobile: this.props.commonStore.userInfo.mobile || '',
        },
      });
    });
    this.props.zhInsuranceStore.getMaterialList({
      serviceRecordId: getUrlParams('serviceRecordId'),
    });
  }
  deleteImg = (parent: number, child: number) => {
    const { materialList } = this.props.zhInsuranceStore;
    materialList[parent].files.splice(child, 1);
    this.props.zhInsuranceStore.setMaterialList([...materialList]);
  };
  addItem = (params: any) => {
    const { materialList } = this.props.zhInsuranceStore;
    const { data, index } = params;
    materialList[index].files.push({
      url: data,
    });
    this.props.zhInsuranceStore.setMaterialList([...materialList]);
  };
  watchData = () => {
    const { materialList, userDetailCodeList, commitUserdemand } =
      this.props.zhInsuranceStore;
    const { userDemand } = this.state;
    const { email, idCard, childName, mobile } = this.state.userInfo;
    let result = true;
    commitUserdemand && !userDemand && (result = false);
    userDetailCodeList.includes('child_name') && !childName && (result = false);
    userDetailCodeList.includes('email') && !email && (result = false);
    userDetailCodeList.includes('mobile') && !mobile && (result = false);
    userDetailCodeList.includes('id_card') && !idCard && (result = false);
    materialList.length &&
      materialList.forEach((item) => {
        if (item.required) {
          !item.files.length && (result = false);
        }
      });
    return result;
  };
  save = () => {
    if (!this.watchData()) {
      return;
    }
    const { materialList, userDetailCodeList, commitUserdemand } =
      this.props.zhInsuranceStore;
    const { userInfo, userDemand } = this.state;
    const { mobile, email, childName, idCard } = userInfo;
    let error = '';
    userDetailCodeList.includes('mobile') &&
      !checkPhone(mobile || '') &&
      (error = '手机格式有误');
    userDetailCodeList.includes('email') &&
      !checkMail(email || '') &&
      (error = '邮箱格式有误');
    if (error) {
      Toast.info(error, 3);
      return;
    }
    for (let i = 0; i < materialList.length; i++) {
      materialList[i].imgUrls = [];
      materialList[i].files.length &&
        materialList[i].files.forEach((fItem: any) => {
          materialList[i].imgUrls.push(fItem.url);
        });
      if (!materialList[i].imgUrls.length) {
        materialList.splice(i, 1);
        i--;
      }
    }
    let serviceRecordId = getUrlParams('serviceRecordId');
    // userInfo.name = this.props.commonStore.userInfo.name
    let params: any = {
      materialList,
      userInfo: {},
      serviceRecordId,
    };
    commitUserdemand && (params.userDemand = userDemand);
    userDetailCodeList.includes('insured_name') &&
      (params.userInfo.name = this.props.commonStore.userInfo.name);
    userDetailCodeList.includes('child_name') &&
      (params.userInfo.childName = childName);
    userDetailCodeList.includes('id_card') && (params.userInfo.idCard = idCard);
    userDetailCodeList.includes('mobile') && (params.userInfo.mobile = mobile);
    userDetailCodeList.includes('email') && (params.userInfo.email = email);
    saveMaterials(params).then(() => {
      this.props.history.replace('/zh/examine?state=1');
    });
  };
  render() {
    const { idCard, mobile, email, childName } = this.state.userInfo;
    const { userDetailCodeList, commitUserdemand } =
      this.props.zhInsuranceStore;
    return (
      <Page title='上传资料'>
        <div className='page-consultation flex'>
          <div className='claims-step-top'>
            <div className='claims-step-title'>
              <div className='claims-step-redline'></div>
              <div>基本信息</div>
            </div>
            {userDetailCodeList.includes('insured_name') ? (
              <div className='claims-step-top-box'>
                <div className='claims-step-top-left'>被保险人</div>
                <span className='claims-step-input  claims-step-top-666'>
                  {this.props.commonStore.userInfo.name}
                </span>
              </div>
            ) : null}
            {userDetailCodeList.includes('child_name') ? (
              <div className='claims-step-top-box'>
                <div className='claims-step-top-left'>孩子姓名</div>
                <input
                  className='claims-step-input'
                  type='text'
                  placeholder='请输入孩子姓名'
                  value={childName}
                  onChange={(e) => {
                    this.setState({
                      userInfo: {
                        childName: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            ) : null}
            {userDetailCodeList.includes('id_card') ? (
              <div className='claims-step-top-box'>
                <div className='claims-step-top-left'>身份证号</div>
                <span className='claims-step-input  claims-step-top-666'>
                  {idCard}
                </span>
              </div>
            ) : null}
            {userDetailCodeList.includes('mobile') ? (
              <div className='claims-step-top-box'>
                <div className='claims-step-top-left'>手机号码</div>
                <input
                  className='claims-step-input'
                  type='text'
                  maxLength={11}
                  // maxLength={11}
                  placeholder='请输入手机号码'
                  value={mobile}
                  onChange={(e) => {
                    this.setState({
                      userInfo: {
                        mobile: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            ) : null}
            {userDetailCodeList.includes('email') ? (
              <div className='claims-step-top-box'>
                <div className='claims-step-top-left'>邮箱</div>
                <input
                  className='claims-step-input'
                  type='text'
                  maxLength={30}
                  placeholder='请输入邮箱'
                  value={email}
                  onChange={(e) => {
                    this.setState({
                      userInfo: {
                        email: e.target.value,
                      },
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
          {commitUserdemand ? (
            <div className='claims-step-top demands'>
              <div className='claims-step-title'>
                <div className='claims-step-redline'></div>
                <div>
                  用户诉求<span className='set-tips'>（300字以内）</span>
                </div>
              </div>
              <textarea
                className='user-demands'
                maxLength={300}
                placeholder='请告诉我们您想解决的问题……'
                onChange={(e) => {
                  this.setState({
                    userDemand: e.target.value,
                  });
                }}></textarea>
            </div>
          ) : null}
          <Material
            materialList={toJS(this.props.zhInsuranceStore.materialList)}
            deleteImg={this.deleteImg}
            addItem={this.addItem}></Material>
          {/* <UploadImg></UploadImg>
                <PredivImage imgList={['1', '2']} close={()=>{}}></PredivImage> */}
          <div
            className={`save flex ${this.watchData() ? '' : 'disable'}`}
            onClick={this.save}>
            立即提交
          </div>
        </div>
      </Page>
    );
  }
}
export default Consultation;
