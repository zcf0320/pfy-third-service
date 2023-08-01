export const timeFormat = (time, formate = 'y-m-d h:m:s') => {
    let res = '';
    // if (time){
    // 强制时间戳为13尾，获取时间单值
    `${time}`.length === 10 && (time = Number(time) * 1000);
    const date = new Date(Number(time));
    const year: any = date.getFullYear();
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
    // }
    return res;
  };