/* eslint-disable react-hooks/rules-of-hooks */
import React,{useEffect,useImperativeHandle} from 'react';
import F2 from '@antv/f2';
import moment from 'moment';
import { healthGetSportGetTrend } from '@api/points';
import './index.scss';

interface IProps {
  data:any;
  onRef:any;
}
const MotionChart = (props:IProps,) => {
    useEffect(() => {
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.data]);
      useImperativeHandle(props.onRef,()=>{
         return {
          getData
         };
      });
    const getData = () => {
      let data:any = {};
      if(props.data){
        data.date = props.data;
      }else{
        data.date = moment().format('YYYY-MM-DD');
      }
      healthGetSportGetTrend(data).then((res: any) => {
        console.log(data);
        
        const arr: { day: string; value: any;  name:string}[] = [];
        const arrTime: { day: string; value: any;  name:string}[] = [];
      //消耗能量图表
        res.sportCalorieVO.dateStr.forEach((item,index) => {
          // item..forEach((v)=>{
              arr.push({
                  day: item,
                  value:res.sportCalorieVO.calories[index],
                  name: '消耗/kcal'
                });
        });
      //   运动时长图表
      res.sportDurationVO.dateStr.forEach((item,index) => {
          // item..forEach((v)=>{
              arrTime.push({
                  day: item,
                  value:res.sportDurationVO.durations[index],
                  name: '时长/min'
                });
        });
        initChat(arr);
        initTimeChat(arrTime);
      });
    };
     
      //消耗能量图表
    const initChat = (data: F2.Data<F2.DataRecord>) => {
        const chart = new F2.Chart({
          id: 'myallCalorieChart',
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
  
        });
        chart.axis('day', {
          line: null,
          labelOffset: 10,
          label: function label() {
            const textCfg: any = {
              fontSize: 10,
              fill: '#999999',
            };
          
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
          .color('name', );
        // chart.legend(false);
        chart.render();
      };
    //   运动时长图表
      const initTimeChat =  (data: F2.Data<F2.DataRecord>) => {
        const chart = new F2.Chart({
          id: 'myallSportDurationChart',
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
       
        chart.axis('day', {
          line: null,
          labelOffset: 10,
          label: function label() {
            const textCfg: any = {
              fontSize: 10,
              fill: '#999999',
            };
          
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
          .color('name', );
        // chart.legend(false);
        chart.render();
      };
  return (
    <div className='chart-wrapper'>
        <div><canvas id='myallCalorieChart' className='myallCalorie-chart'></canvas></div>
        <div><canvas id='myallSportDurationChart' className='myallSportDuration-chart'></canvas></div>
   </div>
  );
};

export default MotionChart;