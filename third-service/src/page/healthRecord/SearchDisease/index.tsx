import React, { useState } from 'react';
import './index.scss';
import SearchResult from '../SearchResult';
import { searchDisease, searchSurgery } from '@api/healthRecord';
interface IProps {
  cb: (name?: string) => void;
  list: any;
  type?: number;
}
const SearchDisease = (props: IProps) => {
  // 搜索框的内容
  const [value, setValue] = useState('');
  const [isAjax, setIsAjax] = useState(false);
  const [text, setText] = useState('');
  const [resultList, setResultList] = useState([]);
  const search = (name?: string) => {
    if (name || value) {
      if (props.type === 16) {
        searchSurgery({
          searchKey: name || value,
        }).then((res: any) => {
          callBack(res);
          !isAjax && setIsAjax(true);
        });
        return;
      }
      searchDisease({
        searchKey: name || value,
      }).then((res: any) => {
        // 匹配关键字高亮
        callBack(res);
        !isAjax && setIsAjax(true);
      });
    }
  };
  const callBack = (res: any) => {
    res.length &&
      res.forEach((item: any) => {
        var reg = new RegExp(value, 'g'); //定义正则
        item.oldName = item.name;
        item.name = item.name.replace(
          reg,
          `<span class="keyword">${value}</span>`
        ); //进行替换，并定义高亮的样式
      });
    setText(
      `无"${value}"的匹配${
        props.type === 16 ? '手术' : '疾病'
      }, 换个关键词试试吧"`
    );
    setResultList(res);
  };
  return (
    <div className='drawer-overlay'>
      <div className='search'>
        <div className='search-header flex'>
          <div
            className='back'
            onClick={() => {
              props.cb && props.cb();
            }}></div>
          <div className='search-content flex'>
            <div className='left flex'>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  search(e.target.value);
                }}
                placeholder={
                  props.type === 16
                    ? '请输入手术的名称'
                    : '请输入确诊的疾病名称'
                }
                className='search-input'
                value={value}></input>
            </div>

            <div
              className='search-text'
              onClick={() => {
                search();
              }}>
              搜索
            </div>
          </div>
        </div>
        <div className='content'>
          <SearchResult
            resultList={resultList}
            text={text}
            isAjax={isAjax}
            callback={(item: any) => {
              const checkList = props.list.filter((litem: any) => {
                return litem.text === item.oldName;
              });
              props.cb && props.cb(checkList.length ? '' : item.oldName);
            }}></SearchResult>
        </div>
      </div>
    </div>
  );
};
export default SearchDisease;
