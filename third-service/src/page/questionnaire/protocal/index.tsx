import React, { useState } from 'react';
import './index.scss';
import NavBar from '@components/NavBar';
import { useStores } from '@utils/useStore';
import { toJS } from 'mobx';
const ProtocalAuth = () => {
  const commonStore = useStores('commonStore');
  const [content, setContent] = useState('');
  commonStore.getProtocol('3').then((res: any) => {
    setContent(res.content);
  });
  return (
    <div
      className={`page page-protpcal-auth  ${
        toJS(commonStore).env !== 'weapp' ? '' : 'weapp'
      }`}
    >
      {toJS(commonStore).env !== 'weapp' && (
        <NavBar title="平辅寅-常年-用户授权使用协议" />
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} className="rich"></div>
      {/* <div className="page-content">
                <div className='p'>寰宇关爱是由平辅寅健康科技（上海）有限公司运营的服务平台（以下简称“本平台”），《寰宇关爱用户授权使用协议》(以下简称“本协议”)是本平台与用户（以下简称“您”）所订立的有效协议。请您先仔细阅读本协议内容，尤其是字体加粗部分。如您对本协议内容或页面提示信息有疑问，请勿进行下一步操作。如您通过页面点击或我们认可的其他方式确认本协议即表示您已同意本协议。此后，用户不得以未阅读本协议内容为由进行任何形式的抗辩。</div>
                <div  className='p'>1、为了便于您使用本平台提供的第三方服务，您同意并授权本平台将您在本平台的注册账户信息及填写的相关资料通过接口或其他方式提供给第三方使用，页面提示上会展示具体授权对象以及授权信息类型，您的信息将通过加密通道传递给第三方。本平台会要求第三方严格遵守相关法律法规与监管要求，依法使用您的信息，并应对您的信息予以保密。您点击同意本协议后即确认授权，授权关系长期有效，直至您主动解除。</div>
                <div  className='p'>2、本平台是为您提供服务的中立机构，本协议也不构成与第三方服务的协议。上述第三方服务由该第三方独立运营并独立承担全部责任，因第三方服务或其使用您的信息而产生的纠纷，或第三方服务违反相关法律法规或协议约定，或您在使用第三方服务过程中遭受损失的，请您和第三方协商解决。</div>
                <div  className='p'>3、本平台可能在必要的时候对本协议进行变更，此种变更将通过包括但不限于公告、平台消息、手机短信或电子邮件予以通知，本平台向您发出通知的时间即为送达到您的时间，该等变更自送达您时开始生效。若您无法同意变更修改后的协议内容，您可以选择停止使用本平台相关的服务或者注销您在本平台的账户，否则将视为您同意更改后的服务条款。</div>
                <div  className='p'>4、本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，本协议的部分条款发生无效的情形时，不受影响的其他条款和协议仍然有效。因本协议产生的争议，应交由本平台运营公司所在地法院诉讼解决。</div>
            </div> */}
    </div>
  );
};
export default ProtocalAuth;
