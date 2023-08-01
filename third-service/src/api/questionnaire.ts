/** @format */

import request from '@utils/request';
import {
  getQuestionnaireParams,
  subInfo,
  isTimeLegalParams,
} from '@store/questionnaire/interface';
export const getQuestionnaire = (params: getQuestionnaireParams) => {
  return request({
    url: '/tApi/questionnaire/getByCode',
    method: 'get',
    params,
  });
};
export const addQuestionnaire = (data: subInfo) => {
  return request({
    url: '/tApi/questionnaire/commit',
    method: 'POST',
    data,
  });
};
export const isTimeLegal = (params: isTimeLegalParams) => {
  return request({
    url: '/tApi/questionnaire/isTimeLegal',
    method: 'get',
    params,
  });
};
export const getHealthInfo = () => {
  return request({
    url: '/tApi/healthFile/getAllFiles',
    method: 'get',
  });
};
export const getResult = (params: any) => {
  return request({
    url: '/tApi/questionnaire/getResult',
    method: 'get',
    params,
  });
};
export const getCustomConfig = (params: any) => {
  return request({
    url: '/tApi/questionnaire/getQuestionnaireConfig',
    method: 'get',
    params,
  });
};
export const getQuestionnaireResult = (params: any) => {
  return request({
    url: '/tApi/questionnaire/getQuestionnaireResult',
    method: 'get',
    params,
  });
};
export const getLaborResult = (params: any) => {
  return request({
    url: '/tApi/questionnaire/getQuestionnaireResult',
    method: 'get',
    params,
  });
};
export const isDeleteLegal = (params: any) => {
  return request({
    url: '/tApi/questionnaire/isDeleteLegal',
    method: 'get',
    params,
  });
};
export const commitAfterMobile = (data: any) => {
  return request({
    url: '/tApi/questionnaire/commit/after/collect/mobile',
    method: 'post',
    data,
  });
};

/**
 * 老年痴呆问卷
 * @param code
 * @returns
 */
export const getAlzheimerQuestionnaire = (code) => {
  return request({
    url: '/tApi/questionnaire/getByCodeNoPart',
    method: 'get',
    params: { code },
  });
};
