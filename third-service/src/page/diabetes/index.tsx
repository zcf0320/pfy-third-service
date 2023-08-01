import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import i18n from 'i18n';

const Diabetes = React.lazy(
  () => import(/* webpackChunkName: "diabetes" */ './index/index')
);
const BloodSugar = React.lazy(
  () => import(/* webpackChunkName: "diabetes" */ './bloodSugar/index')
);
const SugarReord = React.lazy(
  () => import(/* webpackChunkName: "diabetes" */ './sugarForm/index')
);
const DisbetesTrend = React.lazy(
  () => import(/* webpackChunkName: "diabetes" */ './diabetesTrend/index')
);
const DisbetesStatics = React.lazy(
  () => import(/* webpackChunkName: "diabetes" */ './diabetesStatics/index')
);
export default class DiabetesPage extends React.Component {
  componentDidMount() {
    document.title = i18n.chain.diabetesManagement.title;
  }
  render() {
    return (
      <Switch>
        <Redirect exact path="/diabetes" to="/diabetes/index" />
        <Route path="/diabetes/index" component={Diabetes} />
        <Route path="/diabetes/bloodSugar" component={BloodSugar} />
        <Route path="/diabetes/sugarReord" component={SugarReord} />
        <Route path="/diabetes/disbetesTrend" component={DisbetesTrend} />
        <Route path="/diabetes/disbetesStatics" component={DisbetesStatics} />
      </Switch>
    );
  }
}
