import { Toast } from 'antd-mobile';
import React, { useState } from 'react';
import './index.scss';
import { searchDisease, searchSurgery } from '@api/healthRecord';
import { searchDrug } from '@api/common';

interface IProps {
  updateList: Function; //新增标签
  exsitList: any; //已经存在的标签
  close: Function;
  type: number; //类型 2疾病 1手术 3 药品
}

function Disease(props: IProps) {
  const { close, exsitList, updateList, type } = props;
  const [search, setSearch] = useState(true);
  const [resultList = [], setResultList] = useState([]);
  const [value, setValue] = useState('');
  const [text, setText] = useState('');

  const focus = () => {
    setSearch(false);
  };
  const blur = () => {
    setSearch(true);
  };
  const searchItem = () => {
    if (value) {
      if (type === 3) {
        searchDrug({
          searchKey: value,
        }).then((res: any) => {
          callBack(res);
        });
      } else if (type === 2) {
        searchDisease({
          searchKey: value,
        }).then((res: any) => {
          // 匹配关键字高亮
          callBack(res);
        });
      } else {
        searchSurgery({
          searchKey: value,
        }).then((res: any) => {
          callBack(res);
        });
      }
    } else {
      callBack([]);
    }
  };
  const callBack = (res: any) => {
    let flag = false;
    let str = `无"${value}"的匹配疾病, 换个关键词试试吧`;
    res.forEach((item: any) => {
      var reg = new RegExp(value, 'g'); //定义正则
      if (item.name.indexOf(value) !== -1) {
        flag = true;
      }
      item.oldName = item.name;
      item.name = item.name.replace(reg, `<div class="keyword">${value}</div>`); //进行替换，并定义高亮的样式
    });
    console.log(flag);
    setText(`${flag ? '' : str}`);
    console.log(str);
    if (flag) {
      setResultList(res);
    } else {
      setResultList([]);
      setText(`无"${value}"的匹配疾病, 换个关键词试试吧`);
    }
  };
  const showhtml = (htmlString: string) => {
    var html = { __html: htmlString };
    return <div dangerouslySetInnerHTML={html}></div>;
  };
  const select = (name: string) => {
    let text = name.replace(/<[^<>]+>/g, '');
    if (exsitList.includes(text)) {
      Toast.info('已存在此标签！');
    } else {
      updateList(text);
    }
  };
  return (
    <div className='pace-modal'>
      <div className='pace-disease'>
        <div className='pace-disease-search'>
          <div
            className='back'
            onClick={() => {
              close();
            }}></div>
          {search && <div className='icon'></div>}
          <input
            className={`input ${!search && 'padding'}`}
            placeholder='请输入确诊的疾病名称'
            type='text'
            onFocus={focus}
            onBlur={blur}
            value={value}
            onChange={(e: any) => {
              setValue(e.target.value);
            }}
          />
          <div className='line'></div>
          <div
            className='search'
            onClick={() => {
              searchItem();
            }}>
            搜索
          </div>
        </div>
        <div className='pace-disease-content'>
          {resultList.map((item: any) => {
            return (
              <div
                className='flex list'
                key={item.name}
                onClick={() => {
                  select(item.name);
                }}>
                <div className='list-icon'></div>
                <div className='list-name'>
                  {showhtml(`<div className="keyword">${item.name}</div>`)}
                </div>
              </div>
            );
          })}
        </div>
        {resultList.length === 0 && (
          <div className='pace-disease-none'>暂无更多</div>
        )}
        {text}
        {text && <div className='pace-disease-none'>{text}</div>}
      </div>
    </div>
  );
}
export default Disease;
