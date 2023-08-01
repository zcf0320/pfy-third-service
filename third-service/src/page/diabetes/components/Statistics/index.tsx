import * as React from 'react';
import './index.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import i18n from 'i18n';
const F2 = require('@antv/f2/lib/index');
export interface TrendProps {
  data: any;
  data1: any;
  data2: any;
  index: number;
  title: string;
  countTime: any;
  bloodGlucoseAvg: any;
}

export interface TrendState {
  diabetesData: any;
  chart: any;
  chart1: any;
  chart2: any;
}
type PropsType = RouteComponentProps & TrendProps;

class DiabetesStatics extends React.Component<PropsType, TrendState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      diabetesData: {},
      chart: null,
      chart1: null,
      chart2: null,
    };
  }
  componentDidUpdate(nextProps: any, nextState: any) {
    if (nextProps !== this.props) {
      console.log(nextState);
      if (this.state.chart) {
        this.state.chart.changeData(nextProps.data);
        this.state.chart1.changeData(nextProps.data1);
        this.state.chart2.changeData(nextProps.data2);
      } else {
        this.init();
      }
    }
  }
  init() {
    const { props } = this;
    if (props.bloodGlucoseAvg === 0) {
      return;
    }
    let map: any = {};
    props.data.forEach((obj: any) => {
      map[obj.name] = obj.countTime + '次';
      obj.a = '1';
    });
    let chart = new F2.Chart({
      id: `mountNode${props.index}`,
      pixelRatio: window.devicePixelRatio,
      padding: [16, 'auto', 16, 0],
    });
    chart.source(props.data, {
      countTime: {
        formatter: function formatter(val: any) {
          return val + '次';
        },
      },
    });
    chart.tooltip(false);
    chart.legend({
      position: 'right',
      verticalAlign: 'bottom',
      itemFormatter: function itemFormatter(val: any) {
        return val + '    ' + map[val];
      },
      titleStyle: {
        fill: '#333333', // 文本的颜色
        fontSize: 14, // 文本大小
      },
      marker: { symbol: 'square', radius: 5 },
      offsetY: 0,
    });
    chart.coord('polar', {
      transposed: true,
      innerRadius: 0.75,
      radius: 1,
    });
    chart.axis(false);
    chart
      .interval()
      .position('a*countTime')
      .color('name', ['#FF775D', '#5470F0', '#FEBD44'])
      .adjust('stack');
    chart.guide().html({
      position: ['50%', '50%'],
      html: `<div class="chart-content"><div class="chart-content-top"><span>${props.bloodGlucoseAvg}</span>mmol/L</div><div class="chart-content-bottom">平均血糖</div></div>`,
    });
    chart.render();

    //柱状图左边

    let chart1 = new F2.Chart({
      id: `mountNodeL${props.index}`,
      pixelRatio: window.devicePixelRatio,
      padding: [23, 30, 17, 30],
    });
    let Shape = F2.Shape;
    let Util = F2.Util;
    Shape.registerShape('interval', 'text', {
      draw: function draw(cfg: any, container: any) {
        let points = this.parsePoints(cfg.points);
        // points 顶点的顺序
        // 1 ---- 2
        // |      |
        // 0 ---- 3
        let style = Util.mix(
          {
            fill: cfg.color,
            z: true, // 需要闭合
          },
          cfg.style
        );
        let intervalShape = container.addShape('rect', {
          attrs: Util.mix(
            {
              x: points[1].x,
              y: points[1].y,
              width: points[2].x - points[1].x,
              height: points[0].y - points[1].y,
            },
            style
          ),
        });

        let origin = cfg.origin._origin; // 获取对应的原始数据记录
        let textShape = container.addShape('text', {
          zIndex: 1,
          attrs: {
            x: (points[1].x + points[2].x) / 2,
            y: points[1].y - 5, // 往上偏移 5 像素
            text: origin['bloodGlucose'],
            fill: '#333333',
            textAlign: 'center',
            textBaseline: 'bottom',
            fontSize: 12, // 字体大小
          },
        });
        container.sort();
        return [intervalShape, textShape];
      },
    });
    chart1.source(props.data1, {
      bloodGlucose: {
        tickCount: 5,
      },
    });
    chart1.tooltip(false);
    chart1.legend(false);
    // 绘制文本
    props.data1.forEach((obj: any) => {
      chart1.guide().text({
        position: [obj.name, 'min'],
        content: obj.name,
        style: {
          textAlign: 'start',
          textBaseline: 'bottom',
          fill: '#333333',
          fontSize: 12,
        },
        offsetY: 17,
        offsetX: -18,
      });
    });
    chart1.axis(false);
    chart1
      .interval()
      .position('name*bloodGlucose')
      .shape('text')
      .color('name', ['#FF775D', '#FEBD44']);
    chart1.render();

    //柱状图右边

    let chart2 = new F2.Chart({
      id: `mountNodeR${props.index}`,
      pixelRatio: window.devicePixelRatio,
      padding: [23, 10, 17, 10],
    });
    chart2.source(props.data2, {
      bloodGlucose: {
        tickCount: 5,
      },
    });
    chart2.tooltip(false);
    chart2.legend(false);
    // 绘制文本
    props.data2.forEach((obj: any) => {
      chart2.guide().text({
        position: [obj.name, 'min'],
        content: obj.name,
        style: {
          textAlign: 'start',
          textBaseline: 'bottom',
          fill: '#333333',
          fontSize: 12,
        },
        offsetY: 17,
        offsetX: -10,
      });
    });
    chart2.axis(false);
    chart2
      .interval()
      .position('name*bloodGlucose')
      .shape('text')
      .color('#4A6AFD');
    chart2.render();
    this.setState({ chart, chart1, chart2 });
  }
  render() {
    const { props } = this;
    return (
      <div className='diabetes-statics-card'>
        <div className='card-title'>{props.title}</div>
        {props.bloodGlucoseAvg === 0 ? (
          <div className='no-data'>
            <div className='no-data-img'></div>
            <div className='no-data-text'>{i18n.chain.diabetesManagement.noBloodData}</div>
          </div>
        ) : (
          <div>
            <div className='card-center'>
              <div className='sum-count'>
                {i18n.chain.diabetesManagement.total}<span>{props.countTime || 0}</span>
              </div>
              <canvas
                id={`mountNode${props.index}`}
                className='mountNode'></canvas>
            </div>
            <div className='card-bottom'>
              <div className='card-bottom-l'>
                <div className='card-bottom-title'>{i18n.chain.diabetesManagement.maximum}</div>
                <canvas
                  id={`mountNodeL${props.index}`}
                  className='card-bottom-chart'></canvas>
              </div>
              <div className='card-bottom-r'>
                <div className='card-bottom-title'>{i18n.chain.diabetesManagement.average}</div>
                <canvas
                  id={`mountNodeR${props.index}`}
                  className='card-bottom-chart'></canvas>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(DiabetesStatics);
