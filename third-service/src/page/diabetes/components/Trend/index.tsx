import * as React from 'react';
import './index.scss';
import _ from 'lodash';
import moment from 'moment';
const F2 = require('@antv/f2/lib/index');
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');
require('@antv/f2/lib/interaction/pan');

// import moment from 'moment'
require('@antv/f2/lib/interaction/pan');
export interface TrendProps {
  id: string;
  bloodGlucoseList: any;
}

export interface TrendState {
  chart: any;
  time: string;
}

class Trend extends React.Component<TrendProps, TrendState> {
  constructor(props: TrendProps) {
    super(props);
    this.state = {
      chart: null,
      time: ''
    };
  }
  componentDidMount() {
    this.props.bloodGlucoseList.forEach((element: any) => {
      element.dateTime = moment(element.dateTime).format('YYYY.MM.DD');
    });
    if (this.state.chart) {
      this.state.chart.changeData(this.props.bloodGlucoseList);
      this.state.chart.repaint(); // 更新图表
    } else {
      this.init();
    }
  }
  componentWillUpdate(nextProps: any, nextState: any) {
    if (nextProps.bloodGlucoseList !== this.props.bloodGlucoseList) {
      nextProps.bloodGlucoseList.forEach((element: any) => {
        element.dateTime = moment(element.dateTime).format('YYYY.MM.DD');
      });
      console.log(nextState);
      if (this.state.chart) {
        let data: any = [];
        let days: any = [4, 3, 2, 1, 0];
        for (let i in days) {
          data.push(moment().subtract('days', days[i]).format('YYYY.MM.DD'));
        }
        // this.state.chart.changeData(nextProps.bloodGlucoseList);
        // this.state.chart.repaint(); // 更新图表
        this.state.chart.clear(); // 清理所有
        this.state.chart.source(nextProps.bloodGlucoseList, {
          bloodGlucose: {
            tickCount: 3,
            min: 0,
          },
          dateTime:
            this.getDayLength(nextProps.bloodGlucoseList) > 5
              ? {
                  type: 'cat',
                  values: data
                }
              : {
                type: 'cat'
                },
        });

        this.state.chart.axis('dateTime', {
          label: function label() {
            let textCfg: any = {
              fontSize: 12,
              fill: '#333',
              text: ''
            };
            return textCfg;
          },
          line: null,
          grid: () => {
            return {
              stroke: 'rgba(204, 204, 204, 0.5)',
            };
          },
        });
        this.state.chart.axis('bloodGlucose', {
          label: function label() {
            let textCfg: any = {
              fontSize: 12,
              fill: '#ccc'
            };
            return textCfg;
          },
          grid: function grid(text: any) {
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
                stroke: '#cccccc',
              };
            }
          },
        });
        this.state.chart.scale('bloodGlucose', {
          ticks: ['1.7', '3.9', '6.1'],
        });
        this.state.chart
          .line()
          .position('dateTime*bloodGlucose')
          .color('timeQuantum', ['#FF775D', '#8564F5', '#FE9A51', '#467DE8'])
          .shape('dash');
        this.state.chart
          .point()
          .position('dateTime*bloodGlucose')
          .color('timeQuantum', ['#E94C40', '#6851FE', '#FD8825', '#7BB4F5']);
        this.state.chart.render();
      } else {
        this.init();
      }
    }
  }
  getDayLength(list: any) {
    let arr: any = [];
    list.forEach((item: any) => {
      if (!arr.includes(item.dateTime)) {
        arr.push(item.dateTime);
      }
    });
    return arr.length;
  }
  init = () => {
    let that = this;
    let { chart } = this.state;
    let data: any = [];
    let days: any = [4, 3, 2, 1, 0];
    for (let i in days) {
      data.push(moment().subtract('days', days[i]).format('MM.DD'));
    }
    chart = new F2.Chart({
      id: this.props.id,
      pixelRatio: window.devicePixelRatio,
      plugins: ScrollBar,
    });
    chart.source(this.props.bloodGlucoseList, {
      bloodGlucose: {
        tickCount: 3,
        min: 0,
      },
      dateTime:
        this.getDayLength(this.props.bloodGlucoseList) > 5
          ? {
            type: 'cat',
            values: data
            }
          : {
            type: 'cat'
            },
    });
    chart.legend({
      position: 'top',
      titleStyle: {
        fill: '#333333', // 文本的颜色
        fontSize: 14, // 文本大小
      },
      itemWidth: null,
    });
    chart.tooltip({
      showCrosshairs: true,
      custom: true,
      triggerOn: ['touchstart'],
      onChange: function onChange(obj: any) {
        let legend = chart.get('legendController').legends.top[0];
        let tooltipItems = obj.items;
        let legendItems = legend.items;
        let map: any = {};
        legendItems.forEach((item: any) => {
          map[item.name] = _.clone(item);
        });
        tooltipItems.forEach((item: any) => {
          that.setState({time: item.title});
          let name = item.name;
          let value = item.value;
          if (map[name]) {
            map[name].value = value;
          }
        });
        legend.setItems(_.values(map));
      },
      onHide: function onHide() {
        let legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      },
    });
    chart.axis('dateTime', {
      label: function label() {
        let textCfg: any = {
          fontSize: 12,
          fill: '#333',
          text: ''
        };
        return textCfg;
      },
      line: null,
      grid: () => {
        return {
          stroke: 'rgba(204, 204, 204, 0.5)',
        };
      },
    });
    chart.axis('bloodGlucose', {
      label: function label() {
        let textCfg: any = {
          fontSize: 12,
          fill: '#ccc',
        };
        return textCfg;
      },
      grid: function grid(text: any) {
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
            stroke: '#cccccc',
          };
        }
      },
    });
    chart.scale('bloodGlucose', {
      ticks: ['1.7', '3.9', '6.1'],
    });
    chart
      .line()
      .position('dateTime*bloodGlucose')
      .color('timeQuantum', ['#FF775D', '#8564F5', '#FE9A51', '#467DE8'])
      .shape('dash');
    chart
      .point()
      .position('dateTime*bloodGlucose')
      .color('timeQuantum', ['#E94C40', '#6851FE', '#FD8825', '#7BB4F5']);
    chart.interaction('pan');
    // 定义进度条
    chart.scrollBar({
      mode: 'x',
      xStyle: {
        offsetY: -5,
      },
    });
    chart.render();
    this.setState({ chart });
  };
  render() {
    const {time} = this.state;
    return (
      <div className='diabetes-trend'>
        <canvas id={this.props.id} className='container'></canvas>
        <div className="diabetes-time">{time}</div>
      </div>
    );
  }
}

export default Trend;
