import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import F2 from '@antv/f2/lib/index-all';
import './index.scss';
import UtilsMoment from '@utils/moment';
import { toJS } from 'mobx';
import moment from 'moment';
import _ from 'lodash';

type Props = {
  recordList: any;
  type: number | string;
  getList: Function;
  setToday: Function;
};
type State = {
  currentNum: number | string;
  selectedNum: any;
  week: any;
  index: number;
  data: any;
  unix: any;
  arr: any;
  chart: any;
};
type PropsType = RouteComponentProps & Props;

class Chart extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentNum: '--',
      selectedNum: [],
      week: UtilsMoment.getLastWeek(0),
      index: 0,
      data: [],
      unix: [],
      arr: [],
      chart: null,
    };
  }
  init() {
    let _this = this;
    var Shape = F2.Shape;
    var Util = F2.Util;
    Shape.registerShape('interval', 'text', {
      draw: function draw(cfg: any, container: any) {
        var points = this.parsePoints(cfg.points);
        // points 顶点的顺序
        // 1 ---- 2
        // |      |
        // 0 ---- 3
        var style = Util.mix(
          {
            fill: cfg.color,
            z: true, // 需要闭合
          },
          cfg.style
        );
        var intervalShape = container.addShape('rect', {
          attrs: Util.mix(
            {
              x: points[1].x,
              y: points[1].y,
              width: 6,
              height: points[0].y - points[1].y,
            },
            style
          ),
        });
        container.sort();
        return [intervalShape];
      },
    });
    var chart = new F2.Chart({
      id: 'container',
      pixelRatio: window.devicePixelRatio,
      height: 372,
    });
    this.state.data.forEach((item: any) => {
      item.value = Number(item.value);
    });
    chart.source(this.state.data);
    chart.legend(false);
    chart.tooltip({
      showCrosshairs: false, //触摸指示线
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        const items: any = obj.items;
        let current: any = [];
        items.forEach((item: any) => {
          current.push(item.value);
        });
        _this.setState({
          selectedNum: current,
        });
      },
      onHide: function onHide() {
        _this.setState({
          selectedNum: [],
        });
      },
    });
    chart.axis('time', {
      line: null,
      labelOffset: 10,
      label: function label(text) {
        const textCfg: any = {
          fontSize: 12,
          fill: '#333',
        };
        if (text === '今天') {
          textCfg.fill = '#FF5A47';
        }
        return textCfg;
      },
    });

    chart.axis('value', {
      label: function label() {
        let textCfg: any = {
          fontSize: 12,
          fill: '#ccc',
        };
        return textCfg;
      },
      grid: function grid(text) {
        if (_this.props.type === '1') {
          if (text === '60') {
            return {
              lineDash: [5],
              lineWidth: 1,
              stroke: '#4460E1',
            };
          } else if (text === '120') {
            return {
              lineDash: [5],
              lineWidth: 1,
              stroke: '#FEBD44',
            };
          } else if (text === '90') {
            return {
              lineDash: [5],
              lineWidth: 1,
              stroke: '#27E0CD',
            };
          } else if (text === '30') {
            return {
              lineDash: [5],
              lineWidth: 1,
              stroke: '#ccc',
            };
          }
        } else {
          if (text === '3.9') {
            return {
              lineDash: [5],
              lineWidth: 1,
              stroke: '#4460E1',
            };
          } else if (text === '6.1') {
            return {
              lineDash: [5],
              lineWidth: 1,
              stroke: '#FEBD44',
            };
          } else if (text === '1.7') {
            return {
              lineDash: [5],
              lineWidth: 1,
              stroke: '#ccc',
            };
          }
        }
      },
    });
    chart.scale('value', {
      // min: _this.props.type == 1 ? 45 : 2.8,
      max: _this.props.type === '1' ? 135 : 7.2,
      min: 0,
      ticks:
        _this.props.type === '1'
          ? ['30', '60', '90', '120']
          : ['1.7', '3.9', '6.1'],
    });
    chart
      .interval()
      .position('time*value')
      .shape('text')
      .adjust({
        type: 'dodge',
        marginRatio: 0.3,
      })
      .style({
        radius: [6, 6, 6, 6],
      })
      .color('type', (level: any) => {
        if (level === '收缩压') {
          return 'l(90) 0:#FFB9D0 1:#6851FE';
        } else {
          return 'l(90) 0:#FFCBA4 1:#E94C40';
        }
      });
    chart.render();

    this.setState({ chart });
  }
  clickLeft = () => {
    this.setState(
      (state) => ({
        index: state.index + 1,
        week: UtilsMoment.getLastWeek(this.state.index + 1),
      }),
      () => {
        this.props.getList(this.state.index);
        this.getDate(this.state.index);
      }
    );
  };
  clickRight = () => {
    if (this.state.index > 0) {
      this.setState(
        (state) => ({
          index: state.index - 1,
          week: UtilsMoment.getLastWeek(this.state.index - 1),
        }),
        () => {
          this.props.getList(this.state.index);
          this.getDate(this.state.index);
        }
      );
    }
  };
  formatData() {
    //0血糖 1血压
    let list = toJS(this.props.recordList);
    let today = UtilsMoment.getToday();
    let data: any = [];
    let { unix } = this.state;
    const newLocal = true;
    if (newLocal) {
      unix.forEach((item: any) => {
        for (const i in list) {
          if (list[i].createTime === Number(item.createTime)) {
            item.diastolicBloodPressure = list[i].diastolicBloodPressure;
            item.fastingBloodGlucose = list[i].fastingBloodGlucose;
            item.systolicBloodPressure = list[i].systolicBloodPressure;
          }
        }
      });
      if (this.props.type === '0') {
        unix.forEach((element: any) => {
          data.push({
            value: element.fastingBloodGlucose
              ? element.fastingBloodGlucose
              : 0,
            time:
              today === element.createTime
                ? '今天'
                : UtilsMoment.formatDate(element.createTime),
            type: '血糖',
          });
          if (today === element.createTime) {
            this.setState({
              currentNum: element.fastingBloodGlucose || '--',
            });
          }
        });
      } else {
        unix.forEach((element: any) => {
          data.push({
            value: element.systolicBloodPressure
              ? element.systolicBloodPressure
              : 0,
            time:
              today === element.createTime
                ? '今天'
                : UtilsMoment.formatDate(element.createTime),
            type: '收缩压',
          });
          data.push({
            value: element.diastolicBloodPressure
              ? element.diastolicBloodPressure
              : 0,
            time:
              today === element.createTime
                ? '今天'
                : UtilsMoment.formatDate(element.createTime),
            type: '舒张压',
          });
          if (today === element.createTime) {
            if (element.systolicBloodPressure) {
              this.setState({
                currentNum: `${element.systolicBloodPressure}/${element.diastolicBloodPressure}`,
              });
            } else {
              this.setState({
                currentNum: '--',
              });
            }
          }
        });
      }
    } else {
      for (let i in unix) {
        unix[i].time =
          today === unix[i].createTime
            ? '今天'
            : UtilsMoment.formatDate(unix[i].createTime);
      }
      data = unix;
    }
    this.setState({ data }, () => {
      if (this.state.chart) {
        // this.state.chart.changeData(this.state.data);
        this.state.chart.clear();
        this.init();
      } else {
        this.init();
      }
      if (this.state.index === 0) {
        //设置今天血压血糖
        this.props.setToday(this.state.currentNum);
      }
    });
  }
  getDate(index: number) {
    let start = UtilsMoment.getLastWeek(index)[0]; //开始时间
    let start_time = moment(start);

    //开始计算这两个时间段相差的天数
    let diff_times = 7;
    //lodash中内置的循环器，可以指定循环次数
    //再定义一个数组，用来存放相差的每一天日期
    let arr: any = [];
    let unix: any = [];
    _.times(diff_times, (i: number) => {
      const new_start_time = moment(start_time); //每次重新初始化开始时间，因为我碰到了深拷贝的问题
      let time: any = new_start_time.add(i, 'days').format('x');

      arr.push(new_start_time.add(i, 'days').format('MM.DD')); //数组下标从０开始，可以用它进行每次的天数递增

      unix.push({
        createTime: time,
      }); //数组下标从０开始，可以用它进行每次的天数递增
    });
    this.setState({ unix, arr });
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.recordList !== this.props.recordList) {
      this.formatData();
    }
  }
  componentDidMount() {
    this.getDate(0);
  }

  render() {
    const { selectedNum, currentNum, week, index } = this.state;
    const { type } = this.props;
    let first = UtilsMoment.formatIos(week[0]);
    let last = UtilsMoment.formatIos(week[1]);
    return (
      <div className='mobile-container view-chart'>
        <div className='mobile-header flex-start'>
          <div className='mobile-title'>数据趋势</div>
          <div className='mobile-legend flex-start'>
            {type === '1' && (
              <div className='pruple flex-start'>
                <span></span>
                <div>收缩压</div>
              </div>
            )}
            <div className='pink flex-start'>
              <span></span>
              <div>{type === '1' ? '舒张压' : '血糖'}</div>
            </div>
          </div>
        </div>
        <div className='num'>
          {selectedNum.length ? selectedNum.join('/') : currentNum}
          {type === '1' ? 'mmHg' : 'mmol/L'}
        </div>
        <div className='mobile-content'>
          <canvas id='container' />
        </div>
        <div className='footer'>
          <div className='left arrow' onClick={this.clickLeft}></div>
          <div className='time'>
            {first} - {last}
          </div>
          <div
            className={`arrow ${index === 0 ? 'default' : 'right'}`}
            onClick={this.clickRight}></div>
        </div>
      </div>
    );
  }
}
export default withRouter(Chart);
