/** @format */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Start = React.lazy(
  () => import(/* webpackChunkName: "start" */ './start')
);
const Info = React.lazy(() => import(/* webpackChunkName: "info" */ './info'));
const Answer = React.lazy(
  () => import(/* webpackChunkName: "answer" */ './answer')
);
const Result = React.lazy(
  () => import(/* webpackChunkName: "result" */ './result')
);
const Protocal = React.lazy(
  () => import(/* webpackChunkName: "result" */ './protocal')
);
// 新版本的页面
const newStart = React.lazy(
  () => import(/* webpackChunkName: "newstart" */ './newStart')
);
const newInfo = React.lazy(
  () => import(/* webpackChunkName: "newinfo" */ './newInfo')
);
const newAnswer = React.lazy(
  () => import(/* webpackChunkName: "newinfo" */ './newAnswer')
);
const newResult = React.lazy(
  () => import(/* webpackChunkName: "newResult" */ './newResult')
);
const hpvStart = React.lazy(
  () => import(/* webpackChunkName: "hpvStart" */ './hpv/start')
);
const hpvResult = React.lazy(
  () => import(/* webpackChunkName: "hpvResult" */ './hpv/result')
);
const hpvAnswer = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './hpv/answer')
);
const hraStart = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './hra/start')
);
const hraAnswer = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './hra/answer')
);
const hraResult = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './hra/result')
);
const CStart = React.lazy(
  () => import(/* webpackChunkName: "cStart" */ './custom/start')
);
const CMobile = React.lazy(
  () => import(/* webpackChunkName: "cInfo" */ './custom/mobile')
);
const CResult = React.lazy(
  () => import(/* webpackChunkName: "cResult" */ './custom/result')
);
const CAnswer = React.lazy(
  () => import(/* webpackChunkName: "cAnswer" */ './custom/answer')
);
const CInfo = React.lazy(
  () => import(/* webpackChunkName: "CInfo" */ './custom/info')
);

const laborStart = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './laborDay/start')
);
const LaborAnswer = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './laborDay/answer')
);
const laborResult = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './laborDay/result')
);
const depressedStart = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './depressed/start')
);
const depressedAnswer = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './depressed/answer')
);
const depressedResult = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './depressed/result')
);
const anxiousStart = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './anxious/start')
);
const anxiousAnswer = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './anxious/answer')
);
const anxiousResult = React.lazy(
  () => import(/* webpackChunkName: "hpvAnswer" */ './anxious/result')
);
const alzheimerAnswer = React.lazy(() => import('./Alzheimer/answer'));
const alzheimerResult = React.lazy(() => import('./Alzheimer/result'));
export default class QuestionnaireRouter extends React.Component {
  componentDidMount() {
    document.title = '';
  }
  render() {
    return (
      <Switch>
        <Redirect exact path='/questionnaire' to='/questionnaire/start' />
        <Route path='/questionnaire/start' component={Start} />
        <Route path='/questionnaire/info' component={Info} />
        <Route path='/questionnaire/answer' component={Answer} />
        <Route path='/questionnaire/result' component={Result} />
        <Route path='/questionnaire/protocal' component={Protocal} />
        <Route path='/questionnaire/newStart' component={newStart} />
        <Route path='/questionnaire/newInfo' component={newInfo} />
        <Route path='/questionnaire/newAnswer' component={newAnswer} />
        <Route path='/questionnaire/newResult' component={newResult}></Route>
        <Route path='/questionnaire/hpv/start' component={hpvStart}></Route>
        <Route path='/questionnaire/hpv/result' component={hpvResult}></Route>
        <Route path='/questionnaire/hpv/answer' component={hpvAnswer}></Route>
        <Route path='/questionnaire/hra/start' component={hraStart}></Route>
        <Route path='/questionnaire/hra/answer' component={hraAnswer}></Route>
        <Route path='/questionnaire/hra/result' component={hraResult}></Route>
        <Route path='/questionnaire/custom/start' component={CStart}></Route>
        <Route path='/questionnaire/custom/mobile' component={CMobile}></Route>
        <Route path='/questionnaire/custom/result' component={CResult}></Route>
        <Route path='/questionnaire/custom/answer' component={CAnswer}></Route>
        <Route path='/questionnaire/custom/info' component={CInfo}></Route>
        <Route
          path='/questionnaire/laborDay/start'
          component={laborStart}></Route>
        <Route
          path='/questionnaire/laborDay/answer'
          component={LaborAnswer}></Route>
        <Route
          path='/questionnaire/laborDay/result'
          component={laborResult}></Route>
        <Route
          path='/questionnaire/depressed/start'
          component={depressedStart}></Route>
        <Route
          path='/questionnaire/depressed/answer'
          component={depressedAnswer}></Route>
        <Route
          path='/questionnaire/depressed/result'
          component={depressedResult}></Route>
        <Route
          path='/questionnaire/anxious/start'
          component={anxiousStart}></Route>
        <Route
          path='/questionnaire/anxious/answer'
          component={anxiousAnswer}></Route>
        <Route
          path='/questionnaire/anxious/result'
          component={anxiousResult}></Route>
        <Route
          path='/questionnaire/alzheimer/answer'
          component={alzheimerAnswer}></Route>
        <Route
          path='/questionnaire/alzheimer/result'
          component={alzheimerResult}></Route>
      </Switch>
    );
  }
}
