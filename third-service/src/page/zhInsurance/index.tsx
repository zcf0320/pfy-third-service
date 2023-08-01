import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Login = React.lazy(
  () => import(/* webpackChunkName: "login" */ './login')
);
const FirstLogin = React.lazy(
  () => import(/* webpackChunkName: "login" */ './firstLogin')
);
const User = React.lazy(() => import(/* webpackChunkName: "user" */ './user'));
const Appointment = React.lazy(
  () => import(/* webpackChunkName: "appointment" */ './appointment')
);
const Detail = React.lazy(
  () => import(/* webpackChunkName: "detail" */ './detail')
);
const Phone = React.lazy(
  () => import(/* webpackChunkName: "phone" */ './phone')
);
const PhoneDetail = React.lazy(
  () => import(/* webpackChunkName: "phoneDetail" */ './phoneDetail')
);
const Record = React.lazy(
  () => import(/* webpackChunkName: "record" */ './record')
);
const PhoneIndex = React.lazy(
  () => import(/* webpackChunkName: "phoneIndex" */ './phoneIndex')
);
const Examine = React.lazy(
  () => import(/* webpackChunkName: "examine" */ './examine')
);
const Consultation = React.lazy(
  () => import(/* webpackChunkName: "Consultation" */ './consultation')
);
const UseConsultation = React.lazy(
  () => import(/* webpackChunkName: "UseConsultation" */ './useConsultation')
);
const Report = React.lazy(
  () => import(/* webpackChunkName: "Report" */ './report')
);
export default class ZhInsurance extends React.Component {
  componentDidMount() {
    document.title = '';
  }
  render() {
    return (
      <Switch>
        <Redirect exact path="/zh" to="/zh/login" />
        <Route path="/zh/login" component={Login} />
        <Route path="/zh/firstLogin" component={FirstLogin} />
        <Route path="/zh/user" component={User}></Route>
        <Route path="/zh/appointment" component={Appointment}></Route>
        <Route path="/zh/detail" component={Detail}></Route>
        <Route path="/zh/phone" component={Phone}></Route>
        <Route path="/zh/phoneDetail" component={PhoneDetail}></Route>
        <Route path="/zh/phoneIndex" component={PhoneIndex}></Route>
        <Route path="/zh/record" component={Record}></Route>
        <Route path="/zh/examine" component={Examine}></Route>
        <Route path="/zh/consultation" component={Consultation}></Route>
        <Route path="/zh/useConsultation" component={UseConsultation}></Route>
        <Route path="/zh/report" component={Report}></Route>
      </Switch>
    );
  }
}
