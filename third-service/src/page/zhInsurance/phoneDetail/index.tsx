import React, { Component } from 'react';
import Page from '@components/Page';
import './index.scss';
import { imgUrl } from '@utils/appConfig';
interface IProps {}
interface IState {}
class PhoneResult extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <Page title='问诊申请'>
        <div className='page-phone-result flex'>
          <div className='top'>
            此次服务仅为健康咨询，并非医疗建议。您若有任何身体不适，建议至最近的医院就诊，感谢！
          </div>
          <div className='result flex'>
            <img
              alt=''
              src={`${imgUrl}success.png`}
              className='result-icon'></img>
            <div className='tips flex'>
              <div className='tips-top'>问诊申请已提交</div>
              <span className='tips-bottom'>当前人数过多，需要排队</span>
            </div>
            {/* <div className="btn flex">取消申请</div> */}
          </div>
        </div>
      </Page>
    );
  }
}
export default PhoneResult;
