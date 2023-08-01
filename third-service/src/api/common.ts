import request from '@utils/request';
import axios from 'axios';
import { sendMessageParams, LoginForm } from '@store/common/interface';
export const sendMessage = (params: sendMessageParams) => {
  return request({
    url: '/tApi/third/smscode',
    method: 'get',
    params,
  });
};
export const getInfo = () => {
  return request({
    url: '/tApi/third/user/info',
    method: 'get',
  });
};
export const upload = async (data: any) => {
  let formdata = new FormData();
  formdata.append('multipartFile', data);
  let config = {
    headers: { 'Content-Type': 'multipart/form-data; boundary=ABCD' },
  };
  let res = await axios.post('/tApi/uploadPic?module=third', formdata, config);
  return res.data.data;
};
export const getIdCard = () => {
  return request({
    url: '/tApi/third/user/getIdCard',
    method: 'GET',
  });
};
export const login = (data: LoginForm) => {
  return request({
    url: '/tApi/third/user/mobile/login',
    method: 'post',
    data,
  });
};
export const getAllRegion = () => {
  return request({
    url: '/tApi/all/provincesAndCities',
    method: 'get',
  });
};
// 搜索疾病
export const searchDisease = (data: { searchKey: string }) => {
  return request({
    url: '/tApi/medicine/order/searchDisease',
    method: 'get',
    params: data,
  });
};
// 搜索手术
export const searchSurgery = (data: { searchKey: string }) => {
  return request({
    url: '/tApi/surgery/search',
    method: 'get',
    params: data,
  });
};
export const checkMobileAndValidCode = (data: any) => {
  return request({
    url: '/tApi/check/mobileAndValidCode',
    method: 'post',
    data,
  });
};
// 搜索手术
export const getProtocol = (data: string) => {
  return request({
    url: `/tApi/third/user/find/user/protocol/${data}`,
    method: 'get',
  });
};
// 获取所有的省市
export const getAllProvice = () => {
  return request({
    url: '/tApi/all/provincesAndCities',
    method: 'GET',
  });
};
export const queryJob = () => {
  return request({
    url: '/tApi/group/insure/queryJob',
    method: 'GET',
  });
};
// 搜索药品
export const searchDrug = (data: any) => {
  return request({
    url: '/tApi/insurance/claim/searchDrug',
    method: 'GET',
    params: data,
  });
};
// 搜索药品
export const agreeNotification = () => {
  return request({
    url: '/tApi/third/user/agreeNotification/3',
    method: 'get',
  });
};
// 获取jssdk config
export const getConfig = () => {
  return request({
    url: '/tApi/wx/pay/jsapi/create',
    method: 'get',
  });
};
//客服中心
export const customerService = () => {
  return request({
      url: '/tApi/tencent/cloud/client/get/userSig/url',
      method: 'GET'
  });
};
