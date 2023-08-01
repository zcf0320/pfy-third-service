import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import F2 from '@antv/f2/lib/index-all';
import './index.scss';
import UtilsMoment from '@utils/moment';

type Props = {
  detail: any;
};
type State = {
  currentNum: number | string;
  selectedNum: any;
  week: any;
  index: number;
  data: any;
  height: string;
  width: string;
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
      width: '',
      height: '',
    };
  }
  init() {
    const _this = this;
    let totalScore = this.props.detail.totalScore || '-';
    const chart = new F2.Chart({
      id: 'mountNode',
      pixelRatio: window.devicePixelRatio,
      height: 210,
    });
    chart.source(this.state.data, {
      value: {
        min: 0,
        max: 100,
        nice: false,
        ticks: ['80', '100'],
      },
    });
    chart.coord('polar');
    chart.tooltip(false); // 关闭 tooltip
    chart.axis('value', {
      grid: (text) => {
        if (text === '100') {
          return {
            stroke: 'l(0) 0:#52C4FA 1:#6851FE',
            strokeOpacity: '0.5',
            type: 'arc',
            lineWidth: 10,
          };
        }
      },
      label: null,
      line: null,
    });
    chart.axis('name', {
      grid: {
        lineDash: null,
        lineWidth: 0,
      },
      label: () => {
        const cfg = {
          fill: '#333',
          fontSize: 12,
        };
        return cfg;
      },
    });
    chart
      .area()
      .position('name*value')
      .color('#ABC6FF')
      .style({
        fillOpacity: 0.2,
      })
      .animate({
        appear: {
          animation: 'groupWaveIn',
        },
      });
    chart
      .line()
      .position('name*value')
      .color('transparent')
      .size(1)
      .animate({
        appear: {
          animation: 'groupWaveIn',
        },
      });
    chart
      .point()
      .position('name*value')
      .color('value', (value: any) => {
        return value < 80 ? '#FF9067' : '#62FFE6';
      })
      .animate({
        appear: {
          delay: 300,
        },
      });

    chart.guide().html({
      position: ['50%', '50%'],
      html:
        '<div style="color: #333;white-space: nowrap;text-align:center;">' +
        '<p style="font-size: 14px;margin:0 0 4px 0;">健康评分</p>' +
        `<p style="font-size: 28px;margin:0;font-weight: bold;">${totalScore}</p>` +
        '</div>',
    });
    chart.render();
    _this.getStyle();
  }
  getStyle = () => {
    const dom = document.getElementById('mountNode');
    if (dom && dom.style) {
      this.setState({ width: dom.style.width, height: dom.style.height });
    }
  };
  formatData() {
    const { detail } = this.props;
    let data = [
      {
        name: '睡眠',
        value: 100,
      },
      {
        name: '运动',
        value: 100,
      },
      {
        name: '压力',
        value: 60,
      },
      {
        name: '习惯',
        value: 100,
      },
      {
        name: 'BMI',
        value: 80,
      },
      {
        name: '营养',
        value: 100,
      },
    ];
    data[0].value = detail.sleepScore;
    data[1].value = detail.sportScore;
    data[2].value = detail.stressScore;
    data[3].value = detail.habitScore;
    data[4].value = detail.bmiScore;
    data[5].value = detail.nutritionScore;
    this.setState({ data }, () => {
      this.init();
    });
  }
  componentDidUpdate(prevProps: Props) {
    if (prevProps.detail !== this.props.detail) {
      this.formatData();
    }
  }
  // componentDidMount(){
  //     this.formatData()
  // }
  render() {
    return (
      <div className="chart-wrapper">
        <canvas id="mountNode"></canvas>
      </div>
    );
  }
}
export default withRouter(Chart);
