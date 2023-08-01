/** @format */

import Page from '@components/Page';
import * as React from 'react';
import './index.scss';
import moment from 'moment';
import { DiabetsStore, CommonStore } from '@store/interface';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { getUrlParams } from '@utils/filter';
import { DatePicker, List, Toast } from 'antd-mobile';
import { timeCode } from '@utils/enum';
import { saveDaySugar } from '@api/disabets';
import i18n from 'i18n';
export interface BloodSugarProps {
  diabetsStore: DiabetsStore;
  commonStore: CommonStore;
}

export interface BloodSugarState {
  data: any;
  token: string;
  enum: any;
  miniProgram: boolean;
  list: any;
  timeQuantum: any;
  measuringTime: any;
  bloodGlucose: string;
  today: any;
  edit: boolean;
  isToday: boolean;
}

type PropsType = RouteComponentProps & BloodSugarProps;
@inject('diabetsStore', 'commonStore')
@observer
class BloodSugar extends React.Component<PropsType, BloodSugarState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      data: {
        timeQuantum: '',
        bloodGlucose: '',
        measuringTime: null,
        id: null,
        recordTime: null,
        result: '',
      },
      token: '',
      enum: {
        0: i18n.chain.diabetesManagement.goodBlood,
        1: i18n.chain.diabetesManagement.highBlood,
        2: i18n.chain.diabetesManagement.lowBlood,
      },
      miniProgram: false,
      list: {
        凌晨: '凌晨血糖：通常指凌晨 3 ～ 4 点所测的血糖。',
        空腹: '停止进食后6-8小时以上所测的血糖。',
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
      timeQuantum: ['凌晨'],
      measuringTime: new Date(),
      bloodGlucose: '',
      today: new Date(),
      edit: true,
      isToday: true,
    };
  }
  componentDidMount() {
    let that = this;
    // @ts-ignore：无法被执行的代码的错误
    wx.miniProgram.getEnv(function (res) {
      that.setState({
        miniProgram: res,
      });
    });

    this.getData();
    this.setState({
      token: getUrlParams('token'),
    });
  }
  // 获取对应timeCode
  getTimeCode(str: string) {
    let code = '';
    timeCode.forEach((item: any) => {
      if (item.name === str) {
        code = item.timeCode;
      }
    });
    return code;
  }
  getData = () => {
    const { timeQuantum, today } = this.state;
    const serviceRecordId = getUrlParams('serviceRecordId');
    let params = {
      serviceRecordId,
      timeCode: this.getTimeCode(timeQuantum[0]),
      recordTime: moment(today).format('YYYY-MM-DD'),
    };
    this.props.diabetsStore.getSugar(params).then((res: any) => {
      this.setState({
        data: res,
        measuringTime: new Date(res.measuringTime),
        bloodGlucose: res.bloodGlucose,
      });
      if (res.id) {
        this.setState({ edit: false });
      } else {
        this.setState({ edit: true });
      }
    });
  };
  initData = () => {
    const { timeQuantum, bloodGlucose } = this.state.data;
    //0血糖控制良好 1血糖偏高 2血糖偏低
    if (
      timeQuantum === '凌晨' ||
      timeQuantum === '早餐前' ||
      timeQuantum === '午餐前' ||
      timeQuantum === '晚餐前' ||
      timeQuantum === '睡前'
    ) {
      if (bloodGlucose >= 3.9 && bloodGlucose <= 6.1) {
        return 0;
      } else if (bloodGlucose > 6.1) {
        return 1;
      } else if (bloodGlucose < 3.9) {
        return 2;
      }
    } else if (
      timeQuantum === '早餐后' ||
      timeQuantum === '午餐后' ||
      timeQuantum === '晚餐后'
    ) {
      if (bloodGlucose >= 4.4 && bloodGlucose <= 7.8) {
        return 0;
      } else if (bloodGlucose > 7.8) {
        return 1;
      } else if (bloodGlucose < 4.4) {
        return 2;
      }
    } else {
      if (bloodGlucose >= 3.9 && bloodGlucose <= 7.8) {
        return 0;
      } else if (bloodGlucose > 7.8) {
        return 1;
      } else if (bloodGlucose < 3.9) {
        return 2;
      }
    }
  };
  setClass = () => {
    let { timeQuantum, measuringTime, bloodGlucose } = this.state;
    if (timeQuantum.length > 0 && measuringTime && bloodGlucose) {
      return true;
    }
    return false;
  };
  submitToday() {
    const {
      data: { serviceRecordId, id },
      bloodGlucose,
      measuringTime,
      today,
      timeQuantum,
    } = this.state;
    let params = {
      bloodGlucose,
      id,
      measuringTime: new Date(measuringTime).getTime(),
      recordTime: moment(today).format('YYYY-MM-DD'),
      serviceRecordId,
      timeCode: this.getTimeCode(timeQuantum[0]),
    };
    saveDaySugar(params).then(() => {
      this.setState({ edit: false }, () => {
        this.getData();
      });
    });
  }
  render() {
    const {
      data,
      token,
      miniProgram,
      list,
      timeQuantum,
      measuringTime,
      bloodGlucose,
      edit,
      isToday,
    } = this.state;
    let num: any = this.initData();
    let SERVICE_URL: string = window.location.origin;

    return (
      <Page title={i18n.chain.diabetesManagement.title}>
        <div className='blood-sugar sugar-form1'>
          <div className='sugar-form1-card'>
            {/* <div className="top flex"> */}
            {/* <div className="blood-sugar-title">今日血糖</div> */}
            <div className='time'>
              {/* {moment().format('YYYY.MM.DD')} */}
              <DatePicker
                mode='date'
                extra={i18n.chain.common.select}
                value={this.state.today}
                minDate={new Date(2021, 0, 1, 0, 0, 0)}
                maxDate={new Date()}
                onChange={(measuringTime) => {
                  this.setState(
                    {
                      today: measuringTime,
                      isToday:
                        moment(measuringTime).format('YYYY.MM.DD') ===
                        moment(new Date()).format('YYYY.MM.DD')
                          ? true
                          : false,
                    },
                    () => {
                      this.getData();
                    }
                  );
                }}
                className='sugar-form1-picker'>
                <List.Item
                  arrow='horizontal'
                  className={`sugar-form1-list ${measuringTime && 'black'}`}>
                  <div className='blood-sugar-title'>
                    {i18n.chain.diabetesManagement.todayBlood}
                  </div>
                </List.Item>
              </DatePicker>
            </div>
            {/* </div> */}
            <div className='sugar-form1-box flex'>
              {Object.keys(list).map((item) => {
                return (
                  <div className='sugar-form1-item' key={item}>
                    <div
                      className={`sugar-form1-tag ${
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
                        this.setState(
                          {
                            timeQuantum: arr,
                          },
                          () => {
                            this.getData();
                          }
                        );
                      }}>
                      {item}
                    </div>
                  </div>
                );
              })}
            </div>
            {timeQuantum.length > 0 && (
              <div className='sugar-form1-tips flex'>
                <div className='sugar-form1-tips-icon'></div>
                <div className='sugar-form1-tips-text'>
                  {list[timeQuantum.join()]}
                </div>
              </div>
            )}
          </div>
          {!edit ? (
            <div className='blood-sugar-card'>
              <div>
                <div className='sugar flex'>
                  <span className='num'>{data.bloodGlucose}</span>
                  <span className='unit'> mmol/L</span>
                  <div className='line'></div>
                  <span className='time'>
                    {i18n.chain.diabetesManagement.accurateTime}
                    {moment(data.measuringTime).format('HH:mm')}
                  </span>
                </div>
                <div className='conclusion'>
                  {i18n.chain.diabetesManagement.conclusion}
                  {this.state.enum[num]}
                </div>
                <div className='text'>{data.result}</div>
              </div>
              {isToday ? (
                <div
                  className='record'
                  onClick={() => {
                    this.setState({ edit: true });
                  }}>
                  {i18n.chain.diabetesManagement.editToday}
                </div>
              ) : null}
            </div>
          ) : (
            <div className='sugar-form1-content'>
              {!isToday && !bloodGlucose ? (
                <div className='no-data'>
                  <div className='no-data-img'></div>
                  <div className='no-data-text'>
                    {i18n.chain.diabetesManagement.noData}
                  </div>
                </div>
              ) : (
                <div>
                  <DatePicker
                    mode='time'
                    extra={i18n.chain.common.select}
                    value={this.state.measuringTime}
                    onChange={(measuringTime) => {
                      this.setState({ measuringTime });
                    }}
                    className='sugar-form1-picker'>
                    <List.Item
                      arrow='horizontal'
                      className={`sugar-form1-list ${
                        measuringTime && 'black'
                      }`}>
                      {i18n.chain.diabetesManagement.accurateTime}
                    </List.Item>
                  </DatePicker>
                  <div className='sugar-form1-line'></div>
                  <div className='sugar-form1-items flex'>
                    <div className='sugar-form1-items-left'>
                      <div>{i18n.chain.diabetesManagement.bloodValue}</div>
                    </div>
                    <div className='num-right'>
                      <input
                        placeholder={i18n.chain.common.input}
                        type='number'
                        className='num-input'
                        value={bloodGlucose ? bloodGlucose : ''}
                        onChange={(e) => {
                          this.setState({
                            bloodGlucose: e.target.value,
                          });
                        }}></input>
                    </div>
                  </div>
                </div>
              )}
              {isToday ? (
                <div
                  className={`sugar-form1-btn ${
                    this.setClass() && 'btn-active'
                  }`}
                  onClick={() => {
                    if (this.setClass()) {
                      let { bloodGlucose } = this.state;
                      let reg =
                        /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                      if (reg.test(bloodGlucose)) {
                        this.submitToday.call(this);
                      } else {
                        Toast.info(i18n.chain.diabetesManagement.errorBlood);
                        return false;
                      }
                    }
                  }}>
                  {i18n.chain.button.submit}
                </div>
              ) : null}
            </div>
          )}

          <div className='blood-sugar-tcard'>
            <div
              className='blood-sugar-tcard-l'
              onClick={() => {
                const url = `/diabetes/disbetesTrend?serviceRecordId=${getUrlParams(
                  'serviceRecordId'
                )}&token=${token}`;

                this.props.history.push(url);
              }}>
              <div className='tcard-l-img'></div>
              <div className='tcard-title'>
                {i18n.chain.diabetesManagement.trend}
              </div>
            </div>
            <div
              className='blood-sugar-tcard-r'
              onClick={() => {
                const url = `/diabetes/DisbetesStatics?serviceRecordId=${getUrlParams(
                  'serviceRecordId'
                )}&token=${token}`;

                this.props.history.push(url);
              }}>
              <div className='tcard-r-img'></div>
              <div className='tcard-title'>
                {i18n.chain.diabetesManagement.statistics}
              </div>
            </div>
          </div>
          <div className='blood-sugar-card'>
            <div className='blood-sugar-title'>
              {i18n.chain.diabetesManagement.management}
            </div>
            <div className='blood-sugar-box flex'>
              <div
                className='blood-sugar-icon flex'
                onClick={() => {
                  const url = '/MedicationReminder/pages/index/index';

                  if (miniProgram) {
                    // @ts-ignore：无法被执行的代码的错误
                    wx.miniProgram.navigateTo({
                      url: url,
                    });
                  }
                  window.location.href = `${SERVICE_URL}#${url}`;
                }}>
                <div className='blood-sugar-img drug'></div>
                <div className='blood-sugar-text'>
                  {i18n.chain.diabetesManagement.medication}
                </div>
              </div>
              <div
                className='blood-sugar-icon flex'
                onClick={() => {
                  const url = '/Healthy/pages/foodLibrary/index';

                  if (miniProgram) {
                    // @ts-ignore：无法被执行的代码的错误
                    wx.miniProgram.navigateTo({
                      url: url,
                    });
                  }
                  window.location.href = `${SERVICE_URL}#${url}`;
                }}>
                <div className='blood-sugar-img food'></div>
                <div className='blood-sugar-text'>
                  {i18n.chain.diabetesManagement.foodLibrary}
                </div>
              </div>
              <div
                className='blood-sugar-icon flex'
                onClick={() => {
                  this.props.history.push('/record/recordDetail?title=运动');
                }}>
                <div className='blood-sugar-img sport'></div>
                <div className='blood-sugar-text'>
                  {i18n.chain.diabetesManagement.recordMotion}
                </div>
              </div>
              <div
                className='blood-sugar-icon flex'
                onClick={() => {
                  const url = `/Healthy/pages/diabetesSymptom/index?serviceRecordId=${getUrlParams(
                    'serviceRecordId'
                  )}`;

                  if (miniProgram) {
                    // @ts-ignore：无法被执行的代码的错误
                    wx.miniProgram.navigateTo({
                      url: url,
                    });
                  }
                  window.location.href = `${SERVICE_URL}#${url}`;
                }}>
                <div className='blood-sugar-img today'></div>
                <div className='blood-sugar-text'>
                  {i18n.chain.diabetesManagement.todaySymptoms}
                </div>
              </div>
              <div
                className='blood-sugar-icon flex'
                onClick={() => {
                  const url = `/diabetes/index?serviceRecordId=${getUrlParams(
                    'serviceRecordId'
                  )}&token=${token}`;

                  this.props.history.push(url);
                }}>
                <div className='blood-sugar-img file'></div>
                <div className='blood-sugar-text'>
                  {i18n.chain.diabetesManagement.diabetesArchives}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(BloodSugar);
