/** @format */

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const recordDetail = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './recordDetail/index')
);
const recordDataDetail = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './recordDataDetail/index')
);
const healthSleep = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './healthSleep/index')
);
const sleepDetail = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './sleepDetail/index')
);
const motionRecord = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './motionRecord/index')
);

export default class Record extends React.Component {
  componentDidMount() {
    document.title = '';
  }
  render() {
    return (
      <Switch>
        <Redirect exact path='/record' to='/record/recordDetail' />
        <Route path='/record/recordDetail' component={recordDetail} />
        <Route path='/record/recordDataDetail' component={recordDataDetail} />
        <Route path='/record/healthSleep' component={healthSleep} />
        <Route path='/record/sleepDetail' component={sleepDetail} />
        <Route path='/record/motionRecord' component={motionRecord} />
      </Switch>
    );
  }
}
