
import * as React from 'react';
import './index.scss';
import { getChartRecord } from '@api/healthRecord';
import F2 from '@antv/f2';

export interface IProps {
  id: string;
  chartCode: string;
  onRef: Function;
}

export interface IState {
  chart: any;
  dataSource: Array<any>;
  dateStr: Array<any>;
  oneNum: Array<any>;
  twoNum: Array<any>;
}

class RecordChart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      chart: null,
      dataSource: [],
      dateStr: [],
      oneNum: [],
      twoNum: [],
    };
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    this.getData();
    if (this.state.chart) {
      this.state.chart.changeData(this.state.dataSource);
      this.state.chart.repaint(); // 更新图表
    } else {
      this.init();
    }
  }

  getData = () => {
    getChartRecord(this.props.chartCode).then((result) => {
      if (this.props.chartCode !== 'BLOOD_PRESSURE') {
        const data = [] as any;
        result.dateStr.forEach((item, index) => {
          data.push({
            time: item,
            yData: result.oneNum[index],
            name:
              this.props.chartCode === 'WEIGHT_HEIGHT'
                ? '体重/kg'
                : this.props.chartCode === 'HEART_RATE'
                ? '心率'
                : '血糖',
          });
        });
        this.setState(
          {
            dataSource: data,
          },
          () => {
            this.init();
          }
        );
      } else {
        const data = [] as any;
        result.dateStr.forEach((item, index) => {
          data.push({
            time: item,
            yData: result.oneNum[index],
            name: '收缩压',
          });
          data.push({
            time: item,
            yData: result.twoNum[index],
            name: '舒张压',
          });
        });

        this.setState(
          {
            dataSource: data,
          },
          () => {
            this.init();
          }
        );
      }
    });
  };

  init = () => {
    const { dataSource } = this.state;
    const chart = new F2.Chart({
      id: this.props.id,
      pixelRatio: window.devicePixelRatio,
    });
    chart.source(dataSource, {
      yData: {
        tickCount: 5,
      },
    });

    chart.axis('yData', {
      label: function label(text) {
        const textCfg: any = {
          fontSize: 10,
          fill: '#999999',
          text: text,
        };
        return textCfg;
      },
    });

    chart.axis('time', {
      labelOffset: 10,
      label: function label(text) {
        const textCfg: any = {
          fontSize: 10,
          fill: '#999999',
          text,
        };
        return textCfg;
      },
    });

    chart
      .interval()
      .position('time*yData')
      .adjust('dodge')
      .color('name', ['#7EAAFF', '#F7654E']);
    chart.render();
    this.setState({ chart });
  };
  render() {
    return (
      <div className='chart-wrapper'>
        <canvas id={this.props.id} className='chart-container'></canvas>
      </div>
    );
  }
}

export default RecordChart;