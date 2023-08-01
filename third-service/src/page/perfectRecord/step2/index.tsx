/** @format */

import React from 'react';
import './index.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { CommonStore, PerfectRecordStore } from '@store/interface';
import Page from '@components/Page';
import Header from '../component/Header';
import { saveHealth } from '@api/perfectRecord';
import { toJS } from 'mobx';

interface IProps {
  commonStore: CommonStore;
  perfectRecordStore: PerfectRecordStore;
}
type State = {
  currentIndex: number;
  step: number;
};
type PropsType = RouteComponentProps & IProps;
@inject('perfectRecordStore', 'commonStore')
@observer
class Step2 extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentIndex: 1,
      step: 14, //female 14  male 10
    };
  }
  componentDidMount() {
    let userInfo = toJS(this.props.commonStore.userInfo);
    this.setState({
      currentIndex: userInfo.sex === 1 ? 5 : 1, //1男
      step: userInfo.sex === 1 ? 10 : 14, //1男
    });
    // this.setState({
    //     currentIndex:12
    //   });
  }
  // 设置步骤
  setIndex = (index: number, type?: boolean) => {
    this.setState(
      {
        currentIndex: index,
      },
      () => {
        if (type) {
          let { healthData } = this.props.perfectRecordStore;
          saveHealth({
            ...healthData,
            step: 2,
          }).then(() => {
            this.props.history.replace('/perfect/step3');
          });
        }
      }
    );
  };

  render() {
    const { currentIndex, step } = this.state;
    return (
      <Page title='完善健康档案'>
        <div className='record-step2'>
          {((currentIndex === 1 && step === 13) ||
            (currentIndex === 5 && step === 11)) && <Header step={1} />}
        </div>
      </Page>
    );
  }
}
export default withRouter(Step2);
