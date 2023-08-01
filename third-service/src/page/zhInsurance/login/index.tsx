import React, { useEffect, useState } from 'react';
import { useStores } from '@utils/useStore';
import { useHistory } from 'react-router-dom';
import logo1 from '@assert/logo_1.png';
import logo2 from '@assert/logo_2.png';
import logo3 from '@assert/logo_3.png';
// import common1 from '@assert/common_1.png'
// import common2 from '@assert/common_2.png'
import { InputItem } from 'antd-mobile';
import './index.scss';
import { getUrlParams } from '@utils/filter';
import { imgUrl } from '@utils/appConfig';
const typeList_1 = [
  'serviceImg7-1',
  '1_0',
  '1_1',
  '1_2',
  '1_3',
  '1_4',
  '1_5',
  '1_6',
  '1_7',
];
const typeList_2 = ['serviceImg7-1', '2_1', '2_2', '2_3', '2_4', '2_5'];
function Login() {
  const commonStore = useStores('commonStore');
  const zhInsuranceStore = useStores('zhInsuranceStore');
  const history = useHistory();
  const [list, setList] = useState<Array<string>>([]);
  // const [mobile, setMobile] = useState('')
  const [idCard, setIdCard] = useState('');
  const [name, setName] = useState('');
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // 判断缓存中是否有token
    // const token = localStorage.getItem('third_token') || ''
    const user = localStorage.getItem('user') || '{}';
    const { token, hasIdCard } = JSON.parse(user);
    let channelId = getUrlParams('channelId') || '';
    channelId && localStorage.setItem('channelId', channelId);
    getUrlParams('type') === '1' && setList(typeList_1);
    getUrlParams('type') === '2' && setList(typeList_2);
    if (token && hasIdCard) {
      commonStore.setToken(token);
      commonStore.setUserInfo(JSON.parse(user));
      history.replace(`/zh/user?vcPolicyNo=${getUrlParams('vcPolicyNo')}`);
    }
  }, [commonStore, history]);
  // const save = () => {
  //     return
  //     if(mobile.length === 13 ){
  //         let phone = mobile.replace(/\s*/g,'')
  //         let params = {
  //             mobile: phone,
  //             vcPolicyNo: getUrlParams('vcPolicyNo')
  //         }
  //         zhInsuranceStore.login(params).then((res: any) => {
  //             console.log(res)
  //             const {token} = res
  //             commonStore.setToken(token)
  //             commonStore.setUserInfo(res)
  //             localStorage.setItem('user', JSON.stringify(res))
  //             localStorage.setItem('third_token', token)
  //             history.replace(`/zh/user?vcPolicyNo=${getUrlParams('vcPolicyNo')}`)
  //         }).catch((err: any) => {
  //             console.log(err)
  //         })
  //     }
  // }
  const save = () => {
    if (isLoading) {
      return;
    }
    if (idCard.length === 6) {
      let params = {
        idCardEnd: idCard,
        name,
      };

      setIsLoading(true);
      zhInsuranceStore
        .idCardLogin(params)
        .then((res: any) => {
          const { token } = res;
          setIsLoading(false);
          commonStore.setToken(token);
          commonStore.setUserInfo(res);
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('third_token', token);
          localStorage.setItem('idCard', idCard);
          if (res.hasIdCard) {
            history.replace(
              `/zh/user?vcPolicyNo=${getUrlParams('vcPolicyNo')}`
            );
          } else {
            history.replace('/zh/firstLogin');
          }
        })
        .catch((err: any) => {
          setIsLoading(false);
          if (err.code === 50002) {
            setModal(true);
          }
        });
    }
  };
  return (
    <div className="page-login flex">
      {/* <div className="tips flex">
            本服务2021/1/24日生效，届时您登录本页即可预约使用
            </div> */}
      <div className="logo flex">
        <img src={logo1} alt="" className="logo-1" />
        <img src={logo3} alt="" className="logo-3" />
        <img src={logo2} alt="" className="logo-2" />
      </div>
      <span className="title">身份验证</span>
      {/* <InputItem type="phone" className='input' placeholder='输入被保险人手机号' 
           onChange={(val) => {
                setMobile(val)
           }}/> */}
      <InputItem
        type="text"
        className="input noborder"
        placeholder="输入被保险人身份证后六位"
        onChange={(val) => {
          setIdCard(val);
        }}
      />
      {/* <div className={`save flex ${mobile.length !== 13 ? 'disable': 'disable'}`} onClick={()=>{
               save()
           }}>服务暂未生效</div> */}
      <div
        className={`save flex ${idCard.length !== 6 ? 'disable' : ''}`}
        onClick={() => {
          save();
        }}
      >
        确认
      </div>
      <div className="img-list">
        {list.length &&
          list.map((item) => {
            return (
              <img
                src={`${imgUrl}${item}.png`}
                alt=""
                className="img"
                key={item}
              />
            );
          })}
      </div>
      {/* <div className="show flex">
                <div className="show-title">专属健康服务</div>
                <div className="common m-t-101">
                    <img src={common1} alt="" className='common-1'/>
                    <span>家庭健康服务</span>
                </div>
                <div className="common">
                    <img src={common2} alt="" className='common-2'/>
                    <span>少儿口腔齿科服务</span>
                </div>
           </div> */}
      {/* 姓名弹框 */}
      {modal && (
        <div className="modal flex">
          <div className="modal-content">
            <div
              className="close"
              onClick={() => {
                setModal(false);
                setName('');
              }}
            ></div>
            <div className="modal-title">请验证您的姓名</div>
            <InputItem
              type="text"
              className="input-name"
              placeholder="输入被保险人姓名"
              onChange={(val) => {
                setName(val);
              }}
            />
            <div
              className={`save ${name.length <= 0 ? 'disable' : ''}`}
              onClick={() => {
                save();
              }}
            >
              确认
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
