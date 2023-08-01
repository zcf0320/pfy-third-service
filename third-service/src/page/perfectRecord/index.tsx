import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUrlParams } from '@utils/filter';
import { observer, inject } from 'mobx-react';
import { CommonStore } from '@store/interface';

const Step1 = React.lazy(
  () => import(/* webpackChunkName: "step1" */ './step1/index')
);
const Step2 = React.lazy(
  () => import(/* webpackChunkName: "step2" */ './step2/index')
);
const Step3 = React.lazy(
  () => import(/* webpackChunkName: "step3" */ './step3/index')
);

const Complete = React.lazy(
  () => import(/* webpackChunkName: "Complete" */ './complete/index')
);

interface IProps {
  commonStore: CommonStore;
}

@inject('commonStore')
@observer
export default class PerfectRecord extends React.Component<IProps> {
  componentDidMount() {
    const token = getUrlParams('token');
    const env = getUrlParams('env');

    token && localStorage.setItem('third_token', token);
    env && this.props.commonStore.setEnv(env);

    document.title = '完善健康档案';
  }

  render() {
    return (
      <Switch>
        <Redirect exact path="/perfect" to="/perfect/step1" />
        <Route path="/perfect/step1" component={Step1} />
        <Route path="/perfect/step2" component={Step2} />
        <Route path="/perfect/step3" component={Step3} />
        <Route path="/perfect/complete" component={Complete} />
      </Switch>
    );
  }
}
