import React, { useState, useEffect } from 'react';
import taskList from './data';
import './index.scss';
interface IProps {
    step: number;
}
function StarStep(props: IProps) {
    const { step } = props;
    const [nowTask, setNowTask] = useState<any>([]);
    const [nowIndex, setNowIndex] = useState(0);
    const [process, setProcess] = useState(0);
    useEffect(()=>{
        setNowTask(taskList[Math.ceil(step / 3) - 1]);
        if(step%3 === 0){
            setProcess(75);
            setNowIndex(3);
        }else{
            setProcess((step%3)*25);
            setNowIndex(step%3);
        }
    }, [step]);
    return (
        <div className='healthy-step'>
            <div className="healthy-step-line">
                <div className="healthy-step-line-active"></div>
                <div className="healthy-step-line-active-bg" style={{width: `${process}%`}}></div>
                {
                    nowTask.map((item, index) => {
                        return (
                            <div className="star-item" key={`星星${index}`}>
                                {(index+1) === nowIndex ? <div className="star-item-img-1"></div> : null}
                                {(index+1) > nowIndex ? <div className="star-item-img-2"></div> : null}
                                {(index+1) < nowIndex ? <div className="star-item-img-3"></div> : null}
                                {item.star === 0 ? null : <div className="star-item-text">+{item.star}星</div>}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}
export default  StarStep;