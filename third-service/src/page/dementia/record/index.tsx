/** @format */
import React from 'react';
import moment from 'moment';
import Page from '@components/Page/index';
import './index.scss';
import { useEffect } from 'react';
import { getUrlParams } from '@utils/filter';
import { getRecordListByServiceRecordId } from '@api/dementia';
import { useState } from 'react';
import { Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
export default function Record() {
  const history = useHistory();
  const serviceRecordId = getUrlParams('serviceRecordId');
  const [list, setList] = useState([] as any);
  useEffect(() => {
    if (serviceRecordId) {
      getRecordListByServiceRecordId(serviceRecordId)
        .then((result) => {
          setList(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Toast.fail('参数不合法', 1, () => {
        history.go(-1);
      });
    }
  }, [history, serviceRecordId]);
  return (
    <Page title='使用记录'>
      <div className='record-list'>
        <div className='record-list-title'>测试问卷</div>
        {list.length > 0 &&
          list.map((item) => {
            return (
              <div className='record-list-wrap' key={item.resultId}>
                <div className='record-list-wrap-left'>
                  <div className='name'> {item.name}</div>
                  <div className='time'>
                    {moment(item.createTime).format('YYYY-MM-DD HH:MM')}
                  </div>
                </div>
                <div
                  className='record-list-wrap-right'
                  onClick={() => {
                    if (item.code === 'yyzpWj') {
                      history.push(
                        `/questionnaire/depressed/result?code=${item.code}&resultId=${item.resultId}&serviceRecordId=${serviceRecordId}`
                      );
                    } else {
                      history.push(
                        `/questionnaire/alzheimer/result?code=${item.code}&resultId=${item.resultId}&serviceRecordId=${serviceRecordId}`
                      );
                    }
                  }}>
                  查看详情
                  <img
                    src='https://questionnaire-1301127519.cos.ap-shanghai.myqcloud.com/dementia/go-green.png'
                    alt='图'
                  />
                </div>
              </div>
            );
          })}
      </div>
    </Page>
  );
}
