/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import Page from '@components/Page';
import { Toast, Modal } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import './index.scss';
const colorsC = ['蓝', '黄', '绿', '红', '紫'];
const colorsE = ['a0', 'a1', 'a2', 'a3', 'a4'];
let timmer: any = null;
let toastScore = 0;
let gameFlag = true;
const alert = Modal.alert;
let timer = 30;
export default function ColorGame() {
  const history = useHistory();
  const [spanList, setSpanList] = useState([] as Array<any>);
  const [centerText, setCenterText] = useState({
    name: '',
    claName: '',
  });
  const [timeText, setTimeText] = useState('剩余时间:30');
  const [score, setScore] = useState(0);

  const resetColor = useCallback(() => {
    let arrC: Array<number> = [];
    let arrE: Array<number> = [];
    setCenterText({
      name: colorsC[rand(0, 4)],
      claName: colorsE[rand(0, 4)],
    });
    //中文颜色存数组
    // eslint-disable-next-line no-constant-condition
    while (true) {
      let num: number = rand(0, 4);
      if (!arrC.includes(num)) {
        arrC.push(num);
      }
      if (arrC.length === 5) {
        break;
      }
    }
    //英文颜色存数组
    // eslint-disable-next-line no-constant-condition
    while (true) {
      let num = rand(0, 4);
      if (!arrE.includes(num)) {
        arrE.push(num);
      }
      if (arrE.length === 5) {
        break;
      }
    }
    let arrObj: Array<any> = [];
    for (let i = 0; i < 5; i++) {
      arrObj.push({
        name: colorsC[arrC[i]],
        claName: colorsE[arrE[i]],
      });
    }
    setSpanList(arrObj);
  }, []);
  const reSetGame = useCallback(() => {
    gameFlag = true;
    timmer = setInterval(() => {
      timer--;
      setTimeText('剩余时间:' + timer);
      if (timer === 0) {
        timer = 30;
        gameFlag = false;
        Toast.info('游戏结束, 您的分数是' + toastScore);
        clearInterval(timmer);
      }
    }, 1000);
  }, []);
  useEffect(() => {
    resetColor();
    reSetGame();
    return () => {
      clearInterval(timmer);
    };
  }, [reSetGame, resetColor]);
  const rand = (x, y): number => {
    return Math.floor(Math.random() * (y - x + 1)) + x;
  };
  const spanClick = (item) => {
    if (!gameFlag) {
      alert('重新开始', '重新开始游戏吗?', [
        {
          text: '返回',
          onPress: () => {
            history.go(-1);
          },
        },
        {
          text: '确认',
          onPress: () => {
            reSetGame();
            setScore(0);
          },
        },
      ]);
      return;
    }
    if (colorsC.indexOf(item.name) === colorsE.indexOf(centerText.claName)) {
      setScore(score + 1);
      toastScore = score + 1;
      resetColor();
    }
  };

  return (
    <Page title='脑力训练游戏'>
      <div className='game-page'>
        <div className='wp_t' id='top1'>
          <span>{timeText}</span>
          <span>分数:{score}</span>
        </div>
        <div className='wp_c'>
          <span className={centerText.claName}>{centerText.name}</span>
        </div>
        <div className='wp_b' id='footer1'>
          {spanList.map((item) => {
            return (
              <span
                key={item.name}
                className={item.claName}
                onClick={() => {
                  spanClick(item);
                }}>
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
    </Page>
  );
}
