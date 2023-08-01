// 1 人生阶段
// 2 来月经
// 3 月经情况
// 4 身高
// 5 体重
// 6 血型
// 7 血糖
// 8 疾病史
// 9 过敏史
// 10 家族史
// 11 肝肾
// 12 孩子头围
// 13 牙齿
// 14 孩子视力
// 15 是否戴眼镜
// 16 手术史
// let womanList = [1,2,3,4,5,6,7,8,9,10,11];    indexText = [1,4,6,8,10,11]
// let manList = [4,5,6,7,8,9,10, 11];           indexText = [4,8,10,11]
// let childrenList = [4,5,12,13,14,15,8,9,10];   indexText = [4,13,8,10]
// let oldManList = [4,5,6,7,16,8,9,10,11];      indexText=[4,6,10,11]
export interface listItem {
  type: number;
  text?: string;
  selectNo?: boolean;
  skip?: boolean;
}
export const womanList: Array<listItem> = [
  {
    type: 1,
    text: '填写健康档案,便于我们为你定制个人健康服务哦~',
  },
  {
    type: 2,
    // 选择no就跳过下一个
    selectNo: true,
  },
  {
    type: 3,
  },
  {
    type: 4,
    text: '马上就要填写完成了哦~加油加油',
  },
  {
    type: 5,
  },
  {
    type: 6,
    text: '已经完成50%啦！让我们继续吧！',
    skip: true,
  },
  {
    type: 7,
    skip: true,
  },
  {
    type: 8,
    text: '快要到达啦~胜利的曙光将要到来！',
  },
  {
    type: 9,
  },
  {
    type: 10,
    text: '还差最后一步！马上填写吧！',
  },
  {
    type: 11,
    text: '恭喜你已经完成啦！棒棒哒~',
    skip: true,
  },
];
export const manList: Array<listItem> = [
  {
    type: 4,
    text: '填写健康档案,便于我们为你定制个人健康服务哦~',
  },
  {
    type: 5,
  },
  {
    type: 6,
    text: '',
    skip: true,
  },
  {
    type: 7,
    skip: true,
  },
  {
    type: 8,
    text: '马上就要填写完成了哦~加油加油',
  },
  {
    type: 9,
  },
  {
    type: 10,
    text: '还差最后一步！马上填写吧！',
  },
  {
    type: 11,
    skip: true,
    text: '恭喜你已经完成啦！棒棒哒~',
  },
];
export const childrenList: Array<listItem> = [
  {
    type: 4,
    text: '填写健康档案,便于我们为你定制个人健康服务哦~',
  },
  {
    type: 5,
  },
  {
    type: 12,
    text: '',
  },
  {
    type: 13,
    text: '马上就要填写完成了哦~加油加油',
  },
  {
    type: 14,
    text: '',
  },
  {
    type: 15,
    text: '',
  },
  {
    type: 8,
    text: '快要到达啦~胜利的曙光将要到来！',
  },
  {
    type: 9,
  },
  {
    type: 10,
    text: '恭喜你已经完成啦！棒棒哒~',
  },
];
export const oldManList: Array<listItem> = [
  {
    type: 4,
    text: '填写健康档案,便于我们为你定制个人健康服务哦~',
  },
  {
    type: 5,
  },
  {
    type: 6,
    text: '马上就要填写完成了哦~加油加油',
    skip: true,
  },
  {
    type: 7,
    text: '',
    skip: true,
  },
  {
    type: 16,
    text: '',
  },
  {
    type: 8,
    text: '快要到达啦~胜利的曙光将要到来！',
  },
  {
    type: 9,
  },
  {
    type: 10,
    text: '还差最后一步！马上填写吧！',
  },
  {
    type: 11,
    text: '恭喜你已经完成啦！棒棒哒~',
    skip: true,
  },
];
