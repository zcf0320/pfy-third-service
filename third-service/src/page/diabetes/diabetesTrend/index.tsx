import Page from '@components/Page';
import * as React from 'react';
import './index.scss';
import { DiabetsStore, CommonStore } from '@store/interface';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Trend from '../components/Trend/index';
import { getSugarTrend } from '@api/disabets';
import { getUrlParams } from '@utils/filter';
import i18n from 'i18n';

export interface TrendProps {
  diabetsStore: DiabetsStore;
  commonStore: CommonStore;
}

export interface TrendState {
  tab: string;
  diabetesData: any;
}

type PropsType = RouteComponentProps & TrendProps;
@inject('diabetsStore', 'commonStore')
@observer
class DiabetesTrend extends React.Component<PropsType, TrendState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      tab: '7',
      diabetesData: {
        afterList: [],
        beforeList: [],
        randomList: [],
      },
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const { tab } = this.state;
    let params = {
      dayType: Number(tab),
      serviceRecordId: getUrlParams('serviceRecordId'),
    };
    getSugarTrend(params).then((res: any) => {
      this.setState({
        diabetesData: res,
      });
    });
  }
  render() {
    const { tab, diabetesData } = this.state;
    return (
      <Page title={i18n.chain.diabetesManagement.trend}>
        <div className="diabetes-trend-page">
          <div className="trend-tab">
            <div
              className="trend-tab-item"
              onClick={() => {
                this.setState({ tab: '7' }, () => {
                  this.getData();
                });
              }}
            >
              {i18n.chain.diabetesManagement.last7}
            </div>
            <div
              className="trend-tab-item"
              onClick={() => {
                this.setState({ tab: '30' }, () => {
                  this.getData();
                });
              }}
            >
              {i18n.chain.diabetesManagement.last30}
            </div>
            <div
              className="trend-tab-item"
              onClick={() => {
                this.setState({ tab: '90' }, () => {
                  this.getData();
                });
              }}
            >
              {i18n.chain.diabetesManagement.last90}
            </div>
            <div className={`trend-tab-active active${tab}`}></div>
          </div>
          <div className="blood-sugar-card">
            <div className="top flex">
              <div className="blood-sugar-title">{i18n.chain.diabetesManagement.beforeMeal}</div>
            </div>
            {diabetesData.beforeList.length <= 0 ? (
              <div className="no-data">
                <div className="no-data-img"></div>
                <div className="no-data-text">
                  {i18n.chain.diabetesManagement.noBloodData}
                </div>
              </div>
            ) : (
              <Trend
                bloodGlucoseList={diabetesData.beforeList}
                id="beforeMeal"
              />
            )}
          </div>
          <div className="blood-sugar-card">
            <div className="top flex">
              <div className="blood-sugar-title">{i18n.chain.diabetesManagement.postprandialGlucose}</div>
            </div>
            {diabetesData.afterList.length <= 0 ? (
              <div className="no-data">
                <div className="no-data-img"></div>
                <div className="no-data-text">
                {i18n.chain.diabetesManagement.noBloodData}
                </div>
              </div>
            ) : (
              <Trend bloodGlucoseList={diabetesData.afterList} id="afterMeal" />
            )}
          </div>
          <div className="blood-sugar-card">
            <div className="top flex">
              <div className="blood-sugar-title">{i18n.chain.diabetesManagement.random}</div>
            </div>
            {diabetesData.randomList.length <= 0 ? (
              <div className="no-data">
                <div className="no-data-img"></div>
                <div className="no-data-text">
                {i18n.chain.diabetesManagement.noBloodData}
                </div>
              </div>
            ) : (
              <Trend bloodGlucoseList={diabetesData.randomList} id="random" />
            )}
          </div>
        </div>
      </Page>
    );
  }
}

export default withRouter(DiabetesTrend);
