import React, { useEffect, useState } from 'react';
import './index.scss';
import searchIcon from '@assert/images/search-icon.png';
import deleteIcon from '@assert/images/delete-icon.png';
import { InputItem, Toast } from 'antd-mobile';
import * as common from '@api/common';

interface IProps {
  value: number;
  diseaseList: Array<any>;
  onChange: (val: number) => void;
  getDiseaseList: (arr: Array<any>) => void;
}
export default function YesOrNo(props: IProps) {
  const [value, setValue] = useState(-1);
  const [resultList, setResultList] = useState([]);
  const [list, setList] = useState([] as any);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const onChange = (val: number) => {
    setValue(val);
    props.onChange(val);
  };
  useEffect(() => {
    setValue(props.value);
    setList(props.diseaseList);
  }, [props.value, props.diseaseList]);
  const search = (name: string) => {
      if (name) {
        common
          .searchDisease({searchKey:name})
          .then((res: any) => {
            setResultList(res);
            setShow(true);
          })
          .catch(() => {});
      } else {
        setResultList([]);
        setShow(false);
      }
  };
  const addDisease = (item: any) => {
    const repeat = list.filter((lItem: any) => {
      return lItem.name === item.name;
    });
    if (repeat.length) {
      Toast.info('已添加该病史');
      return;
    }
    if(list.length>=10){
      Toast.info('最多10个病史');
      return;
    }
    list.push(item);
    setInput('');
    setList(list);
    setShow(false);
    setResultList([]);
    props.getDiseaseList(list);
  };
  const deleteItem = (index: number) => {
    list.splice(index, 1);
    setList([...list]);
    props.getDiseaseList(list);
  };
  return (
    <div className="yes-no">
      <div className="title">您是否有家族病史</div>
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
        value === 1 ? 
        <div>
          <div className="title mb-64">请选择病史名称</div>
          <div className="search">
            <div className="search-bar">
              <img alt='' className="search-icon" src={searchIcon} />
              <InputItem
                clear
                value={input}
                placeholder="请搜索相关疾病名称"
                onChange={(val) => {
                  setInput(val);
                  search(val);
                }}
              ></InputItem>
            </div>
            {show
              ? (
              <div className="search-result">
                <div className="result">
                  {resultList.length > 0
                    ? (
                        resultList.map((item: any) => (
                      <div
                        className="result-item"
                        key={item.id}
                        onClick={() => {
                          addDisease(item);
                        }}
                      >
                        <div className="icon"></div>
                        <div className="text">
                          <div>{item.name}</div>
                        </div>
                      </div>
                        ))
                      )
                    : (
                    <div className="no-result">
                      无<span>{input}</span>的匹配疾病, 换个关键词试试吧
                    </div>
                      )}
                </div>
              </div>
                )
              : null}
          </div>

          <div className="tag-list">
            {list && list.length > 0 &&
              list.map((item: any, index: number) => {
                return (
                  <div className="tag-item" key={item.id}>
                    <div className="item-content">{item.name}</div>
                    <img
                      alt=''
                      src={deleteIcon}
                      onClick={() => {
                        deleteItem(index);
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div> : null
      }
    </div>
  );
}
