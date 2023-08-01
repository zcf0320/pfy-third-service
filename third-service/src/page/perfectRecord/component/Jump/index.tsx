/** @format */

import React from 'react';
import prev from '@assert/prev.png';
import skip from '@assert/skip.png';
import unchecked from '@assert/unchecked.png';
import checked from '@assert/checked.png';
import './index.scss';
import { useState } from 'react';
import i18n from 'i18n';

type IProps = {
  index: number;
  isClick?: boolean;
  nextText?: string;
  showSkip?: boolean;
  next: () => void;
  back: () => void;
  skip: () => void;
};

const Jump = (props: IProps) => {
  let { index, isClick } = props;
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState(false);
  const clickSkip = () => {
    if (localStorage.getItem('not-tips')) {
      props.skip();
    } else {
      setShow(true);
    }
  };
  const clickConfirm = () => {
    if (select) {
      localStorage.setItem('not-tips', 'true');
    }
    props.skip();
  };

  return (
    <div className='jump'>
      {index > 1 ? (
        <div
          className='back'
          onClick={() => {
            props.back && props.back();
          }}>
          <img alt='' src={prev} />
          {i18n.chain.button.last}
        </div>
      ) : (
        <div className='back'></div>
      )}
      <div
        className={`${isClick ? 'next' : 'disable-next'}`}
        onClick={() => {
          if (!isClick) {
            return;
          }
          props.next && props.next();
        }}>
        {props.nextText ? props.nextText : i18n.chain.button.next}
      </div>
      {props.showSkip ? (
        <div
          className='skip'
          onClick={() => {
            clickSkip();
          }}>
          <img alt='' src={skip} />
          {i18n.chain.button.skip}
        </div>
      ) : (
        <div className='skip'></div>
      )}

      {show && (
        <div className='skip-modal'>
          <div className='skip-modal-content'>
            <div className='skip-modal-content-dialog'>
              <div className='title'>提示</div>
              <div className='content-text'>跳过此步骤，将取消星币奖励</div>
              <div className='action-list'>
                <div
                  className='confirm'
                  onClick={() => {
                    clickConfirm();
                  }}>
                  {i18n.chain.button.confirmSkip}
                </div>
                <div
                  className='cancel'
                  onClick={() => {
                    setShow(false);
                    setSelect(false);
                  }}>
                  {i18n.chain.button.continueFilling}
                </div>
              </div>
            </div>
            <div
              className='not-tips'
              onClick={() => {
                setSelect(!select);
              }}>
              <img alt='' src={select ? checked : unchecked} />
              下次不再提示
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jump;
