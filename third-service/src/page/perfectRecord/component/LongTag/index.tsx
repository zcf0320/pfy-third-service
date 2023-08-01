import React, { useEffect } from 'react';
import './index.scss';

interface IProps {
  list: any; //待选择列表
  choosed: any; //选中的列表
  multiple: boolean; //是否多选
  setChoosed: Function; //传出选中的列表
}
function LongTag(props: IProps) {
  const { list, multiple, choosed, setChoosed } = props;
  useEffect(() => {}, [choosed]);
  return (
    <div className="step2-long-tag">
      <div className="tag-box flex">
        {list.length &&
          list.map((item: any) => {
            return (
              <div
                className={`tag ${choosed.includes(item.title) && 'active'} `}
                key={item.title}
                onClick={() => {
                  let set: any = new Set(choosed);
                  if (set.has(item.title)) {
                    set.delete(item.title);
                  } else {
                    if (!multiple) {
                      set = new Set();
                    }
                    set.add(item.title);
                  }
                  setChoosed([...set]);
                }}
              >
                <span className="title">{item.title}</span>
                <span className="note">{item.note}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default LongTag;
