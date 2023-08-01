import React from 'react';
import { useStores } from '@utils/useStore';
import './index.scss';
import { observer } from 'mobx-react';

function CustomModal() {
  const commonStore = useStores('commonStore');
  const {
    title,
    show,
    content,
    subTitle,
    subColor,
    cancelText,
    confirmText,
    clickCancel,
    clickConfirm,
    confirmActive,
    cancelActive,
  } = commonStore.customModal;
  return (
    <div>
      {show ? (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <div className="title flex">{title}</div>
            <div className="modal-content flex">
              <div className="content-text">{content}</div>
              {subTitle ? (
                <div
                  className="sub-title-text"
                  style={{ color: subColor || '#FEBD44' }}
                >
                  {subTitle}
                </div>
              ) : null}
              <div className="action-list flex">
                <div
                  className={`action-item flex ${
                    cancelActive ? 'confirm' : 'cancel'
                  }`}
                  onClick={() => {
                    clickCancel();
                    commonStore.initModal();
                  }}
                >
                  {cancelText}
                </div>
                <div
                  className={`action-item flex ${
                    confirmActive ? 'confirm' : 'cancel'
                  }`}
                  onClick={() => {
                    clickConfirm();
                    commonStore.initModal();
                  }}
                >
                  {confirmText}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default observer(CustomModal);
