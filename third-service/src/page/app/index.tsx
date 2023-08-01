/** @format */

import React, { Component, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import i18n from "@i18n/index";
import Questionnaire from "../questionnaire";
import HealthyHeight from "../healthyHeight";
import ZhInsurance from "../zhInsurance";
import PointsChart from "../points";
import Diabetes from "../diabetes";
import HealthRecord from "../healthRecord";
import PerfectRecord from "../perfectRecord";
import { observer, inject } from "mobx-react";
import { CommonStore } from "@store/interface";
import { getUrlParams } from "@utils/filter";
import customerService from "page/customerService";
import Dementia from "page/dementia";
import Record from "page/record";
interface IProps {
  commonStore?: CommonStore;
}
interface IState {}
@inject("commonStore")
@observer
class App extends Component<IProps, IState> {
  componentDidMount() {
    const lang = localStorage.getItem("lang") || getUrlParams("lang");
    if (lang) {
      i18n.locale(lang);
      localStorage.setItem("lang", lang);
    } else {
      i18n.locale("zh");
    }
    let user = localStorage.getItem("user") || "{}";
    let userInfo = JSON.parse(user) || {};
    this.props.commonStore && this.props.commonStore.setUserInfo(userInfo);
    let token = getUrlParams("token") || "";
    if (token) {
      this.props.commonStore?.setToken(token);
    }
    let env = getUrlParams("env") || "";
    if (env) {
      this.props.commonStore?.setEnv(env);
    }
  }

  render() {
    return (
      <Router>
        <Suspense fallback={null}>
          <Switch>
            {/* <Redirect exact path="/" to="/questionnaire" /> */}
            <Route path="/questionnaire" component={Questionnaire} />
            <Route path="/healthyHeight" component={HealthyHeight} />
            <Route path="/zh" component={ZhInsurance} />
            <Route path="/points" component={PointsChart} />
            <Route path="/healthRecord" component={HealthRecord}></Route>
            <Route path="/perfect" component={PerfectRecord} />
            <Route path="/diabetes" component={Diabetes} />
            <Route path="/service" component={customerService} />
            <Route path="/dementia" component={Dementia} />
            <Route path="/record" component={Record} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
export default App;
