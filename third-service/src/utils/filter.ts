/** @format */

// 后端配置的code 对应前端自定义
export const codeMap: any = {
  // 膳食
  '92acb0': 1,
  // 糖尿病
  tTHDVx: 2,
  // 心脏病
  kjbUlp: 3,
  // 高血压
  vJxKld: 4,
  // 健高
  sKmIIv: 5,
  // 预约需要审核
  Aqvlzr: 6,
  // 预约不需要审核
  bAiQoe: 7,
  // 兑换供应商券码 虚拟商品
  XpbFvr: 8,
  // 商品兑换
  eyUtlP: 9,
  // 健康专栏
  EEJaIa: 10,
  // 购药系统
  JSAlkb: 11,
  // 图文问诊
  OnDiag: 12,
  // 人工问诊
  LFaixA: 13,
  // 电话问诊
  nYQSrM: 14,
  // 七日陪护
  iDweCl: 15,
  //口腔二维码问诊
  VvdNrn: 16,
  // 二次诊疗
  sOyWFb: 17,
  // 老花镜
  LHJpdd: 18,
  // 五一劳动节
  gfoTjw: 19,
  // 药房网
  HyGaJY: 20,
  // 体检
  IaHGGZ: 21,
  //糖百万
  TnBGLA: 22,
  //抑郁问卷
  yyzpWj: 23,
  //焦虑问卷
  JLZPwj: 24,
  //医加壹
  yjytwwz: 25,
  //淼滴
  miaodiReserve: 26,
  '0616D3': 27,
};
export const getNavBarTitle = (type: number) => {
  let title = '';
  type === 1 && (title = '膳食营养与健康测评');
  type === 2 && (title = '糖尿病健康测试');
  type === 3 && (title = '心脏病健康测试');
  type === 4 && (title = '高血压健康测试');
  type === 19 && (title = '劳动节问卷');
  type === 23 && (title = '抑郁测试');
  type === 24 && (title = '焦虑测试');
  return title;
};
export const getLevel = (type: number, score: number) => {
  let result = 'A';
  if (type === 1) {
    if (score >= 50 && score <= 70) {
      result = 'A';
    }
    if (score > 70 && score <= 100) {
      result = 'B';
    }
    if (score > 100 && score <= 150) {
      result = 'C';
    }
    if (score > 150 && score <= 200) {
      result = 'D';
    }
  }
  if (type === 2) {
    if (score < 5) {
      result = 'A';
    }
    if (score >= 5) {
      result = 'B';
    }
  }
  if (type === 3) {
    if (score <= 3) {
      result = 'A';
    }
    if (score >= 4 && score <= 6) {
      result = 'B';
    }
    if (score >= 7) {
      result = 'C';
    }
  }
  if (type === 4) {
    if (score <= 4) {
      result = 'A';
    }
    if (score >= 5 && score <= 8) {
      result = 'B';
    }
    if (score >= 9) {
      result = 'C';
    }
  }
  if (type === 23 || type === 24) {
    if (score < 50) {
      result = 'A';
    }
    if (score >= 50 && score <= 59) {
      result = 'B';
    }
    if (score > 59 && score <= 69) {
      result = 'C';
    }
    if (score >= 70) {
      result = 'D';
    }
  }
  return result;
};
export const getUrlParams = (name: string, url?: string) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, '\\$&'); // eslint-disable-line
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return '';
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
export const checkPhone = (phone: string) => {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  } else {
    return true;
  }
};
// 校验邮箱
export function checkMail(mail: string) {
  if (!/^([a-zA-Z\d])(\w|\\-)+@[a-zA-Z\d_-]+\.[a-zA-Z]{2,4}$/.test(mail)) {
    return false;
  } else {
    return true;
  }
}
export const timeFormat = (time: number, formate = 'y-m-d h:m:s') => {
  let res = '';
  if (time) {
    // 强制时间戳为13尾，获取时间单值
    `${time}`.length === 10 && (time = Number(time) * 1000);
    const date = new Date(Number(time));
    let year: any = date.getFullYear();
    let month: any = date.getMonth() + 1;
    month = month >= 10 ? month : `0${month}`;
    let day: any = date.getDate();
    day = day >= 10 ? day : `0${day}`;
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    let secnds: any = date.getSeconds();
    hours = hours >= 10 ? hours : `0${hours}`;
    minutes = minutes >= 10 ? minutes : `0${minutes}`;
    secnds = secnds >= 10 ? secnds : `0${secnds}`;
    // 替换年月日
    const formateArr = formate.split(' ');
    res = formateArr[0].split('y').join(year);
    res = res.split('m').join(month);
    res = res.split('d').join(day);

    // 替换时分秒
    if (formateArr[1]) {
      res += ` ${formateArr[1].split('h').join(hours)}`;
      res = res.split('m').join(minutes);
      res = res.split('s').join(secnds);
    }
    !year && (res = res.substr(1));
  }
  return res;
};
export const debounce = (fn: Function, wait: number) => {
  let debounceTime: any = null;
  return function () {
    if (debounceTime !== null) {
      clearTimeout(debounceTime);
    }
    debounceTime = setTimeout(fn, wait);
  };
};
