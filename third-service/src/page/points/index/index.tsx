import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Chart from '../chart';
import Today from '../today';
import './index.scss';
import { observer, inject } from 'mobx-react';
import { pointsStore } from '@store/interface';
import UtilsMoment from '@utils/moment';
import { getUrlParams } from '@utils/filter';
import Page from '@components/Page';

interface IProps {
  pointsStore: pointsStore;
}
type State = {
  type: number | string;
};
type PropsType = RouteComponentProps & IProps;
@inject('pointsStore')
@observer
class ViewData extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = { type: 0 };
  }
  setToday = (data: string) => {
    //设置今天的值
    this.props.pointsStore && this.props.pointsStore.setTodayData(data);
  };
  getList = (index: number) => {
    let timeStamp = UtilsMoment.getValueOf(index);
    let parmas = {
      startDate: timeStamp[0],
      endDate: timeStamp[1],
    };
    // const today = UtilsMoment.getToday()
    //获取一周
    this.props.pointsStore &&
      this.props.pointsStore.getHealthRecords(parmas).then((res: any) => {
        this.props.pointsStore && this.props.pointsStore.setHealthRecords(res);
      });
  };
  componentDidMount() {
    const token = getUrlParams('token');
    token && localStorage.setItem('third_token', token);
    if (token) {
      //0血糖 1血压
      
      this.setState(
        {
          type: getUrlParams('type'),
        },
        () => {
          this.getList(0);
        }
      );
    }
  }
  render() {
    const { pointsStore } = this.props;
    const { type } = this.state;
    return (
      <Page title={`${type === '0' ? '空腹血糖' : '血压'}`}>
        <div className='viewData'>
          <Today
            type={type}
            recordList={pointsStore && pointsStore.recordList}
            todayData={pointsStore && pointsStore.todayData}
          />
          <Chart
            recordList={pointsStore && pointsStore.recordList}
            type={type}
            getList={this.getList}
            setToday={this.setToday}
          />
        </div>
      </Page>
    );
  }
}
export default withRouter(ViewData);
