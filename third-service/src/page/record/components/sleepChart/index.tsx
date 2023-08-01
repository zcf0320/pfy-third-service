import React, { useEffect } from 'react';
import { healthSleepGetTrend } from '@api/points';
import F2 from '@antv/f2';
import moment from 'moment';
import './index.scss';
interface IProps {
  data:any
}
const SleepChart = (props:IProps) => {
     // 睡眠图表
    //  console.log(props.data,'345');
  useEffect(() => {
    
    let data:any = {};
      if(props.data){
        data.date = props.data;
      }else{
        data.date = moment().format('YYYY-MM-DD');
      }
    
   
    healthSleepGetTrend(data).then((res: any[]) => {
      const arr: { day: string; value: any; state: any; name:string}[] = [];
      res.forEach((item) => {
        arr.push({
          day: moment(item.sleepDate).format('MM-DD'),
          value: item.sleepTime,
          state: item.sleepState,
          name: '时长/h'
        });
      });
      initChat(arr);
    });
  }, [props.data]);
  const initChat = (data: F2.Data<F2.DataRecord>) => {
    const chart = new F2.Chart({
      id: 'myChart',
      pixelRatio: window.devicePixelRatio,
    });
    chart.source(data, {
      value: {
        tickCount: 5,
      },
    });
    chart.axis('value', {
      label: function label(text) {
        const textCfg: any = {
          fontSize: 12,
          fill: '#999999',
          text: text ,
        };
        return textCfg;
      },
      grid: function grid(text: any) {
        if (text === '0') {
          return {
            // lineDash: [0],
            lineWidth: 1,
            stroke: '#ECECEC',
          };
        } else if (text === '3') {
          return {
            // lineDash: [5],
            lineWidth: 1,
            stroke: '#ECECEC',
          };
        } else if (text === '6') {
          return {
            // lineDash: [5],
            lineWidth: 1,
            stroke: '#ECECEC',
          };
        }else if (text === '9') {
          return {
            // lineDash: [5],
            lineWidth: 1,
            stroke: '#ECECEC',
          };
        } else if (text === '12') {
          return {
            // lineDash: [5],
            lineWidth: 1,
            stroke: '#ECECEC',
          };
        }
        
      },
    });
    chart.scale('value', {
      ticks: ['0', '3', '6','9','12'],
    });
   
    chart.axis('day', {
      line: null,
      labelOffset: 10,
      label: function label() {
        const textCfg: any = {
          fontSize: 10,
          fill: '#999999',
        };
        // if (text === '9.29') {
        //   textCfg.fill = '#fff';
        //   textCfg.text = '今天';
        // }
        return textCfg;
      },
    });
    // chart.tooltip({
    //   showItemMarker: false,
    //   onShow: function onShow(ev) {
    //     const items = ev.items;
    //     items[0].name = null;
    //     items[0].name = items[0].title;
    //     items[0].value = items[0].value + ' h';
    //   },
    // });
    chart
      .interval()
      .position('day*value')
      .adjust('dodge')
      .color('name', ( state:any) => {
        if (state === 1) {
          return '#7EAAFF';
        } else if (state === 2) {
          return '#7EAAFF';
        } else if (state === 3) {
          return '#7EAAFF';
        } else {
          return '#7EAAFF';
        }
      });
    // chart.legend(false);
    chart.render();
  };
  return (
    <div className='chart-wrapper'><canvas id='myChart' className='my-chart'></canvas></div>
  );
};

export default SleepChart;