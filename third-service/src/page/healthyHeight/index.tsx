import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Info = React.lazy(() => import(/* webpackChunkName: "start" */ './info'));
const Result = React.lazy(
  () => import(/* webpackChunkName: "start" */ './result')
);
export default class QuestionnaireRouter extends React.Component {
  componentDidMount() {
    document.title = '';
  }
  render() {
    return (
      <Switch>
        <Redirect exact path="/healthyHeight" to="/healthyHeight/info" />
        <Route path="/healthyHeight/info" component={Info} />
        <Route path="/healthyHeight/result" component={Result} />
      </Switch>
    );
  }
}
