import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const ServiceMarket = React.lazy(
  () => import(/* webpackChunkName: "service" */ './index/index')
);
export default class PointsChart extends React.Component {
  componentDidMount() {
    document.title = '';
  }
  render() {
    return (
      <Switch>
        <Redirect exact path="/serviceMarket" to="/serviceMarket/index" />
        <Route path="/serviceMarket/index" component={ServiceMarket} />
      </Switch>
    );
  }
}
