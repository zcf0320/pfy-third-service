import React, { useEffect, useState, } from 'react';
import { formatDate } from '@utils/tools';
import { DatePicker } from 'antd-mobile';
// import calendar from '@/assets/images/calendar.png';
import './index.scss';
import moment from 'moment';

// const week = ['日', '一', '二', '三', '四', '五', '六'];
interface IProps {
  onWeekChange: (date: any) => void;
  onDateChange: (date: any) => void;
}

export default function WeekCalendar(props: IProps) {
  // let element:any = null;
  const nowTimeStamp = Date.now();
  const now = new Date(nowTimeStamp);
  const minDate = new Date(2020, 0, 1, 0, 0, 0);
  const [date, setDate] = useState(new Date());
  const [currentList, setCurrentList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
//   const [currentYear, setCurrentYear] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [visible, setVisible] = useState(false);
  const [dpValue, setDpValue] = useState(now);
  const [element,setElement]:any = useState(null);
//   const [active, setActive] = useState(Number);
// const [dataTime,setDataTime] = useState();
  
  const initDate = (dateTime: any) => {
    const cYear = dateTime.getFullYear();
    const cMonth = formatDate(dateTime.getMonth() + 1);
    const cDate = formatDate(dateTime.getDate());
    const cDay = dateTime.getDay();
    const cYMD = `${cYear}-${cMonth}-${cDate}`;
    setCurrentDate(cYMD);
    createDate(-cDay, dateTime);
    // setCurrentMonth(cMonth.toString());
  };
  const createDate = (day: number, dateTime: any) => {
    const currentDayList = [] as any;
    for (let i = day; i < day + 7; i++) {
      currentDayList.push(countTime(i, dateTime));
    }
    setCurrentList(currentDayList);
  };
  useEffect(()=>{
    currentMonthDays(date);
   
  },[date]);
  const  currentMonthDays = (date) =>{
    // 获取标准时间
    // let date = new Date();
    // let currentDay = date.getDate();
    // 获取当前月份（实际月份需要加1）
    let currentMonth = date.getMonth() + 1;
    //当小于10->01,02,03...
    if(currentMonth<10){
        currentMonth='0'+currentMonth;
    }
    // 获取当前年份
    let currentYear = date.getFullYear();
    // 获取当前月有多少天
    let currentMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const cDate = date.getDate();
    const cYMD = `${currentYear}-${currentMonth}-${cDate}`;
    // 当前月份所有日期集合
    let currentMonthArr:any = [];
    for (let day = 1; day <= currentMonthDays; day++) {
        // 年月日(yyyy-MM-dd)
        let dateItem =  currentYear + "-" + currentMonth + "-" + (day < 10 ? '0' + day : day);
        // currentMonthArr.push(dateItem);
        const obj = {
            cYear: currentYear,
            cMonth: currentMonth,
            cDate: day,
            cYMD: `${dateItem}`,
            id:`${dateItem}`,
          };
          currentMonthArr.push(obj);
    }
    setCurrentDate(cYMD);
    setCurrentMonth(currentMonth);
    setCurrentList(currentMonthArr);
};

  const countTime = (n: number, dateTime: any) => {
    const getTime = dateTime.getTime() + 24 * 60 * 60 * 1000 * n;    
    const needDate = new Date(getTime);
    const getYear = needDate.getFullYear();
    const getMonth = formatDate(needDate.getMonth() + 1);
    const getDate = needDate.getDate();
    const obj = {
      cYear: getYear,
      cMonth: getMonth,
      cDate: getDate,
      cYMD: `${getYear}-${getMonth}-${formatDate(getDate)}`,
    };
    return obj;
  };

  const selectDay = (item: any, index: number) => {
    setCurrentDate(item.cYMD);
    // setActive(index);
    // setDataTime(item);
    console.log(index);
    props.onWeekChange(item.cYMD);
  };
  const changeDate = (dateTime: any) => {
    setDate(dateTime);
    setDpValue(dateTime);
    initDate(dateTime);
    currentMonthDays(dateTime);
    setVisible(false);
    props.onDateChange(moment(dateTime).format('YYYY-MM-DD'));
  };
 
  useEffect(()=>{
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setElement(document.getElementsByClassName('day-text')[moment(date).format('YYYY-MM-DD')]);
    if(element){
     element.scrollIntoView({
       behavior: 'smooth',
       block: 'end',
       inline: 'nearest',
     });
    }
  },[date,element]);
  return (
    <div className="week-calendar">
      <div className="flex-between">
        <div className="date"
         onClick={() => {
            setVisible(true);
          }}
        >
          <b className='month'>{currentMonth}</b>月
          <span className='trilateral'
          ></span>
        </div>
        <div className="change-date">
          {/* <div
            onClick={() => {
              setVisible(true);
            }}
          >
            日期选择
            <img src={calendar} />
          </div> */}
          <DatePicker
            visible={visible}
            mode="date"
            title="日期选择"
            value={dpValue}
            minDate={minDate}
            maxDate={now}
            onOk={(date) => changeDate(date)}
            onDismiss={() => setVisible(false)}
          ></DatePicker>
        </div>
      </div>

      <div className="all-date">
        {/* <div className="list">
          {week.map((item: string, index: number) => (
            <div className="week-text" key={`item-${item}`}>
              <div className={`${active === index ? 'active-top' : ''}`}>
                {item}
              </div>
            </div>
          ))}
        </div> */}
        <div className="list">
                {currentList.map((item: any, index: number) => (
                <div
                className="day-text"
                key={`item-${item.cDate}`}
                onClick={() => {
                    selectDay(item, index);
                }}
                id={item.id}
                >
                <div className={ `cDate ${currentDate === item.cYMD ? 'active-bottom' : ''}`}>
                    {item.cDate}
                </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
