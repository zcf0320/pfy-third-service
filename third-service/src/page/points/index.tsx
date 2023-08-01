import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const ViewData = React.lazy(
  () => import(/* webpackChunkName: "chart" */ './index/index')
);
export default class PointsChart extends React.Component {
  componentDidMount() {
    document.title = '';
  }
  render() {
    return (
      <Switch>
        <Redirect exact path="/points" to="/points/chart" />
        <Route path="/points/chart" component={ViewData} />
      </Switch>
    );
  }
}
