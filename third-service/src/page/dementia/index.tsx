/** @format */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const DementiaStart = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './index/index')
);
const EntryInformation = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './EntryInformation/index')
);
const HomePage = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './home')
);
const VideoPage = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './video')
);
const ColorGame = React.lazy(
  () => import(/* webpackChunkName: "dementia" */ './game')
);
const Record = React.lazy(() => import('./record'));
export default class DementiaPage extends React.Component {
  componentDidMount() {
    document.title = '阿尔兹海默症数字疗法';
  }
  render() {
    return (
      <Switch>
        <Redirect exact path='/dementia' to='/dementia/index' />
        <Route path='/dementia/index' component={DementiaStart} />
        <Route path='/dementia/EntryInformation' component={EntryInformation} />
        <Route path='/dementia/home' component={HomePage} />
        <Route path='/dementia/video' component={VideoPage} />
        <Route path='/dementia/game' component={ColorGame} />
        <Route path='/dementia/record' component={Record} />
      </Switch>
    );
  }
}
