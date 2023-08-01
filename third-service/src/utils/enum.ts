/** @format */

// 血压/血糖状态
export const pressState = {
  1: '正常',
  2: '偏高',
  3: '偏低',
};
export const timeCode = [
  {
    name: '凌晨',
    timeCode: 'morning',
  },
  {
    name: '早餐前',
    timeCode: 'beforeBreakfast',
  },
  {
    name: '早餐后',
    timeCode: 'afterBreakfast',
  },
  {
    name: '午餐前',
    timeCode: 'beforeLunch',
  },
  {
    name: '午餐后',
    timeCode: 'afterLunch',
  },
  {
    name: '晚餐前',
    timeCode: 'beforeDinner',
  },
  {
    name: '晚餐后',
    timeCode: 'afterDinner',
  },
  {
    name: '睡前',
    timeCode: 'beforeSleep',
  },
  {
    name: '随机',
    timeCode: 'random',
  },
  {
    name: '空腹',
    timeCode: 'emptyStomach',
  },
];
export const asleepes = (v: string) => {
  if (v === '晚上10点前') {
    return 1;
  } else if (v === '10点-11点') {
    return 2;
  } else if (v === '11点-12点') {
    return 3;
  } else if (v === '12点后') {
    return 4;
  } else {
    return 0;
  }
};
export const havaWakes = (v: string) => {
  if (v === '1次') {
    return 1;
  } else if (v === '2-3次') {
    return 2;
  } else if (v === '3次以上') {
    return 3;
  } else if (v === '整夜未醒') {
    return 4;
  } else {
    return 0;
  }
};
export const haveSleepFlags = (v: string) => {
  if (v === '否') {
    return 0;
  } else if (v === '是') {
    return 1;
  } else {
    return;
  }
};
export const medicineFlags = (v: string) => {
  if (v === '否') {
    return 0;
  } else if (v === '是') {
    return 1;
  } else {
    return;
  }
};
// export const sleepState = {
//   1: '良好',
//   2: '一般',
//   3: '较差',
// };
export const wakes = (v: string) => {
  if (v === '早上五点前') {
    return 1;
  } else if (v === '5点-7点') {
    return 2;
  } else if (v === '7点-9点') {
    return 3;
  } else if (v === '9点后') {
    return 4;
  } else {
    return;
  }
};
export const wakeFeelings = (v: string) => {
  if (v === '神清气爽') {
    return 1;
  } else if (v === '头脑发昏') {
    return 2;
  } else if (v === '乏累困倦') {
    return 3;
  } else if (v === '腰酸背痛') {
    return 4;
  } else {
    return;
  }
};

export const asleep = {
  1: '晚上10点前',
  2: '10点-11点',
  3: '11点-12点',
  4: '12点后',
};
export const havaWake = {
  1: '醒来1次',
  2: '醒来2-3次',
  3: '醒来3次以上',
  4: '整夜未醒',
};
export const haveSleepFlag = {
  0: '否',
  1: '是',
};
export const medicineFlag = {
  0: '否',
  1: '是',
};
export const sleepState = {
  1: '良好',
  2: '一般',
  3: '较差',
};
export const wake = {
  1: '早上5点前',
  2: '5点-7点',
  3: '7点-9点',
  4: '9点后',
};
export const wakeFeeling = {
  1: '神清气爽',
  2: '头脑发昏',
  3: '乏累困倦',
  4: '腰酸背痛',
};

export const pageTitle = {
  WEIGHT_HEIGHT: '基础数据',
  BLOOD_GLUCOSE: '血糖',
  BLOOD_PRESSURE: '血压',
  HEART_RATE: '心率',
  SPORT: '运动',
  SLEEP: '睡眠',
};
