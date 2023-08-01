import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Page from '@components/Page';
import Step from './Steps';
import { getUrlParams } from '@utils/filter';
import { observer, inject } from 'mobx-react';
import { CommonStore, healthRecordStore } from '@store/interface';
import './index.scss';
import { womanList, manList, childrenList, oldManList, listItem } from './data';
import PregnancyState from './PregnancyState';
import Menstruation from './Menstruation';
import MenstruationDetail from './MenstruationDetail';
import Height from './Height';
import Weight from './Weight';
import Blood from './Blood';
import BloodSugar from './BloodSugar';
import Past from './Past';
import Allergy from './Allergy';
import FamilyDiseaseHistory from './FamilyDiseaseHistory';
import LiverAndKideny from './LiverAndKideny';
import HeadLength from './HeadLength';
import Tooth from './Tooth';
import EyeScore from './EyeScore';
import EyeDegree from './EyeDegree';
import SurgeryHistory from './SurgeryHistory';

interface IState {}
interface IProps {
  commonStore: CommonStore;
  HealthRecordStore: healthRecordStore;
}
type PageProps = IProps & RouteComponentProps;
@inject('commonStore', 'HealthRecordStore')
@observer
class HealthRecord extends Component<IProps, IState> {
  constructor(props: PageProps) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { commonStore } = this.props;
    let token = getUrlParams('token');
    let env = getUrlParams('env');
    const fileType = getUrlParams('fileType');
    token && this.props.commonStore.setToken(token);
    env && this.props.commonStore.setEnv(env);
    if (fileType) {
      let list: Array<listItem> = [];
      fileType === '1' && (list = manList);
      fileType === '2' && (list = womanList);
      fileType === '3' && (list = oldManList);
      fileType === '4' && (list = childrenList);
      this.props.HealthRecordStore.setFileType(fileType);
      this.props.HealthRecordStore.setHealthList(list);
    }
    if (token) {
      // 获取用户信息
      localStorage.setItem('third_token', token);
      commonStore.getInfo().then((res: any) => {
        commonStore.setUserInfo(res);
        localStorage.setItem('user', JSON.stringify(res));
      });
    }
  }
  render() {
    const { currentIndex, healthList } = this.props.HealthRecordStore;
    return (
      <Page title='完善健康档案'>
        <div className='page-health-record'>
          <div className='line'></div>
          {healthList.length && healthList[currentIndex].type === 1 ? (
            <PregnancyState></PregnancyState>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 2 ? (
            <Menstruation></Menstruation>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 3 ? (
            <MenstruationDetail></MenstruationDetail>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 4 ? (
            <Height></Height>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 5 ? (
            <Weight></Weight>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 6 ? (
            <Blood></Blood>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 7 ? (
            <BloodSugar></BloodSugar>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 8 ? (
            <Past></Past>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 9 ? (
            <Allergy></Allergy>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 10 ? (
            <FamilyDiseaseHistory></FamilyDiseaseHistory>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 11 ? (
            <LiverAndKideny></LiverAndKideny>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 12 ? (
            <HeadLength></HeadLength>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 13 ? (
            <Tooth></Tooth>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 14 ? (
            <EyeScore></EyeScore>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 15 ? (
            <EyeDegree></EyeDegree>
          ) : null}
          {healthList.length && healthList[currentIndex].type === 16 ? (
            <SurgeryHistory></SurgeryHistory>
          ) : null}
          <Step></Step>
        </div>
      </Page>
    );
  }
}
export default HealthRecord;
