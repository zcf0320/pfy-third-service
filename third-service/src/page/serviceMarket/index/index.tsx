import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './index.scss';
import { observer, inject } from 'mobx-react';
import { ServiceMarketStore } from '@store/serviceMarket/interface';
import { getUrlParams } from '@utils/filter';
import Chart from '../components/chart';
import Rate from '../components/rate';
import Process from '../components/process';
import Page from '@components/Page';

interface IProps {
  serviceMarketStore: ServiceMarketStore;
}
type State = {
  type: number | string;
};
type PropsType = RouteComponentProps & IProps;
@inject('serviceMarketStore')
@observer
class ServiceMarket extends React.Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    this.state = { type: 0 };
  }
  getList = (id: string) => {
    this.props.serviceMarketStore.getSupplierDetail(id).then((res: any) => {
      this.props.serviceMarketStore.setSupplierDetail(res);
    });
  };
  componentDidMount() {
    const token = getUrlParams('token');
    localStorage.setItem('service_token', token);
    const id = getUrlParams('id');
    if (id && token) {
      this.getList(id);
    }
  }
  render() {
    const { serviceMarketStore } = this.props;
    return (
      <Page title="企业信用">
        <div className="serviceMarket">
          <Chart detail={serviceMarketStore.detail} />
          <Rate detail={serviceMarketStore.detail} />
          <Process detail={serviceMarketStore.detail} />
        </div>
      </Page>
    );
  }
}
export default withRouter(ServiceMarket);
