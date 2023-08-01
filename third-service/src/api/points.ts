import request from '@utils/request';
import { dateFrom } from '@store/points/interface';
//获取每日填写记录
export const getHealthRecords = (data: dateFrom) => {
  return request({
    url: '/tApi/score/task/getDailyHealthRecords',
    method: 'post',
    data,
  });
};
// 获取某个时间段的填写记录
// export const getBaseData = (data:any) => {
//   return request({
//     url: 'score/task/getDailyHealthRecords',
//     method: 'post',
//     data,
//   });
// };
// 获取健康档案
export const getAllFiles = () =>{
  return request({
    url:'/tApi/healthFile/getAllFiles',
    method: 'get',
  });
};
// 保存健康档案
export const healthFileSave = (data:any) =>{
  return request({
    url:'/tApi/healthFile/save',
    method: 'post',
    data,
  });
};
// 保存或修改当天睡眠记录
export const healthInsertOrUpdate = (data:any) =>{
  return request({
    url:'/tApi/sleep-record-detail/insertOrUpdate',
    method: 'post',
    data,
  });
};
// 按照睡眠时间获取详情 
export const healthSleepDetail = (data:any) =>{
  return request({
    url:'/tApi/sleep-record-detail/detail',
    method: 'get',
    params:data,
  });
};
// 获取睡眠七日内趋势
export const healthSleepGetTrend = (data:any) =>{
  
  return request({
    url:'/tApi/sleep-record-detail/getTrend',
    method: 'get',
  params:data
  });
};
// 获取运动项目集合
export const healthGetSport = () =>{
  return request({
    url:'/tApi/uc-diabetes-management/get/sport',
    method: 'get',
    
  });
};
// 保存或修改当天运动记录
export const healthSportDetail = (data:any) =>{
  return request({
    url:'/tApi/sport-record-detail/insertOrUpdate',
    method: 'post',
    data
  });
};
// 按照时间获取运动详情 时间格式:yyyy-MM-dd
export const healthGetSportDetail = (data:any) =>{
  return request({
    url:'/tApi/sport-record-detail/detail',
    method: 'get',
    params:data
  });
};
// 获取运动七日内趋势
export const healthGetSportGetTrend = (data:any) =>{
  return request({
    url:'/tApi/sport-record-detail/getTrend',
    method: 'get',
    params:data
  });
};