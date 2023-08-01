import React, { Component } from 'react';
import './index.scss';
import {customerService} from '@api/common';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { getUrlParams } from '@utils/filter';
export interface Props {
}

export interface State {
  src: string;
}

type PropsType = RouteComponentProps & Props;
class Service extends Component<PropsType, State> {
  constructor(props) {
    super(props);
    this.state = {
      src: ''
    };
  }
  componentDidMount() {
    const token = getUrlParams('token');
    token && localStorage.setItem('third_token', token);
    customerService().then((res: any) => {
      this.setState({src:res});
    });
  }
  render() {
    const {src} =this.state;
    return <div>
      <iframe className='iframe' title="呼叫中心" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src={src}></iframe>
    </div>;
  }
}

export default withRouter(Service);
