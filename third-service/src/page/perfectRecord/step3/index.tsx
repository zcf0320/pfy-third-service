import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';
import { observer, inject } from 'mobx-react';
import { PerfectRecordStore } from '@store/interface';
import Page from '@components/Page';
import Header from '../component/Header';
import Food from './food';
import Sport from './sport';
import Sleep from './sleep';
import { saveHealth } from '@api/perfectRecord';

interface IProps {
  perfectRecordStore: PerfectRecordStore;
}
type State = {
  currentIndex: number;
};
type PropsType = RouteComponentProps & IProps;
@inject('perfectRecordStore')
@observer
class Step3 extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentIndex: 1,
    };
  }

  // 设置步骤
  setIndex = (index: number, data?: any) => {
    let { perfectRecordStore } = this.props;
    this.setState({
      currentIndex: index,
    });
    data && perfectRecordStore.setHealthData(data);
    if (index === 4) {
      this.complete();
    }
  };

  // 保存数据
  complete = () => {
    let { healthData } = this.props.perfectRecordStore;
    saveHealth({
      ...healthData,
      step: 3,
    }).then(() => {
      this.props.history.replace('/perfect/complete');
    });
  };

  render() {
    const { currentIndex } = this.state;
    return (
      <Page title="完善健康档案">
        <div className="page-step">
          <Header step={3} />
          {currentIndex && currentIndex === 1 && (
            <Food setIndex={this.setIndex} />
          )}
          {currentIndex && currentIndex === 2 && (
            <Sport setIndex={this.setIndex} />
          )}
          {currentIndex && currentIndex === 3 && (
            <Sleep setIndex={this.setIndex} />
          )}
        </div>
      </Page>
    );
  }
}
export default withRouter(Step3);
