import Page from '@components/Page';
import { getRecordList } from '@api/zhInsurance';
import React, { useEffect, useState } from 'react';
import { getUrlParams } from '@utils/filter';
import RecordItem from './recordItem';
function Record() {
  const [list, setList] = useState<Array<any>>([]);
  useEffect(() => {
    getRecord();
  }, []);
  const getRecord = () => {
    let params = {
      serviceRecordId: getUrlParams('serviceRecordId') || '',
      pageSize: 10,
      pageNum: 1,
    };
    getRecordList(params).then((res: any) => {
      setList(res.records);
    });
  };
  return (
    <Page title={list.length && list[0].itemName}>
      <div className="page-record flex">
        {list &&
          list.length &&
          list.map((item, index) => {
            return <RecordItem key={index} recordDetail={item}></RecordItem>;
          })}
      </div>
    </Page>
  );
}
export default Record;
