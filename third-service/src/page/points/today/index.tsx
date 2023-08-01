import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { pressState } from '@utils/enum';
import moment from 'moment';
import './index.scss';

type Props = {
  recordList: any;
  type: number | string;
  todayData: any;
};
type State = {
  pressText: string;
  bloodText: string;
  pressUnit: string;
  bloodUnit: string;
};
type PropsType = RouteComponentProps & Props;

class Today extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      pressText:
        '小贴士：对于成年人而言，高于90/60mmHg且低于140/90mmHg的测量值通常被视为正常范围',
      bloodText:
        '小贴士：空腹，高于3.9mmol/L且低于6.1mmol/L的测量值通常可被视为正常范围',
      pressUnit: 'mmHg',
      bloodUnit: 'mmol/L',
    };
  }
  render() {
    //0血糖 1血压
    const { pressUnit, bloodUnit } = this.state;
    const { type, todayData } = this.props;
    let arr: any = [];
    let str: string = '';
    let show: number = 0; //1正常 2偏高 3偏低
    if (todayData !== '--') {
      if (type === 1) {
        if (todayData) {
          str = todayData.replace('/', ',');
          arr = str.split(',');
          if (Number(arr[0]) > 140 || Number(arr[1] > 90)) {
            //拿舒张压判断高度
            show = 2;
          } else if (Number(arr[0]) < 90 || Number(arr[1] < 60)) {
            show = 3;
          } else {
            show = 1;
          }
        }
      } else {
        if (todayData > 6.1) {
          show = 2;
        } else if (todayData < 3.9) {
          show = 3;
        } else {
          show = 1;
        }
      }
    }
    return (
      <div className='chart-today'>
        <div className='top flex'>
          <div className='title flex'>
            <span>今日{type === '1' ? '血压' : '血糖'}</span>
            <React.Fragment>
              {show === 1 && (
                <div className='status normal'>{pressState[1]}</div>
              )}
              {show === 2 && <div className='status high'>{pressState[2]}</div>}
              {show === 3 && <div className='status low'>{pressState[3]}</div>}
            </React.Fragment>
          </div>
          <span className='date'>
            {moment().format('YYYY.MM.DD')}
            {/* {UtilsMoment.getLastWeek(0)[0]} */}
          </span>
        </div>
        {/* <div className="yellow flex">
                    <div className="tip"></div>
                    <div className="text">
                        {type == 1 ? pressText : bloodText}
                    </div>
                </div> */}
        <div className='trend-box flex'>
          <div className='unit flex'>
            <div>{todayData}</div>
            <span>{type === '1' ? pressUnit : bloodUnit}</span>
          </div>
          <div className='trend'></div>
        </div>
      </div>
    );
  }
}
export default withRouter(Today);
