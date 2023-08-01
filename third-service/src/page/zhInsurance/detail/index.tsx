import Page from '@components/Page';
import { getUrlParams, timeFormat } from '@utils/filter';
import React, { useEffect, useState } from 'react';
import { useStores } from '@utils/useStore';
import './index.scss';
function Detail() {
  const [detail, setDetail] = useState({
    username: '',
    mobile: '',
    itemName: '',
    address: '',
    serviceSiteName: '',
    serviceSitePhone: '',
    reserveTime: 0,
    city: '',
    urlCode: '',
    url: '',
    comeCity: '',
    clinicHospital: '',
    clinicDepartment: '',
    illnessState: '',
    reimbursementWay: '',
    hostipalDocuments: '',
    customerAddress: ''
  });
  const zhInsuranceStore = useStores('zhInsuranceStore');
  useEffect(() => {
    console.log(getUrlParams('id'));
    zhInsuranceStore
      .reserveDetail({
        id: getUrlParams('id'),
      })
      .then((res: any) => {
        setDetail(res);
      });
  }, [zhInsuranceStore]);
  return (
    <Page title="预约成功">
      <div className="page-detail">
        <div className="bg-content">
          <div className="content">
            <div className="title">服务凭证</div>
            <div className="common-title">基础信息</div>
            <div className="common flex m-b-16">
              <div className="label">姓名</div>
              <div>{detail.username}</div>
            </div>
            <div className="common flex">
              <div className="label">手机号</div>
              <div>{detail.mobile}</div>
            </div>
            <div className="common-title">预约信息</div>
            <div className="common flex m-b-16">
              <div className="label">预约服务</div>
              <div>{detail.itemName}</div>
            </div>
            <div className="common flex m-b-16">
              <div className="label">预约地区</div>
              <div>{detail.city}</div>
            </div>
            <div className="common flex m-b-16">
              <div className="label">预约网点</div>
              <div className="address">{detail.address}</div>
            </div>
            {detail.serviceSiteName ? (
              <div className="common flex m-b-16">
                <div className="label">网点名称</div>
                <div className="address">{detail.serviceSiteName}</div>
              </div>
            ) : null}
            {detail.serviceSitePhone ? (
              <div className="common flex m-b-16">
                <div className="label">网点电话</div>
                <div className="address">{detail.serviceSitePhone}</div>
              </div>
            ) : null}
            
            {detail.clinicHospital ? (
              <div className="common flex m-b-16">
                <div className="label">就诊医院</div>
                <div className="address">{detail.clinicHospital}</div>
              </div>
            ) : null}
            {detail.clinicDepartment ? (
              <div className="common flex m-b-16">
                <div className="label">就诊科室</div>
                <div className="address">{detail.clinicDepartment}</div>
              </div>
            ) : null}
            {detail.illnessState ? (
              <div className="common flex m-b-16">
                <div className="label">病情描述</div>
                <div className="address">{detail.illnessState}</div>
              </div>
            ) : null}
            {detail.hostipalDocuments ? (
              <div className="common flex m-b-16">
                <div className="label">开具住院单</div>
                <div className="address">{detail.hostipalDocuments}</div>
              </div>
            ) : null}
            {detail.reimbursementWay ? (
              <div className="common flex m-b-16">
                <div className="label">报销方式</div>
                <div className="address">{detail.reimbursementWay}</div>
              </div>
            ) : null}
            {detail.comeCity ? (
              <div className="common flex m-b-16">
                <div className="label">上门城市</div>
                <div className="address">{detail.comeCity}</div>
              </div>
            ) : null}
            {detail.customerAddress ? (
              <div className="common flex m-b-16">
                <div className="label">客户所在地</div>
                <div className="address">{detail.customerAddress}</div>
              </div>
            ) : null}
            <div className="common flex m-b-16">
              <div className="label">预约时间</div>
              <div>{detail.reserveTime?timeFormat(detail.reserveTime, 'y-m-d h:m'):'-'}</div>
            </div>
            <div className="common flex">
              <div className="label">核销码</div>
              <div>{detail.urlCode}</div>
            </div>
            <div className="bottom flex">
              <img src={detail.url} alt="" className="img" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
export default Detail;
