/** @format */

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';

var service: any = axios.create({
  // URL
  baseURL: '',
  // 请求超时时间
  timeout: 30000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token = localStorage.getItem('token');
    let thirdToken = localStorage.getItem('third_token');
    let service_token = localStorage.getItem('service_token');
    if (token) {
      config.headers['token'] = JSON.parse(token).data;
    }
    if (thirdToken) {
      config.headers['token'] = thirdToken;
    }
    if (service_token) {
      config.headers['Authorization'] = `Bearer ${service_token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 返回拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code && res.code !== 0) {
      res.code !== 50002 && Toast.info(res.message, 3);
      return Promise.reject(res || 'Error');
    } else {
      res.code && (res.data.code = res.code);
      return res.data;
    }
  },
  (error: any) => {
    Toast.info('网络异常', 3);
    return Promise.reject(error);
  }
);

export default service;
