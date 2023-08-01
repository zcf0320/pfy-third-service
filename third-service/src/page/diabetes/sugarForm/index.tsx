import Page from '@components/Page';
import * as React from 'react';
import './index.scss';
import { DatePicker, List, Modal, Toast } from 'antd-mobile';
import { DiabetsStore } from '@store/interface';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { getUrlParams } from '@utils/filter';
import moment from 'moment';

export interface SugarFormProps {
  diabetsStore: DiabetsStore;
}

export interface SugarFormState {
  list: any;
  timeQuantum: any;
  measuringTime: any;

  enumText: any;
  bloodGlucose: string;
  modal1: boolean;
  data: any;
  token: string;
}

type PropsType = RouteComponentProps & SugarFormProps;
@inject('diabetsStore', 'commonStore')
@observer
class SugarForm extends React.Component<PropsType, SugarFormState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      list: {
        凌晨: '凌晨血糖：通常指凌晨 3 ～ 4 点所测的血糖。',
        早餐前:
          '餐前血糖：指餐前所测的血糖，包括早餐前、午餐前和晚餐前的血糖。',
        早餐后:
          '餐后血糖：通常指从吃第一口饭开始计时，2 小时后所测得的血糖值。',
        午餐前:
          '餐前血糖：指餐前所测的血糖，包括早餐前、午餐前和晚餐前的血糖。',
        午餐后:
          '餐后血糖：通常指从吃第一口饭开始计时，2 小时后所测得的血糖值。',
        晚餐前:
          '餐前血糖：指餐前所测的血糖，包括早餐前、午餐前和晚餐前的血糖。',
        晚餐后:
          '餐后血糖：通常指从吃第一口饭开始计时，2 小时后所测得的血糖值。',
        睡前: '一般指晚上 22:00 左右所测的血糖。',
        随机: '随机血糖：是指一天当中任意时间测得的血糖。正常人随机血糖不超过 11.1 mmol/L。',
      },
      timeQuantum: [],
      measuringTime: null,
      bloodGlucose: '',
      modal1: false, //timeQuantum时间段

      enumText: {
        0: '良好的血糖能改善糖尿病症状，预防急性并发症的发生；能有效预防和延缓糖尿病慢性并发症的发生和发展，提高生活质量，延长寿命。',
        1: '血糖偏高会造成急慢性并发症发生。调整晚餐饮食，避免过饱，遵遗嘱服药；若餐后2小时血糖仍偏高，建议就医调整治疗方案。',
        2: '低血糖可造成大脑损伤，立即口服快速升糖食物（糖果、巧克力等）。15分钟后复测，若仍小于3.9mmol/L需及时就诊。',
      },
      data: {
        id: null,
      },
      token: '',
    };
  }
  componentDidMount() {
    this.getData();
    this.setState({
      token: getUrlParams('token'),
    });
  }
  getData = () => {
    const serviceRecordId = getUrlParams('serviceRecordId');
    this.props.diabetsStore.getSugar(serviceRecordId).then((res: any) => {
      let data = res;
      console.log(data);
      this.setState({
        timeQuantum: data.timeQuantum ? data.timeQuantum.split() : [],
        measuringTime: data.measuringTime ? new Date(data.measuringTime) : null,
        bloodGlucose: data.bloodGlucose ? data.bloodGlucose : '',
        data: res,
      });
    });
  };
  submit = (type: number) => {
    //同步1，不同步0
    let { timeQuantum, measuringTime, bloodGlucose } = this.state;

    let params = {
      timeQuantum: timeQuantum.join(),
      measuringTime: moment(measuringTime).valueOf(),
      bloodGlucose,
      updateStatus: type,
      serviceRecordId: getUrlParams('serviceRecordId'),
      id: this.state.data.id,
    };
    this.props.diabetsStore.saveSugar(params).then((res: any) => {
      Toast.info('保存成功', 2);
      this.props.history.push(
        `/diabetes/bloodSugar?serviceRecordId=${res}&token=${this.state.token}`
      );
    });
  };
  setClass = () => {
    let { timeQuantum, measuringTime, bloodGlucose } = this.state;
    if (timeQuantum.length > 0 && measuringTime && bloodGlucose) {
      return true;
    }
    return false;
  };
  render() {
    const { list, timeQuantum, measuringTime, bloodGlucose } = this.state;
    return (
      <Page title="糖尿病管理">
        <div className="sugar-form">
          <div className="sugar-form-card">
            <div className="sugar-form-title">您的测量时间段</div>
            <div className="sugar-form-box flex">
              {Object.keys(list).map((item) => {
                return (
                  <div className="sugar-form-item" key={item}>
                    <div
                      className={`sugar-form-tag ${
                        timeQuantum.includes(item) && 'active'
                      }`}
                      onClick={() => {
                        let set: any = new Set(timeQuantum);
                        if (set.has(item)) {
                          set.delete(item);
                        } else {
                          set.add(item);
                        }
                        let arr: any = [...set];
                        if (arr.length > 1) {
                          arr.shift();
                        }
                        this.setState({
                          timeQuantum: arr,
                        });
                      }}
                    >
                      {item}
                    </div>
                  </div>
                );
              })}
            </div>
            {timeQuantum.length > 0 && (
              <div className="sugar-form-tips flex">
                <div className="sugar-form-tips-icon"></div>
                <div className="sugar-form-tips-text">
                  {list[timeQuantum.join()]}
                </div>
              </div>
            )}
          </div>
          <div className="sugar-form-content">
            <DatePicker
              mode="time"
              extra="请选择"
              value={this.state.measuringTime}
              onChange={(measuringTime) => this.setState({ measuringTime })}
              className="sugar-form-picker"
            >
              <List.Item
                arrow="horizontal"
                className={`sugar-form-list ${measuringTime && 'black'}`}
              >
                精确测量时间
              </List.Item>
            </DatePicker>
            <div className="sugar-form-line"></div>
            <div className="sugar-form-items flex">
              <div className="sugar-form-items-left">
                <div>血糖值（mmol/L）</div>
              </div>
              <div className="num-right">
                <input
                  placeholder="请输入您的值"
                  type="number"
                  className="num-input"
                  value={bloodGlucose}
                  onChange={(e) => {
                    this.setState({
                      bloodGlucose: e.target.value,
                    });
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div
            className={`sugar-form-btn ${this.setClass() && 'btn-active'}`}
            onClick={() => {
              if (this.setClass()) {
                let { bloodGlucose } = this.state;
                let reg =
                  /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                if (reg.test(bloodGlucose)) {
                  this.setState({
                    modal1: true,
                  });
                } else {
                  Toast.info('血糖值输入不正确');
                  return false;
                }
              }
            }}
          >
            提交
          </div>
          <Modal
            visible={this.state.modal1}
            transparent
            maskClosable={false}
            className="tips-modal"
          >
            <div className="tips-text">提示</div>
            <div className="comfirm">
              您的血糖记录有更新，是否要同步更新到健康档案中？
            </div>
            <div className="btn-box flex">
              <div
                className="cancel btn"
                onClick={() => {
                  this.submit(0);
                }}
              >
                不同步
              </div>
              <div
                className="submit btn"
                onClick={() => {
                  this.submit(1);
                }}
              >
                确认更新
              </div>
            </div>
          </Modal>
        </div>
      </Page>
    );
  }
}

export default withRouter(SugarForm);
