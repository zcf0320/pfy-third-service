import moment from 'moment';

export default {
  /**
   * 获取前 i 周的周一和周日日期，并以数组的方式返回。
   * 当 i=1，获取的是上周一和上周日的日期；
   * 当 i=2，获取的是上上周一和上上周日的日期
   * ...以此类推
   * @param i
   */
  getLastWeek(i: number) {
    //周 年月日
    let weekOfDay = parseInt(moment().format('E')); //计算今天是这周第几天
    let last_monday = moment()
      .subtract(weekOfDay + 7 * i - 1, 'days')
      .format('YYYY/MM/DD'); //周一日期
    let last_sunday = moment()
      .subtract(weekOfDay + 7 * (i - 1), 'days')
      .format('YYYY/MM/DD'); //周日日期
    return [last_monday, last_sunday];
  },
  getValueOf(i: number) {
    //周 时间戳
    let weekOfDay = parseInt(moment().format('E')); //计算今天是这周第几天
    let last_monday = moment().subtract(weekOfDay + 7 * i - 1, 'days'); //周一日期
    let last_sunday = moment().subtract(weekOfDay + 7 * (i - 1), 'days'); //周日日期
    let a = moment(last_monday).startOf('day').format('x');
    let b = moment(last_sunday).startOf('day').format('x');
    return [a, b];
  },
  getToday() {
    //今天 时间戳
    return moment().startOf('day').format('x');
  },
  formatDate(i: any) {
    return moment(Number(i)).format('MM.DD');
  },
  formatIos(date: string) {
    return date.replace(/\//g, '.');
  },
};
