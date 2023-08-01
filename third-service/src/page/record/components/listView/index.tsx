import { ListView } from 'antd-mobile';
import React from 'react';
import { timeFormat } from '@utils/time';
import healthDetailOk from '@assert/images/health-detail-ok.png';
import healthDetailReduce from '@assert/images/health-detail-reduce.png';
import healthDetailRise from '@assert/images/health-detail-rise.png';
import './index.scss';

interface ListProps {
    list: any[]; // 数据源
    total: number; // 总量
    callback:Function;
    title:string;
  }


class List extends React.Component<ListProps> {
  state: {
    dataSource: any;
    // isLoading: true,
    height: number; list: never[];
  };
  props: any;
 
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      // isLoading: true,
      height: document.documentElement.clientHeight * 3.5 / 4,
      list:[],
    };
  }

  componentDidMount() {
    const {dataSource}:any = this.state;
    setTimeout(() => {
      this.setState({
        dataSource: dataSource.cloneWithRows([...this.props.list]),
        // isLoading: false,
      });
    }, 600);
    
  }
  setState(arg0: { dataSource: any; }) {
    throw new Error('Method not implemented.');
  }

  onEndReached = (event) => {
    const {dataSource,}:any = this.state;
    // if (isLoading) {
    //   return;
    // }
    console.log('reach end', event);
      this.setState({
        dataSource: dataSource.cloneWithRows([...this.props.list]),
        // isLoading: false,
      });
      
          if (this.props.list.length=== this.props.total){
            return;
          } else {
            this.props.callback && this.props.callback();
          }
  }

  render() {
    const {dataSource,height}:any = this.state;
    let index = this.props.list.length - 1;
    const row = (rowData,rowID) => {
      if (index < 0) {
        index = this.props.list.length - 1;
      }
      // const obj = data[index--];
      return (
        <div key={rowID} className='record-content-list'>
 
            {
             this.props.title === '基础数据'?
             <div className='record-content flex-between'>
             <div className='flex-center'>
               {
                 rowData.bmi > 23.9 ?
                 <img
                   alt=''
                   className='record-content-img'
                   src={healthDetailRise}
                 />
                 :null
               }
                {
                 rowData.bmi >= 18.5 && rowData.bmi <= 23.9 ?
                 <img
                   alt=''
                   className='record-content-img'
                   src={healthDetailOk}
                 />
                 :null
               }
                 {
                 rowData.bmi < 18.5 ?
                 <img
                 alt=''
                   className='record-content-img'
                   src={healthDetailReduce}
                 />
                 :null
               }
               <div className='flex-center' >
                 <div className='record-content-title '>
                   <span className='record-top-content-title'>{rowData.weight || '-'}kg</span>
                   <span className='record-top-content-text'>BMI  {rowData.bmi || '-'}</span>
                 </div>
               </div>
             </div>
             <div className='record-content-time'>{timeFormat(rowData.updateTime,'y-m-d h:m:s')}</div>
           </div>
             :
             null
         }

       {
             this.props.title === '血糖'?
             <div className='record-content flex-between' >
                        <div className='flex-center'>
                          {
                            rowData.fastingBloodGlucose > 6.1 ?
                            <img
                            alt=''
                              className='record-content-img'
                              src={healthDetailRise}
                            />
                            :null 
                          }
                           {

               rowData.fastingBloodGlucose <= 6.1 &&rowData.fastingBloodGlucose >= 3.9 ?
                            <img
                            alt=''
                              className='record-content-img'
                              src={healthDetailOk}
                            />
                            :null 
                          }
                           {
                            rowData.fastingBloodGlucose < 3.9 ?
                            <img
                            alt=''
                              className='record-content-img'
                              src={healthDetailReduce}
                            />
                            :null 
                          }
                          <div className='flex-center'>
                            <div className='record-content-title '>
                              <span className='record-top-content-title'>{rowData.fastingBloodGlucose || '-'}</span>
                              <span className='record-top-content-text'>{rowData.timeQuantum || '-'}</span>
                            </div>
                          </div>
                        </div>
                        <div className='record-content-time'>{timeFormat(rowData.updateTime,'y-m-d h:m:s')}</div>
                      </div>
             :
             null
         }

         {
                  this.props.title === '血压' ?
                  <div className='record-content flex-between' >
                        <div className='flex-center'>
                          {
                            rowData.systolicBloodPressure > 139 ?
                            <img
                            alt=''
                            className='record-content-img'
                            src={healthDetailRise}/> 
                            :null
                          }
                          {
                           rowData.systolicBloodPressure >= 90 && rowData.systolicBloodPressure <= 139 ?
                            <img
                            alt=''
                            className='record-content-img'
                            src={healthDetailOk}/> 
                            :null
                          }
                             {
                           rowData.systolicBloodPressure < 90  ?
                            <img
                            alt=''
                            className='record-content-img'
                            src={healthDetailReduce}/> 
                            :null
                          }
                          <div className='flex-center'>
                            <div className='record-content-title '>
                              <span className='record-top-content-title'>{rowData.systolicBloodPressure || '-'}</span>
                              <span className='record-top-content-text'>收缩压</span>
                            </div>
                            <div className='record-content-title'>
                                <span className='record-top-content-title'>{rowData.diastolicBloodPressure || '-'}</span>
                                <span className='record-top-content-text'>舒张压</span>
                            </div>
                          </div>
                        </div>

                        <div className='record-content-time'>{timeFormat(rowData.updateTime,'y-m-d h:m:s')}</div>
                      </div>
           :
           null
         }
         {
          this.props.title === '心率' ?
          <div className='record-content flex-between' >
          <div className='flex-center'>

           { rowData.heartRate <= 100 && rowData.heartRate >= 60 ?
             <img
             alt=''
               className='record-content-img'
               src={healthDetailOk}
             />
             :null
           }
           {
            rowData.heartRate > 100 ?
            <img
            alt=''
              className='record-content-img'
              src={healthDetailRise}
            />
            :null
           }
            {
            rowData.heartRate < 60 ?
            <img
            alt=''
              className='record-content-img'
              src={healthDetailReduce}
            />
            :null
           }
            <div className='flex-center'>
              <div className='record-content-title '>
                <span className='record-top-content-title'>{rowData.heartRate || '-'}</span>
                <span className='record-top-content-text'>心率(bmp)</span>
              </div>
            </div>
          </div>
          <div className='record-content-time'>{timeFormat(rowData.updateTime,'y-m-d h:m:s')}</div>
        </div>
          :
          null
         }
        </div>
      );
    };

    return (
      <ListView
       className='listview'
        dataSource={dataSource}
        renderRow={row}
        // initialListSize={3}
        style={{
          height:height,
          overflow: 'auto',
        }}
        pageSize={10}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={50}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default List;