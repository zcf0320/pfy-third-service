import React, { useState } from 'react';
import './index.scss';
import { imgUrl } from '@utils/appConfig';
import { Toast } from 'antd-mobile';

interface IProps {
  title?: string;
  list: any; //待选择列表
  choosed: any; //选中的列表
  multiple: boolean; //是否多选
  setChoosed: Function; //传出选中的列表
  size: string; //tag大小 big small medium
  imgList?: any; //tag icon
  tips?: string; //提示
  isShow?: boolean; //提示是否显示
  showTip?: Function; //关闭提示
  addTag?: boolean; //新增标签
  edit?: boolean; //自定义标签
  editType?: number; //自定义标签类型 1外伤 2过敏史
  addList?: Function; //自定义新增
  openSearch?: Function; //打开自定义弹窗
  drugList?: any; // 药品过敏的列表
  setChoosedDrug?: Function;
  choosedDrug?: any;
}
function Tag(props: IProps) {
  const {
    title,
    list,
    multiple,
    choosed,
    setChoosed,
    size,
    imgList,
    tips,
    isShow,
    showTip,
    addTag,
    edit,
    addList,
    openSearch,
    editType,
    drugList,
    choosedDrug,
    setChoosedDrug,
  } = props;

  const [text, setText] = useState('');
  const [type, setType] = useState(1);
  const changeSize = () => {
    if (size === 'big') {
      return 'bigTag';
    } else if (size === 'small') {
      return 'smallTag';
    } else if (size === 'medium') {
      return 'mediumTag';
    } else {
      return null;
    }
  };
  return (
    <div className="step2-tag">
      {title && (
        <div className="title">
          {title}
          {tips && (
            <div className="tips">
              <div
                className="tips-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  showTip!(true);
                }}
              ></div>
              {isShow && <div className="tips-text">{tips}</div>}
            </div>
          )}
        </div>
      )}
      {editType === 2 ? (
        <div className="big-union flex">
          <div
            className={`union-item flex ${type === 1 ? 'select' : ''}`}
            onClick={() => {
              setType(1);
            }}
          >
            其他过敏
          </div>
          <div
            className={`union-item flex ${type === 2 ? 'select' : ''}`}
            onClick={() => {
              setType(2);
            }}
          >
            药物过敏
          </div>
        </div>
      ) : null}

      <div className="img-box flex">
        {imgList &&
          imgList.map((item: string) => {
            return (
              <div className="img-container flex" key={item}>
                <img src={`${imgUrl}${item}`} alt="" className="img" />
              </div>
            );
          })}
      </div>
      <div className="tag-box flex">
        {type === 1 &&
          list.length &&
          list.map((item: string) => {
            return (
              <div
                className={`tag ${
                  choosed.includes(item) && 'active'
                } ${changeSize()}`}
                key={item}
                onClick={() => {
                  let set: any = new Set(choosed);
                  if (set.has(item)) {
                    set.delete(item);
                  } else {
                    if (!multiple) {
                      set = new Set();
                    }
                    set.add(item);
                  }
                  setChoosed([...set]);
                }}
              >
                {item}
              </div>
            );
          })}
        {!!(editType === 2 && type === 2 && drugList.length) &&
          drugList.map((item: string) => {
            return (
              <div
                className={`tag ${
                  choosedDrug.includes(item) && 'active'
                } ${changeSize()}`}
                key={item}
                onClick={() => {
                  let set: any = new Set(choosedDrug);
                  if (set.has(item)) {
                    set.delete(item);
                  } else {
                    if (!multiple) {
                      set = new Set();
                    }
                    set.add(item);
                  }
                  setChoosedDrug && setChoosedDrug([...set]);
                }}
              >
                {item}
              </div>
            );
          })}
        {addTag ||
          (editType === 2 && type === 2 && (
            <div
              className="tag bigTag"
              onClick={() => {
                openSearch!();
              }}
            >
              +
            </div>
          ))}
      </div>
      {edit && type === 1 && (
        <div className="input-box">
          <input
            className="record-input"
            placeholder={editType === 1 ? '请填写外伤史' : '请输入其他既往史'}
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          {text && (
            <div
              className="confirm"
              onClick={() => {
                let set: any = new Set(list);
                if (set.has(text)) {
                  Toast.info('已存在此标签！');
                } else {
                  addList!(text);
                }
                setText('');
              }}
            >
              确认
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Tag;
