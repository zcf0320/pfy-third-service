/** @format */

import React, { useState, useEffect } from 'react';
import Page from '@components/Page';
import './index.scss';
import { getUrlParams } from '@utils/filter';
import { useHistory } from 'react-router-dom';
import { useStores } from '@utils/useStore';
import { observer } from 'mobx-react';
import { Picker } from 'antd-mobile';
import next from '@assert/next.png';
import i18n from '@i18n/index';
function Info() {
  const questionnaireStore = useStores('questionnaireStore');
  const commonStore = useStores('commonStore');
  const history = useHistory();
  const { style, config } = questionnaireStore.customConfig || {};
  const { name: title, backgroundSettings } = style || {};
  const { name, age, email, sex, idCard, mobile, job, area } = config || {};
  const [pickerValue, setPickValue] = useState([]);
  const [pickerProfessionValue, setPickerProfessionValue] = useState([]);

  useEffect(() => {
    !style &&
      questionnaireStore.getCustomConfig({
        questionnaireId: getUrlParams('id'),
      });
    commonStore.getProviceList();
  }, [commonStore, questionnaireStore, style]);
  const setValue = (key: string, value: string | number) => {
    let obj: any = {};
    obj[key] = value;

    questionnaireStore.setPostData(obj);
  };
  const watchData = () => {
    const {
      name: nameValue,
      sex: sexValue,
      age: ageValue,
      mobile: mobileValue,
      idCard: idCardValue,
      email: emailValue,
    } = questionnaireStore.postData;
    let result = true;
    if (name) {
      if (nameValue) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    if (sex) {
      if (sexValue || sexValue === 0) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    if (age) {
      if (ageValue) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    if (mobile) {
      if (mobileValue) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    if (idCard) {
      if (idCardValue) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    if (area) {
      if (pickerValue.length) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    if (job) {
      if (pickerProfessionValue.length) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    if (email) {
      if (emailValue) {
        result = true;
      } else {
        result = false;
        return false;
      }
    }
    return result;
  };
  const { sex: sexValue } = questionnaireStore.postData;
  return (
    <Page title={title}>
      <div
        className='page-custom-info flex'
        style={{ backgroundColor: backgroundSettings }}>
        <div className='start-title'>{title}</div>
        <div className='info-content'>
          <div className='content-title flex'>
            {i18n.chain.questionnaire.personalInformation}
          </div>
          {name ? (
            <div className='content-item flex'>
              <span className='left'>{i18n.chain.questionnaire.fullName}</span>
              <input
                type='text'
                className='right'
                placeholder={i18n.chain.questionnaire.enterName}
                onChange={(e) => {
                  setValue('name', e.target.value);
                }}
              />
            </div>
          ) : null}
          {sex ? (
            <div className='content-item flex'>
              <span className='left'>{i18n.chain.questionnaire.gender}</span>
              <div className='select flex'>
                <div
                  className='select-item flex'
                  onClick={() => {
                    setValue('sex', 1);
                  }}>
                  <div
                    className={`select-dot flex ${
                      sexValue === 1 ? '' : 'disable'
                    }`}
                    style={{ borderColor: backgroundSettings }}>
                    {sexValue === 1 ? (
                      <div
                        className='dot'
                        style={{ backgroundColor: backgroundSettings }}></div>
                    ) : null}
                  </div>
                  <span>{i18n.chain.questionnaire.male}</span>
                </div>
                <div
                  className='select-item flex'
                  onClick={() => {
                    setValue('sex', 0);
                    // watchData()
                  }}>
                  <div
                    className={`select-dot flex ${
                      sexValue === 0 ? '' : 'disable'
                    }`}>
                    {sexValue === 0 ? (
                      <div
                        className='dot'
                        style={{ backgroundColor: backgroundSettings }}></div>
                    ) : null}
                  </div>
                  <span>{i18n.chain.questionnaire.female}</span>
                </div>
              </div>
            </div>
          ) : null}
          {age ? (
            <div className='content-item flex'>
              <span className='left'>{i18n.chain.questionnaire.age}</span>
              <input
                type='text'
                className='right'
                placeholder={i18n.chain.questionnaire.enterAge}
                onChange={(e) => {
                  setValue('age', e.target.value);
                }}
              />
            </div>
          ) : null}
          {mobile ? (
            <div className='content-item flex'>
              <span className='left'>
                {i18n.chain.questionnaire.phoneNumber}
              </span>
              <input
                type='text'
                maxLength={11}
                className='right'
                placeholder={i18n.chain.questionnaire.enterPhoneNumber}
                onChange={(e) => {
                  setValue('mobile', e.target.value);
                }}
              />
            </div>
          ) : null}
          {idCard ? (
            <div className='content-item flex'>
              <span className='left'>{i18n.chain.questionnaire.idNumber}</span>
              <input
                type='text'
                className='right'
                placeholder={i18n.chain.questionnaire.enterIDNumber}
                onChange={(e) => {
                  setValue('idCard', e.target.value);
                }}
              />
            </div>
          ) : null}
          {area ? (
            <Picker
              title={i18n.chain.questionnaire.selectRegion}
              cols={2}
              data={commonStore.proviceList}
              value={pickerValue}
              onOk={(v) => {
                setPickValue(v);
                setValue(
                  'area',
                  `${commonStore.proviceList[v[0]].label} ${
                    commonStore.proviceList[v[0]].children[v[1]].label
                  }`
                );
              }}>
              <div className='content-item flex'>
                <div className='left flex'>
                  <span>{i18n.chain.questionnaire.region}</span>
                </div>
                <div className='right flex'>
                  {pickerValue.length ? (
                    <span>
                      {
                        commonStore.proviceList[pickerValue[0]].children[
                          pickerValue[1]
                        ].label
                      }
                    </span>
                  ) : (
                    <span className='placeholder'>
                      {i18n.chain.common.select}
                    </span>
                  )}
                  <img src={next} alt='' className='next' />
                </div>
              </div>
            </Picker>
          ) : null}

          {job ? (
            <Picker
              title={i18n.chain.questionnaire.chooseCareer}
              cols={2}
              data={commonStore.professionList}
              value={pickerProfessionValue}
              onOk={(v) => {
                setPickerProfessionValue(v);
                setValue(
                  'job',
                  commonStore.professionList[v[0]].children[v[1]].label
                );
              }}>
              <div className='content-item flex'>
                <div className='left flex'>
                  <span>{i18n.chain.questionnaire.occupation}</span>
                </div>
                <div className='right flex'>
                  {pickerProfessionValue.length ? (
                    <span>
                      {
                        commonStore.professionList[pickerProfessionValue[0]]
                          .children[pickerProfessionValue[1]].label
                      }
                    </span>
                  ) : (
                    <span className='placeholder'>
                      {i18n.chain.common.select}
                    </span>
                  )}
                  <img src={next} alt='' className='next' />
                </div>
              </div>
            </Picker>
          ) : null}
          {email ? (
            <div className='content-item flex'>
              <span className='left'>{i18n.chain.questionnaire.mailbox}</span>
              <input
                type='text'
                className='right'
                placeholder={i18n.chain.questionnaire.enterEmailAddress}
                onChange={(e) => {
                  setValue('email', e.target.value);
                }}
              />
            </div>
          ) : null}
          <div
            className={`submit flex ${watchData() ? '' : 'disable'}`}
            style={{ backgroundColor: backgroundSettings }}
            onClick={() => {
              if (!watchData()) {
                return;
              }
              history.push(
                `/questionnaire/custom/answer?id=${getUrlParams(
                  'id'
                )}&channelId=${getUrlParams('channelId') || ''}`
              );
            }}>
            {i18n.chain.button.openNow}
          </div>
        </div>
      </div>
    </Page>
  );
}
export default observer(Info);
