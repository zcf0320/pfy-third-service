import * as React from 'react';
import Page from '@components/Page';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import './index.scss';
import json from './list.json';
import {
  Modal,
  PickerView,
  Toast,
  DatePicker,
  List,
  ImagePicker,
} from 'antd-mobile';
import { DiabetsStore, CommonStore } from '@store/interface';
import moment from 'moment';
import { getUrlParams } from '@utils/filter';
import PreviewImage from '@components/PreviewImage';
import { upload } from '@api/common';
import i18n from 'i18n';

export interface DiabetesProps {
  diabetsStore: DiabetsStore;
  commonStore: CommonStore;
}

export interface DiabetesState {
  modal2: boolean;
  type: number;
  complicate: any;
  control: any;
  value: string;
  data: any;
  pickValue: any;
  transfer: any;
  modal1: boolean;
  imgList: any;
  url: string;
  token: string;
}
type PropsType = RouteComponentProps & DiabetesProps;
@inject('diabetsStore', 'commonStore')
@observer
class Diabetes extends React.Component<PropsType, DiabetesState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      modal2: false,
      type: 0,
      complicate: [
        '无并发症',
        '糖尿病足',
        '糖尿病眼',
        '糖尿病肾',
        '糖尿病心血管症',
        '糖尿病神经病变',
        '糖尿病皮肤病',
        '高血压',
        '高血脂',
      ],
      value: '',
      control: [
        '血压稳定',
        '空腹高',
        '餐后高',
        '经常低血糖',
        '血糖波动大',
        '不清楚',
      ],
      data: {
        complication: [], //并发症
        insulinRegimen: '', //胰岛素方案
        diabetesType: '', //糖尿病类型
        therapyMethod: '', //治疗方式
        bloodGlucoseControl: [], //血糖控制情况
        confirmedTime: null, //确诊时间
        hbalcTime: null, //hvalc测量时间
        glycosylatedHemoglobin: '', //糖化血红蛋白测量值
        checkReportImgList: [], //img
        serviceRecordId: '',
        id: '',
      },
      pickValue: [],
      transfer: [],
      modal1: false,
      imgList: [
        // {
        //     url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        //     id: '2121',
        // },
        // {
        //     url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        //     id: '2122',
        // },
      ],
      url: '',
      token: '',
    };
  }
  componentDidMount() {
    const serviceRecordId = getUrlParams('serviceRecordId');
    const token = getUrlParams('token');
    token && localStorage.setItem('third_token', token);
    const { data } = this.state;
    let context: any = {};
    context = Object.assign({}, data, {
      serviceRecordId,
    });
    this.setState({
      data: context,
      token,
    });
    this.getList(serviceRecordId);
  }
  getList = (serviceRecordId: string) => {
    this.props.diabetsStore.getDisabets(serviceRecordId).then((res: any) => {
      let data = res;
      if (!data.checkReportImgList) {
        data.checkReportImgList = [];
      }
      if (!data.complication) {
        data.complication = [];
      }
      if (!data.bloodGlucoseControl) {
        data.bloodGlucoseControl = [];
      }
      if (!data.glycosylatedHemoglobin) {
        data.glycosylatedHemoglobin = '';
      }
      if (data.hbalcTime) {
        data.hbalcTime = new Date(data.hbalcTime);
      } else {
        data.hbalcTime = null;
      }
      let imgList = data.checkReportImgList.map((item: any) => {
        return {
          url: item,
          id: new Date().getTime(),
        };
      });
      this.setState({
        data,
        imgList,
      });
    });
  };
  onClose = () => () => {
    this.setState({
      modal2: false,
      modal1: false,
      type: 0,
    });
  };
  getData = () => {
    const { type, data, control } = this.state;
    switch (type) {
      case 1:
        return json.type;
      case 2:
        return json.date;
      case 3:
        if (data.diabetesType) {
          if (data.diabetesType === '预防糖尿病') {
            return json.treatment2;
          }
          return json.treatment1;
        } else {
          return [];
        }
      case 4:
        if (data.diabetesType && <data className="therapyMethod"></data>) {
          if (
            data.diabetesType !== '2型糖尿病' &&
            data.diabetesType !== '1型糖尿病'
          ) {
            return json.insulin;
          } else {
            if (
              data.therapyMethod === '口服降糖药' ||
              data.therapyMethod === '其他'
            ) {
              return json.insulin1Oral;
            } else if (data.therapyMethod === '胰岛素') {
              return json.insulin1Insulin;
            } else if (data.therapyMethod === '胰岛素+口服降糖药') {
              if (data.diabetesType === '2型糖尿病') {
                return json.insulin1Insulin;
              } else {
                return json.insulin12;
              }
            }
          }
        } else {
          return [];
        }
        break;
      case 6:
        return control;
      default:
        return [];
    }
  };
  addValue = (value: string) => {
    this.setState({
      value,
    });
  };
  comfirm = () => {
    const { type, pickValue, data } = this.state;
    let context: any = {};
    let callback: any = this.getData()[0];
    switch (type) {
      case 1:
        if (pickValue.length) {
          context = Object.assign({}, data, {
            diabetesType: pickValue[0],
          });
        } else {
          context = Object.assign({}, data, {
            diabetesType: json.type[0].value,
          });
        }
        // if (context.diabetesType === '预防糖尿病') {
        //     context = Object.assign({}, context, {
        //         therapyMethod: '',
        //     })
        // }
        context = Object.assign({}, context, {
          therapyMethod: '',
          insulinRegimen: '',
        });
        this.setState({
          data: context,
          modal2: false,
        });
        return;
      case 2:
        if (pickValue.length) {
          let date: any = pickValue
            .join('')
            .replace('年', '/')
            .replace('月', '/');
          date = date + '01 00:00:00';
          date = new Date(date).getTime();
          context = Object.assign({}, data, {
            confirmedTime: date,
          });
        } else {
          let date: any = new Date(
            `${json.date[0][0].value}${json.date[1][0].value}01 00:00:00`
              .replace('年', '/')
              .replace('月', '/')
          ).getTime();
          context = Object.assign({}, data, {
            confirmedTime: date,
          });
        }
        this.setState({
          data: context,
          modal2: false,
        });
        return;
      case 3:
        if (pickValue.length) {
          context = Object.assign({}, data, {
            therapyMethod: pickValue[0],
          });
        } else {
          context = Object.assign({}, data, {
            therapyMethod: callback.value,
          });
        }
        context = Object.assign({}, context, {
          insulinRegimen: '',
        });
        this.setState({
          data: context,
          modal2: false,
        });
        return;
      case 4:
        if (pickValue.length) {
          context = Object.assign({}, data, {
            insulinRegimen: pickValue[0],
          });
        } else {
          context = Object.assign({}, data, {
            insulinRegimen: callback.value,
          });
        }
        this.setState({
          data: context,
          modal2: false,
        });
        return;
      default:
        return;
    }
  };
  changePickValue = (val: any) => {
    this.setState({
      pickValue: val,
    });
  };
  deleteImg = () => {};
  addItem = (url: string) => {
    let { data } = this.state;
    data.checkReportImgList.push(url);
    let context: any = {};
    context = Object.assign({}, data, {
      checkReportImgList: data.checkReportImgList,
    });
    this.setState({
      data: context,
    });
  };
  submit = () => {
    let data = this.state.data;
    if (data.hbalcTime) {
      data.hbalcTime = moment(data.hbalcTime).valueOf();
    }
    if (data.diabetesType === '预防糖尿病') {
      data.complication = [];
      data.insulinRegimen = '';
      data.therapyMethod = '';
      data.confirmedTime = null;
    }
    if (!data.glycosylatedHemoglobin) {
      data.glycosylatedHemoglobin = null;
    }
    this.props.diabetsStore.saveDisabets(data).then((res:any) => {
      Toast.info(i18n.chain.common.submittedSuccessfully, 2);
      this.props.history.push(
        `/diabetes/bloodSugar?serviceRecordId=${res.serviceRecordId}&token=${this.state.token}`
      );
    });
  };
  onImageChange = async (files: any, type: string, index: any) => {
    if (files.length > 5) {
      Toast.info(i18n.chain.diabetesManagement.more5pic, 2);
    } else {
      if (type === 'add') {
        let url = await upload(files[files.length - 1].file);
        this.addItem(url);
        this.setState({
          imgList: files,
        });
      }
      if (type === 'remove') {
        let list = this.state.imgList;
        list.splice(index, 1);
        this.setState({
          imgList: list,
        });
        let { data } = this.state;
        data.checkReportImgList.splice(index);
        let context: any = {};
        context = Object.assign({}, data, {
          checkReportImgList: data.checkReportImgList,
        });
        this.setState({
          data: context,
        });
        // this.props.commonStore.setModal({
        //     show: true,
        //     content: '确认要删除吗？',
        //     clickConfirm: () => {},
        // })
      }
    }
  };
  setClass = () => {
    const {
      complication,
      insulinRegimen,
      diabetesType,
      therapyMethod,
      bloodGlucoseControl,
      confirmedTime,
    } = this.state.data;
    if (diabetesType !== '预防糖尿病') {
      if (
        complication &&
        complication.length > 0 &&
        insulinRegimen &&
        diabetesType &&
        therapyMethod &&
        bloodGlucoseControl.length > 0 &&
        confirmedTime
      ) {
        return true;
      }
      return false;
    } else {
      if (diabetesType && bloodGlucoseControl.length > 0) {
        return true;
      }
      return false;
    }
  };
  render() {
    const {
      complicate,
      value,
      data,
      control,
      type,
      pickValue,
      transfer,
      imgList,
      url,
    } = this.state;
    let saveModal: any = {};
    return (
      <Page title={i18n.chain.diabetesManagement.title}>
        <div className="diabetes">
          <div className="diabetes-card">
            <div className="diabetes-item flex">
              <div className="diabetes-item-left">
                <div>{i18n.chain.diabetesManagement.typediabetes}</div>
                <div className="diabetes-card-must"></div>
              </div>
              <div
                className="diabetes-item-right"
                onClick={() => {
                  if (data.id) {
                    return;
                  }
                  this.setState({
                    modal2: true,
                    type: 1,
                  });
                }}
              >
                <div className={`${data.diabetesType && 'show-text'}`}>{`${
                  data.diabetesType ? data.diabetesType : i18n.chain.common.select
                }`}</div>
                {!data.diabetesType && (
                  <div className="diabetes-card-next"></div>
                )}
              </div>
            </div>
            {data.diabetesType !== '预防糖尿病' && (
              <div>
                <div className="diabetes-item flex">
                  <div className="diabetes-item-left">
                    <div>{i18n.chain.diabetesManagement.timeDiagnosis}</div>
                    <div className="diabetes-card-must"></div>
                  </div>
                  <div
                    className="diabetes-item-right"
                    onClick={() => {
                      if (data.id) {
                        return;
                      }
                      this.setState({
                        modal2: true,
                        type: 2,
                      });
                    }}
                  >
                    <div className={`${data.confirmedTime && 'show-text'}`}>{`${
                      data.confirmedTime
                        ? moment(data.confirmedTime).format('YYYY.MM')
                        : i18n.chain.common.select
                    }`}</div>
                    {!data.confirmedTime && (
                      <div className="diabetes-card-next"></div>
                    )}
                  </div>
                </div>
                <div className="diabetes-item flex">
                  <div className="diabetes-item-left">
                    <div>{i18n.chain.diabetesManagement.treatmentMode}</div>
                    <div className="diabetes-card-must"></div>
                  </div>
                  <div
                    className="diabetes-item-right"
                    onClick={() => {
                      if (data.id) {
                        return;
                      }
                      this.setState({
                        modal2: true,
                        type: 3,
                      });
                    }}
                  >
                    <div className={`${data.therapyMethod && 'show-text'}`}>{`${
                      data.therapyMethod ? data.therapyMethod : i18n.chain.common.select
                    }`}</div>
                    {!data.therapyMethod && (
                      <div className="diabetes-card-next"></div>
                    )}
                  </div>
                </div>
                <div className="diabetes-item flex">
                  <div className="diabetes-item-left">
                    <div>{i18n.chain.diabetesManagement.insulinRegimen}</div>
                    <div className="diabetes-card-must"></div>
                  </div>
                  <div
                    className="diabetes-item-right"
                    onClick={() => {
                      if (data.id) {
                        return;
                      }
                      this.setState({
                        modal2: true,
                        type: 4,
                      });
                    }}
                  >
                    <div
                      className={`${data.insulinRegimen && 'show-text'}`}
                    >{`${
                      data.insulinRegimen ? data.insulinRegimen : i18n.chain.common.select
                    }`}</div>
                    {!data.insulinRegimen && (
                      <div className="diabetes-card-next"></div>
                    )}
                  </div>
                </div>
                <div className="diabetes-item flex item-bb0 ">
                  <div className="diabetes-item-left">
                    <div>{i18n.chain.diabetesManagement.complication}</div>
                    <div className="diabetes-card-must"></div>
                  </div>
                  <div
                    className="diabetes-item-right"
                    onClick={() => {
                      if (data.id) {
                        return;
                      }
                      this.setState({
                        modal2: true,
                        type: 5,
                        transfer: data.complication,
                      });
                    }}
                  >
                    {data.complication.length === 0 && (
                      <div>
                        <div>{`${
                          data.complication && data.complication.length
                            ? ''
                            : i18n.chain.common.select
                        }`}</div>
                      </div>
                    )}
                    {!data.id && <div className="diabetes-card-next"></div>}
                    {data.id && (
                      <div className="show-text">
                        {data.complication && data.complication.join('、')}
                      </div>
                    )}
                  </div>
                </div>
                {!data.id && (
                  <div className="tag-box">
                    {data.complication && data.complication.length > 0 && (
                      <div className="diabetes-tag flex">
                        {data.complication &&
                          data.complication.length > 0 &&
                          data.complication.map((item: any) => {
                            return (
                              <div className="diabetes-tag-item" key={item}>
                                <div className="tag-active">{item}</div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="show-line"></div>
            <div className={'diabetes-item flex item-bb0 '}>
              <div className="diabetes-item-left">
                <div>{i18n.chain.diabetesManagement.bloodControl}</div>
                <div className="diabetes-card-must"></div>
              </div>
              <div
                className="diabetes-item-right"
                onClick={() => {
                  if (data.id) {
                    return;
                  }
                  this.setState({
                    modal2: true,
                    type: 6,
                    transfer: data.bloodGlucoseControl,
                  });
                }}
              >
                {data.bloodGlucoseControl.length === 0 && (
                  <div>{`${
                    data.bloodGlucoseControl && data.bloodGlucoseControl.length
                      ? ''
                      : i18n.chain.common.select
                  }`}</div>
                )}
                {!data.id && <div className="diabetes-card-next"></div>}
                {data.id && (
                  <div className="show-text">
                    {data.bloodGlucoseControl &&
                      data.bloodGlucoseControl.join('、')}
                  </div>
                )}
              </div>
            </div>
            {!data.id && data.bloodGlucoseControl.length > 0 && (
              <div className="diabetes-tag flex">
                {data.bloodGlucoseControl.map((item: any) => {
                  return (
                    <div className="diabetes-tag-item" key={item}>
                      <div className="tag-active">{item}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="diabetes-card">
            <div className="diabetes-item flex">
              {/* <div className="diabetes-item-left">
                                <div>HBA1c测量时间</div>
                            </div> */}
              {/* <div className="diabetes-item-right">
                                <div>{`${
                                    data.hbalcTime ? data.hbalcTime : '请选择'
                                }`}</div>
                                <div className="diabetes-card-next"></div>
                            </div> */}
              <DatePicker
                mode="date"
                extra={i18n.chain.common.select}
                value={data.hbalcTime}
                className="diabetes-picker"
                onOk={(date) => {
                  let context: any = {};
                  context = Object.assign({}, data, {
                    hbalcTime: date,
                  });
                  this.setState({
                    data: context,
                  });
                }}
              >
                <List.Item
                  arrow="horizontal"
                  className={`${!data.hbalcTime && 'diabetes-list'} ${
                    data.hbalcTime && 'diabetes-list-block'
                  }`}
                >
                  HBA1c{i18n.chain.diabetesManagement.accurateTime}
                </List.Item>
              </DatePicker>
            </div>
            <div className="diabetes-item flex">
              <div className="diabetes-item-left">
                <div>{i18n.chain.diabetesManagement.glycosylatedHemoglobin}</div>
              </div>
              <div className="num-right">
                <input
                  placeholder={i18n.chain.common.input}
                  type="number"
                  className={`num-input ${
                    data.glycosylatedHemoglobin && 'color666'
                  }`}
                  value={data.glycosylatedHemoglobin}
                  onChange={(e) => {
                    let context: any = {};
                    let value: any = e.target.value;
                    context = Object.assign({}, data, {
                      glycosylatedHemoglobin: value,
                    });
                    this.setState({
                      data: context,
                    });
                  }}
                ></input>
              </div>
            </div>
            <div className="diabetes-item flex item-bb0 ">
              <div className="diabetes-item-left">
                <div>{i18n.chain.diabetesManagement.upload}({imgList.length}/5)</div>
              </div>
            </div>
            {/* <div className="upload flex">
                            <div className="upload-box flex">
                                {data.checkReportImgList.length > 0 &&
                                    data.checkReportImgList.map((item: any) => {
                                        return (
                                            <img
                                                src={item}
                                                alt=""
                                                className="upload-box-img"
                                                key={item}
                                                onClick={() => {
                                                    this.setState({
                                                        url: item,
                                                    })
                                                }}
                                            />
                                        )
                                    })}
                            </div>
                        </div> */}
            <ImagePicker
              files={imgList}
              onChange={(files, types, index) => {
                this.onImageChange(files, types, index);
              }}
              onImageClick={(index, files) => {
                if (index && files && files.length > 0) {
                  this.setState({
                    url: files[index].url,
                  });
                }
              }}
              length={3}
            />
          </div>

          {url ? (
            <PreviewImage
              imgList={[url]}
              close={() => {
                this.setState({
                  url: '',
                });
              }}
            ></PreviewImage>
          ) : null}
          <Modal
            popup
            visible={this.state.modal2}
            onClose={this.onClose()}
            animationType="slide-up"
            className="diabetes-modal"
            maskClosable={false}
          >
            {type !== 5 && type !== 6 && (
              <div>
                <div className="diabetes-modal-header flex">
                  <div
                    className="left"
                    onClick={() => {
                      this.setState({
                        modal2: false,
                      });
                    }}
                  >
                    {i18n.chain.button.cancel}
                  </div>
                  <div
                    className="comfirm"
                    onClick={() => {
                      this.comfirm();
                    }}
                  >
                    {i18n.chain.button.confirm}
                  </div>
                </div>
                <PickerView
                  data={this.getData()}
                  cascade={false}
                  value={pickValue}
                  onChange={(val) => {
                    this.changePickValue(val);
                  }}
                />
              </div>
            )}
            {(type === 5 || type === 6) && (
              <div>
                <div className="diabetes-modal-disaster flex">
                  {`${type === 5 ? i18n.chain.diabetesManagement.complication : i18n.chain.diabetesManagement.bloodControl}`}
                  <div
                    className="close"
                    onClick={() => {
                      this.setState({
                        modal2: false,
                      });
                    }}
                  ></div>
                </div>
                {type === 5 && (
                  <div className="diabetes-modal-body flex">
                    {complicate.map((item: string) => {
                      return (
                        <div className="disaster-item" key={item}>
                          <div
                            className={`disaster-item-content ${
                              transfer.includes(item) && 'active'
                            }`}
                            onClick={() => {
                              let set: any = new Set(transfer);
                              if (set.has(item)) {
                                set.delete(item);
                              } else {
                                set.add(item);
                              }

                              this.setState({
                                transfer: [...set],
                              });
                            }}
                          >
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {type === 6 && (
                  <div className="diabetes-modal-body flex">
                    {control.map((item: string) => {
                      return (
                        <div className="disaster-item" key={item}>
                          <div
                            className={`disaster-item-content ${
                              transfer.includes(item) && 'active'
                            }`}
                            onClick={() => {
                              let set: any = new Set(transfer);
                              if (set.has(item)) {
                                set.delete(item);
                              } else {
                                set.add(item);
                              }
                              this.setState({
                                transfer: [...set],
                              });
                            }}
                          >
                            {item}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {type === 5 && (
              <div className="diabetes-modal-box flex">
                <input
                  className="input"
                  placeholder={i18n.chain.common.input}
                  value={value}
                  onChange={(e) => {
                    this.addValue(e.target.value);
                  }}
                ></input>
                <div className="diabetes-modal-box-right">
                  {value && (
                    <div
                      className="clear"
                      onClick={() => {
                        this.setState({
                          value: '',
                        });
                      }}
                    ></div>
                  )}
                  <div
                    className="ok"
                    onClick={() => {
                      if (!value) {
                        return;
                      }
                      complicate.push(value);
                      let { complication } = data;
                      complication.push(value);
                      this.setState({
                        complicate,
                        data,
                        value: '',
                      });
                    }}
                  >
                    {i18n.chain.button.confirm}
                  </div>
                </div>
              </div>
            )}
            {(type === 5 || type === 6) && (
              <div
                className={`diabetes-submit ${
                  transfer.length && 'submit-active'
                }`}
                onClick={() => {
                  if (type === 6) {
                    saveModal = Object.assign({}, data, {
                      bloodGlucoseControl: transfer,
                    });
                  } else {
                    saveModal = Object.assign({}, data, {
                      complication: transfer,
                    });
                  }
                  transfer.length &&
                    this.setState({
                      data: saveModal,
                      modal2: false,
                    });
                }}
              >
                {i18n.chain.button.save}
              </div>
            )}
          </Modal>
          <Modal
            visible={this.state.modal1}
            transparent
            maskClosable={false}
            onClose={this.onClose()}
            className="tips-modal"
          >
            <div className="tips">{i18n.chain.common.tip}</div>
            <div className="comfirm">{i18n.chain.common.isSureSubmit}</div>
            <div className="grey">{i18n.chain.common.sureSubmitTip}</div>
            <div className="btn-box flex">
              <div
                className="cancel btn"
                onClick={() => {
                  this.setState({
                    modal1: false,
                  });
                }}
              >
                {i18n.chain.common.think}
              </div>
              <div
                className="submit btn"
                onClick={() => {
                  this.submit();
                }}
              >
                {i18n.chain.common.sureSubmit}
              </div>
            </div>
          </Modal>
          <div
            className={`diabetes-submit ${
              this.setClass() && 'submit-btn-active'
            }`}
            onClick={() => {
              if (this.setClass()) {
                let { glycosylatedHemoglobin } = this.state.data;
                if (glycosylatedHemoglobin) {
                  let reg =
                    /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                  if (reg.test(glycosylatedHemoglobin)) {
                    this.setState({
                      modal1: true,
                    });
                  } else {
                    Toast.info(i18n.chain.diabetesManagement.glycosylatedHemoglobinErr);
                    return false;
                  }
                } else {
                  this.setState({
                    modal1: true,
                  });
                }
              }
            }}
          >
            {i18n.chain.button.submit}
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(Diabetes);
