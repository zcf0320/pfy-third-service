import React from 'react';
import './index.scss';
interface IProps {
  resultList: Array<ResultItem>;
  text?: string;
  callback: (item?: ResultItem) => void;
  isAjax?: boolean;
}

interface ResultItem {
  id: string | number;
  name: string;
}

const SearchResult = (props: IProps) => {
  let { resultList } = props;
  console.log(resultList);
  return (
    <div className="search-result">
      {resultList && resultList.length ? (
        <div className="result">
          {resultList.map((item: ResultItem, index: number) => (
            <div
              className="item"
              key={index}
              onClick={() => {
                props.callback && props.callback(item);
              }}
            >
              <div className="icon"></div>
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: item.name }}
              ></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="none-result">
          <div className={`none-img ${props.isAjax ? 'no-data' : ''}`}></div>
          <div className="none-text">{props.text || '搜索疾病'}</div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
