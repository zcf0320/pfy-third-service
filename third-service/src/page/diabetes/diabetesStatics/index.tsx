import Page from '@components/Page';
import * as React from 'react';
import './index.scss';
import { DiabetsStore, CommonStore } from '@store/interface';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Statistics from '../components/Statistics';
import { getSugarStatics } from '@api/disabets';
import { getUrlParams } from '@utils/filter';
import i18n from 'i18n';
export interface TrendProps {
  diabetsStore: DiabetsStore;
  commonStore: CommonStore;
}

export interface TrendState {
  diabetesData: any;
}

type PropsType = RouteComponentProps & TrendProps;
@inject('diabetsStore', 'commonStore')
@observer
class DiabetesTrend extends React.Component<PropsType, TrendState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      diabetesData: {
        amonth: {
          bloodGlucoseAvg: 0,
          countTime: 0,
          highAndLows: [],
          maxAndMins: [],
          timeAvg: [],
        },
        sevenDays: {
          highAndLows: [],
          maxAndMins: [],
          timeAvg: [],
        },
        threeMonths: {
          highAndLows: [],
          maxAndMins: [],
          timeAvg: [],
        },
      },
    };
  }
  componentDidMount() {
    getSugarStatics({ serviceRecordId: getUrlParams('serviceRecordId') }).then(
      (res: any) => {
        this.setState({ diabetesData: res });
      }
    );
  }
  render() {
    const {
      diabetesData: { sevenDays, amonth, threeMonths },
    } = this.state;
    return (
      <Page title={i18n.chain.diabetesManagement.statistics}>
        <div className="diabetes-statics-page">
          <Statistics
            title={i18n.chain.diabetesManagement.week}
            index={0}
            data={sevenDays.highAndLows}
            data1={sevenDays.maxAndMins}
            data2={sevenDays.timeAvg}
            bloodGlucoseAvg={sevenDays.bloodGlucoseAvg}
            countTime={sevenDays.countTime}
          />
          <Statistics
            title={i18n.chain.diabetesManagement.month}
            index={1}
            data={amonth.highAndLows}
            data1={amonth.maxAndMins}
            data2={amonth.timeAvg}
            bloodGlucoseAvg={amonth.bloodGlucoseAvg}
            countTime={amonth.countTime}
          />
          <Statistics
            title={i18n.chain.diabetesManagement.threeMonth}
            index={2}
            data={threeMonths.highAndLows}
            data1={threeMonths.maxAndMins}
            data2={threeMonths.timeAvg}
            bloodGlucoseAvg={threeMonths.bloodGlucoseAvg}
            countTime={threeMonths.countTime}
          />
        </div>
      </Page>
    );
  }
}

export default withRouter(DiabetesTrend);
