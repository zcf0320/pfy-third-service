import React from 'react';
import './index.scss';

type IProps = {
  step: Number;
  close: () => void;
  continueStep: (pathname: string) => void;
};

const ContinuePage = (props: IProps) => {
  let { step, close, continueStep } = props;

  const closePage = () => {
    if (step === 1) {
      close();
    } else if (step === 2) {
      continueStep('/perfect/step2');
    }
  };

  return (
    <div className="continue-page">
      <div className="content">
        <div className="modal">
          <div className="modal-title">提示</div>
          <div className="tips">您要继续完善呢档案吗？</div>
          <div className="button">
            <div className="reset" onClick={closePage}>
              重新填写
            </div>
            <div
              className="continue"
              onClick={() => {
                if (step === 1) {
                  continueStep('/perfect/step2');
                } else if (step === 2) {
                  continueStep('/perfect/step3');
                }
              }}
            >
              继续填写
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuePage;
