/** @format */

import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { PerfectRecordStore, CommonStore } from '@store/interface';
import { getUrlParams } from '@utils/filter';
import Page from '@components/Page';
import StarStep from '../component/StarStep';
import Height from './height';
import Weight from './weight';
import BadHabits from './badHabits';
import Pace1 from '../step2/Pace1';
import Pace2 from '../step2/Pace2';
import Pace3 from '../step2/Pace3';
import Pace4 from '../step2/Pace4';
import Pace5 from '../step2/Pace5';
import Pace6 from '../step2/Pace6';
import Pace7 from '../step2/Pace7';
import Pace8 from '../step2/Pace8';
import Pace9 from '../step2/Pace9';
import Pace10 from '../step2/Pace10';
import Pace11 from '../step2/Pace11';
import Pace12 from '../step2/Pace12';
import Pace13 from '../step2/Pace13';
import Pace14 from '../step2/Pace14';
import './index.scss';
interface IProps {
  perfectRecordStore: PerfectRecordStore;
  commonStore: CommonStore;
}
type State = {
  currentIndex: number;
};
type PropsType = RouteComponentProps & IProps;
@inject('perfectRecordStore', 'commonStore')
@observer
class Step1 extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentIndex: 1,
    };
  }

  componentDidMount() {
    const step = getUrlParams('step') ? +getUrlParams('step') : 1;
    this.setState({
      currentIndex: step,
    });
    this.props.commonStore.getInfo().then((userInfo: any) => {
      if (userInfo.step > 17) {
        // @ts-ignore：无法被执行的代码的错误
        wx.miniProgram.navigateBack();
        this.props.history.goBack();
      }
      this.props.commonStore.setUserInfo(userInfo);
      this.props.perfectRecordStore.getHealthData();
    });
  }

  // 设置步骤
  setIndex = (index: number) => {
    this.setState(
      {
        currentIndex: index,
      },
      () => {
        this.props.history.push('/perfect/step1?step=' + index);
      }
    );
  };

  render() {
    const { currentIndex } = this.state;

    return (
      <Page title='完善健康档案'>
        <div className='page-step'>
          <StarStep step={currentIndex} />
          {currentIndex && currentIndex === 1 && (
            <Height setIndex={this.setIndex} />
          )}
          {currentIndex && currentIndex === 2 && (
            <Weight setIndex={this.setIndex} />
          )}

          {currentIndex && currentIndex === 3 && (
            <BadHabits setIndex={this.setIndex} />
          )}
          {/* 是否生育 */}
          {currentIndex && currentIndex === 4 && (
            <Pace1 setIndex={this.setIndex} />
          )}
          {/* 您是否来过月经 */}
          {currentIndex && currentIndex === 5 && (
            <Pace2 setIndex={this.setIndex} />
          )}
          {/* 您的月经情况 */}
          {currentIndex && currentIndex === 6 && (
            <Pace3 setIndex={this.setIndex} />
          )}
          {/* 您的月经情况 */}
          {currentIndex && currentIndex === 7 && (
            <Pace4 setIndex={this.setIndex} />
          )}
          {/* 血压血糖 */}
          {currentIndex && currentIndex === 8 && (
            <Pace5 setIndex={this.setIndex} />
          )}
          {/* 心率 */}
          {currentIndex && currentIndex === 9 && (
            <Pace6 setIndex={this.setIndex} />
          )}
          {/* 亚健康 */}
          {currentIndex && currentIndex === 10 && (
            <Pace12 setIndex={this.setIndex} />
          )}
          {/* 肝肾功能 */}
          {currentIndex && currentIndex === 11 && (
            <Pace13 setIndex={this.setIndex} />
          )}
          {/* 疾病史 */}
          {currentIndex && currentIndex === 12 && (
            <Pace7 setIndex={this.setIndex} />
          )}
          {/* 家族病史 */}
          {currentIndex && currentIndex === 13 && (
            <Pace8 setIndex={this.setIndex} />
          )}
          {/* 手术史 */}
          {currentIndex && currentIndex === 14 && (
            <Pace9 setIndex={this.setIndex} />
          )}
          {/* 外伤史 */}
          {currentIndex && currentIndex === 15 && (
            <Pace10 setIndex={this.setIndex} />
          )}
          {/* 现有病 */}
          {currentIndex && currentIndex === 16 && (
            <Pace11 setIndex={this.setIndex} />
          )}
          {/* 过敏史 */}
          {currentIndex && currentIndex === 17 && (
            <Pace14 setIndex={this.setIndex} />
          )}
        </div>
      </Page>
    );
  }
}
export default withRouter(Step1);
