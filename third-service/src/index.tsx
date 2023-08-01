import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './page/app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import 'lib-flexible';
import 'antd-mobile/dist/antd-mobile.less';
// import 'antd-mobile/lib/list-view/style'; 
import Store from '@store/index';

ReactDOM.render(
  <Provider {...Store}>
    <BrowserRouter basename="/questionnaire/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
