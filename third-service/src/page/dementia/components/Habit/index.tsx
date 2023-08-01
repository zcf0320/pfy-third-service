import React, { useEffect, useState } from 'react';
import './index.scss';
interface IProps {
    value: number;
    habitList: Array<string>;
    onChange: (val: number) => void;
    getDiseaseList: (arr: Array<string>) => void;
  }
export default function HabitPage(props: IProps) {
    const [value, setValue] = useState(-1);
    const [habitList, setHabitList] = useState<Array<string>>([]);
    const onChange = (val: number) => {
        setValue(val);
        props.onChange(val);
      };
    const habitChange = (val: string) => {
        let arr:Array<string> = [...habitList];
        if(habitList.includes(val)){
            arr = habitList.filter(item => {
                return item !== val;
            });
        }else{
            arr.push(val);
        }
        setHabitList(arr);
        props.getDiseaseList(arr);
      };
      useEffect(() => {
        if(props.value !== -1) {
            setValue(props.value);
        }
        if(props.habitList){
            setHabitList(props.habitList);
        }
      }, [props.value, props.habitList]);
    return (
        <div className="yes-no">
        <div className="title">您是否有不良习惯</div>
        <div className="subtitle">完善信息为您选择更适合您的方案</div>
        <div className="flex-center mb-64">
            <div
            className={`item ${value === 1 ? 'active' : ''}`}
            onClick={() => onChange(1)}
            >
            是
            </div>
            <div
            className={`item ${value === 0 ? 'active' : ''}`}
            onClick={() => onChange(0)}
            >
            否
            </div>
        </div>
        {
            value === 1 ? (
                <div>
                    <div className="title mb-64">请选择不良习惯</div>
                    <div className="habit-list">
                        <div className={`habit-list-item ${habitList.includes('抽烟')?'active':''}`} onClick={() => {
                            habitChange('抽烟');
                        }}>抽烟</div>
                        <div className={`habit-list-item ${habitList.includes('喝酒')?'active':''}`} onClick={() => {
                            habitChange('喝酒');
                        }}>喝酒</div>
                    </div>
                </div>
            ) : null
        }
      </div>
    );
}