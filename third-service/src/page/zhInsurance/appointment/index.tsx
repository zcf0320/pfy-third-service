/** @format */

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Page from '@components/Page';
import PreviewImage from '@components/PreviewImage';
import { upload } from '@api/common';
import {
  Picker,
  DatePicker,
  Toast,
  InputItem,
  ImagePicker,
  TextareaItem,
} from 'antd-mobile';
import * as zhInsuranceApi from '../../../api/zhInsurance';
import { observer, inject } from 'mobx-react';
import { CommonStore, PerfectRecordStore } from '@store/interface';
import {
  timeForm,
  zhInsuranceStore,
  ServiceInfoForm,
  dateForm,
} from '@store/zhInsurance/interface';
import { checkPhone, getUrlParams } from '@utils/filter';
import radioDefault from '@assert/radio.png';
import radioChecked from '@assert/radio-checked.png';
import moment from 'moment';
import { toJS } from 'mobx';
import './index.scss';
interface IProps {
  commonStore: CommonStore;
  zhInsuranceStore: zhInsuranceStore;
  perfectRecordStore: PerfectRecordStore;
}
interface IState {
  pickerValue: any;
  comePickerValue: any;
  siteValue: any;
  mobile: string;
  selectDate: string;
  name: string;
  timeValue: any;
  dateValue: any;
  validCode: string;
  codeText: string;
  isSend: boolean;
  age: number;
  sex: number;
  comeCityId: number;
  idCard: string;
  pageCode: string;
  sampleFileUrl: string;
  address: string;
  contactMobile: string;
  customerAddressValue: any;
  customerAddress: string;
  reimbursementWay: number;
  // clinicHospital: string;
  clinicDepartment: string;
  illnessState: string;
  hostipalDocuments: number;
  reserveConfigRelationVo: any;
  reseverMaterialConfigVos: any;
}
// let isLoading = false;
let timer = 60;

@inject('zhInsuranceStore')
@inject('commonStore')
@inject('perfectRecordStore')
@observer
class Appointment extends Component<IProps & RouteComponentProps, IState> {
  constructor(props: IProps & RouteComponentProps) {
    super(props);
    this.state = {
      pickerValue: [],
      comePickerValue: [],
      siteValue: [],
      timeValue: [],
      selectDate: '',
      mobile: '',
      name: '',
      age: 0,
      idCard: '',
      dateValue: '',
      validCode: '',
      codeText: '获取验证码',
      isSend: false,
      sex: 0,
      pageCode: '',
      sampleFileUrl: '',
      address: '',
      contactMobile: '',
      customerAddressValue: [],
      customerAddress: '',
      reimbursementWay: 0,
      // clinicHospital: '',
      clinicDepartment: '',
      illnessState: '',
      hostipalDocuments: 0,
      reserveConfigRelationVo: [],
      reseverMaterialConfigVos: [],
      comeCityId: 0,
    };
  }
  componentDidMount = async () => {
    let serviceInfoId = getUrlParams('serviceInfoId');
    let serviceRecordId = getUrlParams('id');
    let pageCode = getUrlParams('pageCode');
    let token = getUrlParams('token');
    if (token) {
      await this.props.commonStore.setToken(token);
    }
    let env = getUrlParams('env');
    env && this.props.commonStore.setEnv(env);
    let params = {
      serviceInfoId,
      pageCode,
    };
    let serviceParams: ServiceInfoForm = {
      serviceRecordId: serviceRecordId,
    };
    this.setState({
      name: this.props.commonStore.userInfo.name || '',
      mobile: this.props.commonStore.userInfo.mobile || '',
      sex: this.props.commonStore.userInfo.sex,
      age: this.props.commonStore.userInfo.age || null,
      idCard: this.props.commonStore.userInfo.idCard || null,
      pageCode: pageCode,
    });

    this.props.zhInsuranceStore.getProviceList(params);

    this.props.zhInsuranceStore.getServiceInfo(serviceParams);
    serviceRecordId &&
      zhInsuranceApi.getReserveConfig(serviceRecordId).then((res: any) => {
        res.reseverMaterialConfigVos &&
          res.reseverMaterialConfigVos.forEach((item: any) => {
            item.files = [];
          });
        this.setState({
          reserveConfigRelationVo: res.reserveConfigRelationVo || [],
          reseverMaterialConfigVos: res.reseverMaterialConfigVos || [],
        });
      });
    this.props.perfectRecordStore.getAllRegion();
  };
  // 获取网点
  getSite(cityId: string) {
    let serviceInfoId = getUrlParams('serviceInfoId');
    const { pageCode } = this.state;
    let params = {
      cityId,
      serviceInfoId,
      pageCode: pageCode,
    };

    (pageCode === 'miaodiReserve' ||
      pageCode === 'bgjReserve' ||
      serviceInfoId === 'ff808081737b57b501737b7243b5009e' ||
      serviceInfoId === 'ff808081737bbf250173948a352501ea') &&
      this.props.zhInsuranceStore.getSiteList(params);
    if (serviceInfoId === 'ff808081737bbf250173949e178f0289') {
      let siteList = toJS(this.props.zhInsuranceStore.allSiteList).filter(
        (item: any) => {
          return item.cityId === cityId;
        }
      );
      siteList.length &&
        siteList.forEach((item: any, index: number) => {
          item.label = item.serviceSiteName;
          item.value = index;
        });
      this.props.zhInsuranceStore.setSiteList(siteList);
    }
  }
  getDate() {
    const { siteValue, pageCode } = this.state;
    let serviceInfoId = getUrlParams('serviceInfoId');
    if (siteValue.length) {
      if (
        pageCode === 'miaodiReserve' ||
        pageCode === 'bgjReserve' ||
        serviceInfoId === 'ff808081737b57b501737b7243b5009e' ||
        serviceInfoId === 'ff808081737bbf250173948a352501ea'
      ) {
        //获取淼滴日期
        let params: dateForm = {
          serviceSiteId:
            this.props.zhInsuranceStore.siteList[siteValue[0]].addressId,
        };
        this.props.zhInsuranceStore.getDateList(params);
      }
    }
  }
  // 获取网点时间
  getTime(time: number) {
    const { siteValue, pageCode } = this.state;
    let serviceInfoId = getUrlParams('serviceInfoId');
    if (
      siteValue.length &&
      (pageCode === 'miaodiReserve' ||
        pageCode === 'bgjReserve' ||
        serviceInfoId === 'ff808081737b57b501737b7243b5009e' ||
        serviceInfoId === 'ff808081737bbf250173948a352501ea')
    ) {
      let params: timeForm = {
        appDate: moment(time).format('YYYY-MM-DD'),
        serviceSiteId:
          this.props.zhInsuranceStore.siteList[siteValue[0]].addressId,
      };
      this.props.zhInsuranceStore.getTimeList(params);
      return;
    }
    let timeList = [] as any;
    for (let i = 0; i < 24; i++) {
      timeList.push({
        label: `${i}:00`,
        value: i,
      });
    }
    this.props.zhInsuranceStore.setTimeList(timeList);
  }
  watchData() {
    const {
      mobile,
      validCode,
      pickerValue,
      comePickerValue,
      siteValue,
      selectDate,
      timeValue,
      clinicDepartment,
      illnessState,
      customerAddress,
      reserveConfigRelationVo,
      reseverMaterialConfigVos,
    } = this.state;
    let result = true;
    if (!mobile) {
      result = false;
    }
    reserveConfigRelationVo.forEach((item: any) => {
      switch (item.code) {
        case 'updateMobile':
          result = !!(result && mobile);
          return result;
        case 'needMessage':
          result = !!(result && validCode);
          return result;
        case 'reverseArea':
          result = !!(result && pickerValue.length);
          return result;
        case 'comeCity':
          result = !!(result && comePickerValue.length);
          return result;
        case 'siteName':
          result = !!(result && siteValue.length);
          return result;
        case 'reserveDate':
          result = !!(result && selectDate);
          return result;
        case 'reserveTime':
          result = !!(result && timeValue.length);
          return result;
        case 'customerAddress':
          result = !!(result && customerAddress);
          return result;
        case 'clinicDepartment':
          result = !!(result && clinicDepartment);
          return;
        case 'illnessState':
          result = !!(result && illnessState);
          return result;
        default:
      }
    });

    let required = reseverMaterialConfigVos.find((item: any) => {
      return item.mandatory === 1 && item.files.length < 1;
    });
    if (required) {
      result = false;
    }
    return result;
  }
  save() {
    let serviceInfoId = getUrlParams('serviceInfoId');

    if (this.watchData()) {
      const {
        siteValue,
        selectDate,
        timeValue,
        name,
        mobile,
        sex,
        age,
        pageCode,
        clinicDepartment,
        customerAddress,
        hostipalDocuments,
        validCode,
        idCard,
        illnessState,
        reimbursementWay,
        address,
        reseverMaterialConfigVos,
        comeCityId,
      } = this.state;
      let time = '';
      if (timeValue.length) {
        time =
          selectDate +
          ' ' +
          this.props.zhInsuranceStore.timeList[timeValue[0]].label;
      }
      let materialReqs = [] as any;

      reseverMaterialConfigVos.forEach((item: any) => {
        if (item.files.length) {
          let files = [] as any;
          item.files.forEach((file: any) => {
            files.push(file.url);
          });
          materialReqs.push({
            materialConfigId: item.id,
            urls: files,
          });
        }
      });
      console.log(
        'this.props.zhInsuranceStore.siteList',
        this.props.zhInsuranceStore.siteList
      );

      let params = {
        address,
        addressId: siteValue.length
          ? this.props.zhInsuranceStore.siteList[siteValue[0]].addressId
          : '',
        age,
        channelId: localStorage.getItem('channelId') || 'CH000002',
        clinicDepartment,
        clinicHospital: siteValue.length
          ? this.props.zhInsuranceStore.siteList[siteValue[0]].label
          : '',
        customerAddress,
        hostipalDocuments,
        idCard,
        illnessState,
        materialReqs,
        name,
        mobile,
        reimbursementWay,
        serviceRecordId: getUrlParams('id'),
        sex,
        time: moment(time).valueOf(),
        validCode,
        comeCityId,
      };
      this.props.zhInsuranceStore.add(params).then((res: any) => {
        this.props.history.replace(
          pageCode === 'miaodiReserve' ||
            pageCode === 'bgjReserve' ||
            serviceInfoId === 'ff808081737b57b501737b7243b5009e'
            ? `/zh/detail?id=${res.serviceRecordId}`
            : `/zh/record?serviceRecordId=${getUrlParams('id')}`
        );
      });
    }
  }
  sendMessage = () => {
    const { mobile, isSend } = this.state;

    if (timer !== 60 || isSend || !mobile) {
      return;
    }
    const isMobile = checkPhone(mobile);
    !isMobile && Toast.info({ title: '请输入正确的手机号', mask: true });
    this.setState({
      isSend: true,
    });
    this.props.commonStore.sendMessage({ mobile }).then(() => {
      let setCode = setInterval(() => {
        if (!timer) {
          timer = 60;
          setCode && clearInterval(setCode);
          this.setState({
            codeText: '重新获取',
            isSend: false,
          });
        } else {
          timer--;
          this.setState({
            codeText: `${timer}s`,
          });
        }
      }, 1000);
    });
  };
  deleteImg = (parent: number, child: number) => {
    const { reseverMaterialConfigVos } = this.state;
    reseverMaterialConfigVos[parent].files.splice(child, 1);
    this.props.zhInsuranceStore.setReseverMaterialConfigVos([
      ...reseverMaterialConfigVos,
    ]);
  };
  onChange = async (index: any, files: any, type: any, i: any) => {
    const { reseverMaterialConfigVos } = this.state;
    if (type === 'add') {
      const file = files[files.length - 1].file;
      let url = await upload(file);
      reseverMaterialConfigVos[index].files.push({
        id: new Date().getTime().toString(),
        url: url,
      });
    }
    if (type === 'remove') {
      this.deleteImg(index, i);
    }

    this.setState({
      reseverMaterialConfigVos,
    });
  };
  getVal = (v: any) => {
    let area = '';
    this.props.perfectRecordStore.allRegionList.forEach((province: any) => {
      if (province.value === v[0]) {
        area += province.label;
        province.children.forEach((city: any) => {
          if (city.value === v[1]) {
            area += city.label;
            city.children.forEach((district: any) => {
              if (district.value === v[2]) {
                area += district.label;
              }
            });
          }
        });
      }
    });
    this.setState({
      customerAddress: area,
    });
  };

  renderAppointMent() {
    const {
      pageCode,
      pickerValue,
      comePickerValue,
      siteValue,
      selectDate,
      timeValue,
      dateValue,
      address,
      contactMobile,
      customerAddress,
      reimbursementWay,
      // clinicHospital,
      clinicDepartment,
      hostipalDocuments,
      customerAddressValue,
      illnessState,
      reserveConfigRelationVo,
    } = this.state;
    const list = reserveConfigRelationVo.map((list: any) => {
      switch (list.code) {
        case 'reverseArea':
          return (
            <Picker
              key={list.id}
              title='选择地区'
              cols={2}
              data={this.props.zhInsuranceStore.priviceList}
              value={pickerValue}
              onOk={(v) => {
                this.setState({ pickerValue: v });
                this.getSite(
                  this.props.zhInsuranceStore.priviceList[v[0]].children[v[1]]
                    .cityId
                );
                this.setState({
                  siteValue: [],
                  selectDate: '',
                  address: '',
                  contactMobile: '',
                  timeValue: [],
                });
              }}>
              <div className='service-item flex m-t-32'>
                <div className='left flex'>
                  <span>{list.configName}</span>
                </div>
                <div className='right flex'>
                  {pickerValue.length ? (
                    <span>
                      {
                        this.props.zhInsuranceStore.priviceList[pickerValue[0]]
                          .children[pickerValue[1]].label
                      }
                    </span>
                  ) : (
                    <span className='placeholder'>请选择</span>
                  )}
                  <div className='next' />
                </div>
              </div>
            </Picker>
          );
        case 'siteName':
          return (
            <Picker
              key={list.id}
              title='选择网点'
              // extra="请选择(可选)"
              cols={1}
              data={this.props.zhInsuranceStore.siteList}
              value={siteValue}
              onOk={(v) => {
                if (v.length) {
                  this.setState(
                    {
                      siteValue: v,
                      address:
                        this.props.zhInsuranceStore.siteList[v[0]].address,
                      contactMobile:
                        this.props.zhInsuranceStore.siteList[v[0]]
                          .contactMobile,
                      selectDate: '',
                      timeValue: [],
                    },
                    () => {
                      this.getDate();
                    }
                  );
                }
              }}>
              <div className='service-item flex'>
                <div className='left flex'>
                  <span>{list.configName}</span>
                </div>
                <div className='right flex'>
                  {siteValue.length ? (
                    <span>
                      {this.props.zhInsuranceStore.siteList[siteValue[0]].label}
                    </span>
                  ) : (
                    <span className='placeholder'>请选择</span>
                  )}
                  <div className='next' />
                </div>
              </div>
            </Picker>
          );
        case 'detailAddress':
          return (
            <div key={list.id} className='service-item flex'>
              <div className='left'>{list.configName}</div>
              <div className='right'>{address}</div>
            </div>
          );
        case 'siteMobile':
          return (
            <div key={list.id} className='service-item flex'>
              <div className='left'>{list.configName}</div>
              <div className='right'>{contactMobile}</div>
            </div>
          );
        case 'reserveDate':
          if (pageCode === 'miaodiReserve') {
            return (
              <Picker
                key={list.id}
                title='选择日期'
                // extra="请选择(可选)"
                cols={1}
                data={this.props.zhInsuranceStore.dateList}
                value={dateValue}
                onOk={(v) => {
                  let time = new Date(v[0]).getTime();
                  this.setState({
                    dateValue: v,
                    selectDate: moment(time).format('YYYY-MM-DD'),
                    timeValue: [],
                  });
                  this.getTime(time);
                }}>
                <div className='service-item flex'>
                  <div className='left flex'>
                    <span>{list.configName}</span>
                  </div>
                  <div className='right flex'>
                    {selectDate ? (
                      <span>{selectDate}</span>
                    ) : (
                      <span className='placeholder'>请选择</span>
                    )}
                    <div className='next' />
                  </div>
                </div>
              </Picker>
            );
          } else {
            return (
              <DatePicker
                key={list.id}
                title='选择日期'
                mode='date'
                // minDate={new Date()}
                minDate={
                  pageCode === 'miaodiReserve'
                    ? new Date(moment().add(2, 'days').valueOf())
                    : new Date()
                }
                onOk={(v) => {
                  const time = new Date(v).getTime();
                  this.setState({
                    selectDate: moment(time).format('YYYY-MM-DD'),
                    timeValue: [],
                  });
                  this.getTime(time);
                }}>
                <div className='service-item flex'>
                  <div className='left flex'>
                    <span>{list.configName}</span>
                  </div>
                  <div className='right flex'>
                    {selectDate ? (
                      <span>{selectDate}</span>
                    ) : (
                      <span className='placeholder'>请选择</span>
                    )}
                    <div className='next' />
                  </div>
                </div>
              </DatePicker>
            );
          }

        case 'reserveTime':
          return (
            <Picker
              key={list.id}
              title='选择时间'
              // extra="请选择(可选)"
              cols={1}
              data={this.props.zhInsuranceStore.timeList}
              value={timeValue}
              onOk={(v) => {
                this.setState({ timeValue: v });
              }}>
              <div className='service-item flex'>
                <div className='left flex'>
                  <span>选择时间</span>
                </div>
                <div className='right flex'>
                  {timeValue.length ? (
                    <span>
                      {this.props.zhInsuranceStore.timeList[timeValue[0]].label}
                    </span>
                  ) : (
                    <span className='placeholder'>请选择</span>
                  )}
                  <div className='next' />
                </div>
              </div>
            </Picker>
          );

        case 'reimbursementWay':
          return (
            <div key={list.id} className='service-item flex'>
              <div className='left'>{list.configName}</div>
              <div className='right flex'>
                <div
                  className='radio'
                  onClick={() => {
                    this.setState({
                      reimbursementWay: 0,
                    });
                  }}>
                  {reimbursementWay === 0 ? (
                    <img alt='' src={radioChecked} />
                  ) : (
                    <img alt='' src={radioDefault} />
                  )}
                  自费
                </div>
                <div
                  className='radio'
                  onClick={() => {
                    this.setState({
                      reimbursementWay: 1,
                    });
                  }}>
                  {reimbursementWay === 1 ? (
                    <img alt='' src={radioChecked} />
                  ) : (
                    <img alt='' src={radioDefault} />
                  )}
                  医保
                </div>
              </div>
            </div>
          );

        case 'customerAddress':
          return (
            <Picker
              key={list.id}
              title='选择地区'
              // extra="请选择(可选)"
              cols={3}
              data={this.props.perfectRecordStore.allRegionList}
              value={customerAddressValue}
              onOk={(v) => {
                this.setState({ customerAddressValue: v });
                this.getVal(v);
              }}>
              <div className='service-item flex'>
                <div className='left'>{list.configName}</div>
                <div className='right flex'>
                  {customerAddress ? (
                    <span>{customerAddress}</span>
                  ) : (
                    <span className='placeholder'>请选择</span>
                  )}
                  <div className='next' />
                </div>
              </div>
            </Picker>
          );

        case 'hostipalDocuments':
          return (
            <div key={list.id} className='service-item flex'>
              <div className='left'>{list.configName}</div>
              <div className='right flex'>
                <div
                  className='radio'
                  onClick={() => {
                    this.setState({
                      hostipalDocuments: 0,
                    });
                  }}>
                  {hostipalDocuments === 0 ? (
                    <img alt='' src={radioChecked} />
                  ) : (
                    <img alt='' src={radioDefault} />
                  )}
                  是
                </div>
                <div
                  className='radio'
                  onClick={() => {
                    this.setState({
                      hostipalDocuments: 1,
                    });
                  }}>
                  {hostipalDocuments === 1 ? (
                    <img alt='' src={radioChecked} />
                  ) : (
                    <img alt='' src={radioDefault} />
                  )}
                  否
                </div>
              </div>
            </div>
          );
        case 'clinicHospital':
          return (
            <div key={list.id} className='service-item flex'>
              <div className='left'>{list.configName}</div>
              <div className='right'>
                {siteValue.length ? (
                  <span>
                    {this.props.zhInsuranceStore.siteList[siteValue[0]].label}
                  </span>
                ) : null}
              </div>
            </div>
          );
        case 'clinicDepartment':
          return (
            <div key={list.id} className='service-item flex'>
              <div className='left'>{list.configName}</div>
              <div className='right'>
                <InputItem
                  className='input'
                  clear
                  value={clinicDepartment}
                  placeholder='请输入'
                  onChange={(v) => {
                    this.setState({
                      clinicDepartment: v,
                    });
                  }}></InputItem>
              </div>
            </div>
          );
        case 'illnessState':
          return (
            <div key={list.id} className='service-item flex'>
              <div className='left'>{list.configName}</div>
              <div className='right'>
                <TextareaItem
                  className='textarea'
                  clear
                  value={illnessState}
                  placeholder='请输入'
                  autoHeight
                  onChange={(val: any) => {
                    this.setState({
                      illnessState: val,
                    });
                  }}></TextareaItem>
              </div>
            </div>
          );
        case 'comeCity':
          return (
            <Picker
              key={list.id}
              title='选择地区'
              cols={2}
              data={this.props.zhInsuranceStore.comePriviceList}
              value={comePickerValue}
              onOk={(v) => {
                this.setState({ comePickerValue: v });
                this.setState({
                  comeCityId:
                    this.props.zhInsuranceStore.comePriviceList[v[0]].children[
                      v[1]
                    ].cityId,
                });
              }}>
              <div className='service-item flex'>
                <div className='left flex'>
                  <span>{list.configName}</span>
                </div>
                <div className='right flex'>
                  {comePickerValue.length ? (
                    <span>
                      {
                        this.props.zhInsuranceStore.comePriviceList[
                          comePickerValue[0]
                        ].children[comePickerValue[1]].label
                      }
                    </span>
                  ) : (
                    <span className='placeholder'>请选择</span>
                  )}
                  <div className='next' />
                </div>
              </div>
            </Picker>
          );
        default:
          return null;
      }
    });
    return list;
  }
  render() {
    const {
      mobile,
      validCode,
      isSend,
      codeText,
      name,
      sex,
      idCard,
      sampleFileUrl,
      reserveConfigRelationVo,
      reseverMaterialConfigVos,
    } = this.state;
    return (
      <Page title='服务预约'>
        <div className='page-appointment'>
          <div className='common-info'>
            <div className='common-title flex'>预约人信息</div>
            {reserveConfigRelationVo &&
              reserveConfigRelationVo.map((list: any) => {
                return ['reversePerson', 'sex', 'idCard'].includes(
                  list.code
                ) ? (
                  <div key={list.id} className='common-item flex'>
                    <div className='left'>{list.configName}</div>

                    {list.code === 'reversePerson' && (
                      <div className='right'>{name}</div>
                    )}
                    {list.code === 'sex' && (
                      <div className='right'>{sex === 0 ? '女' : '男'}</div>
                    )}
                    {list.code === 'idCard' && (
                      <div className='right'>{idCard}</div>
                    )}
                  </div>
                ) : null;
              })}
          </div>

          <div className='service-info'>
            <div className='service-item flex'>
              <div className='left'>预约服务</div>
              <div className='right disbale'>{getUrlParams('name')}</div>
            </div>
            {reserveConfigRelationVo &&
              reserveConfigRelationVo.map((list: any) => {
                return ['updateMobile', 'needMessage'].includes(list.code) ? (
                  <div key={list.id} className='service-item flex'>
                    <div className='left'>{list.configName}</div>
                    {list.code === 'updateMobile' && (
                      <div className='right flex'>
                        <input
                          className='input'
                          type='number'
                          maxLength={11}
                          value={mobile}
                          placeholder-class='placeholder'
                          onChange={(e) => {
                            this.setState({ mobile: e.target.value });
                          }}
                          placeholder='请输入手机号码'></input>
                      </div>
                    )}
                    {list.code === 'needMessage' && (
                      <div className='right flex'>
                        <input
                          className='input code'
                          type='number'
                          maxLength={6}
                          value={validCode}
                          placeholder-class='placeholder'
                          onChange={(e) => {
                            this.setState({ validCode: e.target.value });
                          }}
                          placeholder='请输入验证码'></input>
                        <div
                          className={`send-message flex ${
                            isSend ? 'disable' : ''
                          }`}
                          onClick={this.sendMessage}>
                          {codeText}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null;
              })}
          </div>

          <div className='service-info'>{this.renderAppointMent()}</div>
          {reseverMaterialConfigVos.length > 0 && (
            <div className='material-info'>
              <div className='material-title'>提交材料</div>
              {reseverMaterialConfigVos.map((item: any, index: number) => {
                return (
                  <div key={item.id} className='material-wrap'>
                    <div className='material-item'>
                      <div className='left flex'>
                        {item.materialNameForUser}
                        {item.mandatory ? (
                          <div className='red'>（必填）</div>
                        ) : (
                          <div className='color-999'>（选填）</div>
                        )}
                      </div>
                      <div
                        className='right'
                        onClick={() => {
                          this.setState({ sampleFileUrl: item.sampleFileUrl });
                        }}>
                        {item.sampleFileUrl ? '查看示例' : '暂无示例'}
                      </div>
                    </div>
                    <div className='content'>{item.content}</div>
                    <ImagePicker
                      files={item.files}
                      onChange={this.onChange.bind(this, index)}
                      selectable={item.files.length < 7}
                    />
                  </div>
                );
              })}

              {sampleFileUrl ? (
                <PreviewImage
                  imgList={[sampleFileUrl]}
                  close={() => {
                    this.setState({ sampleFileUrl: '' });
                  }}></PreviewImage>
              ) : null}
            </div>
          )}
          <div
            className={`save flex ${
              this.watchData.call(this) ? '' : 'disable'
            }`}
            onClick={() => {
              this.save();
            }}>
            确认预约
          </div>
        </div>
      </Page>
    );
  }
}
export default Appointment;
