import React, { useEffect, useState } from 'react';
import { useStores } from '@utils/useStore';
import { getUrlParams, codeMap, getNavBarTitle, getLevel } from '@utils/filter';
import './index.scss';
import Page from '@components/Page';
const footer = require('@assert/footer.png');
const resultBg = require('@assert/result.png');
// const successBg = require('@assert/success_title_bg.png');
const suggestBg = require('@assert/suggest_bg.png');
const food = require('@assert/food.png');
const bg = require('@assert/claw_bg.png');

const Result = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState(0);
  const [Level, setLevel] = useState('A');
  const commonStore = useStores('commonStore');
  useEffect(() => {
    let code = getUrlParams('code');
    let score = getUrlParams('score');
    let env = getUrlParams('env');
    env && commonStore.setEnv(env);
    let type = codeMap[code];
    setType(type);
    setTitle(getNavBarTitle(type));
    setLevel(getLevel(type, Number(score)));
    document.title = getNavBarTitle(type);
  }, [commonStore]);
  const getText = () => {
    let title = '';
    let subTitle = '';
    let text = '';
    if (type === 2) {
      if (Level === 'A') {
        title = '恭喜您！';
        subTitle = '您的2型糖尿病的致病因素很少！';
        text = '请保持您的健康生活方式！';
      }
      if (Level === 'B') {
        title = '很抱歉！';
        subTitle = '您的糖尿病风险有点高！';
        text =
          '建议您进行体检和注意定期体检，并及时调整生活方式来减少发病风险。';
      }
    }
    if (type === 3) {
      if (Level === 'A') {
        title = '恭喜您！';
        subTitle = '您的心脏很健康';
        text = '定期检测，有助于记录您的心脏情况！';
      }
      if (Level === 'B') {
        title = '很抱歉！';
        subTitle = '您处于危险境地';
        text =
          '虽然现在还不算是心脏病，但是也比较接近了。建议多看看关于心脏病的健康讲座，丰富一下对应的知识并在日常生活中加以注意，离心脏病越来越远！';
      }
      if (Level === 'C') {
        title = '很抱歉！';
        subTitle = '心脏病的症状您基本满足';
        text =
          '建议采用各种调理方案进行心脏病的调理。如有必要，请咨询专业医生。';
      }
    }
    if (type === 4) {
      if (Level === 'A') {
        title = '恭喜您！';
        subTitle = '您没有高血压';
        text = '希望继续保持健康的身体，快乐的心态！';
      }
      if (Level === 'B') {
        title = '很抱歉！';
        subTitle = '您处于危险境地';
        text =
          '虽然现在还不算是高血压，但是也比较接近了。建议多看看关于高血压的健康讲座，丰富一下对应的知识并在日常生活中加以注意，离高血压越来越远！';
      }
      if (Level === 'C') {
        title = '很抱歉！';
        subTitle = '高血压的症状您基本满足';
        text =
          '建议采用各种调理方案进行高血压的调理。如有必要，请咨询专业医生。';
      }
    }
    if (type === 1) {
      if (Level === 'A') {
        title = '';
        subTitle = '';
        text =
          '能达到这个级别的人并不多，说明您非常了解如何健康地安排饮食，有良好的饮食健康意识和生活习惯，有高水准的饮食安全与营养方面的知识。';
      }
      if (Level === 'B') {
        title = '';
        subTitle = '';
        text =
          '您有一定的饮食安全与营养知识，有较好的健康饮食和行为习惯。您的健康饮食和行为习惯还有提升的地方，以便减少一些常见疾病的发生，使生活达到有序化。';
      }
      if (Level === 'C') {
        title = '';
        subTitle = '';
        text =
          '您的饮食和行为习惯很不合理，已经处在亚健康状态。您需要关注饮食健康方面的信息，以获取更多的食品安全与营养方面的知识，提高健康意识，注重改变调整健康饮食方式和生活习惯。';
      }
      if (Level === 'D') {
        title = '';
        subTitle = '';
        text =
          '很遗憾，您的饮食和行为习惯非常不健康，处在比较严重的亚健康状态。某些常见疾病可能已经处于萌芽状态，为了您和您的家人的健康与幸福，请您马上对您的饮食方式和行为习惯做出调整改善现在的饮食和生活状况，提高生活质量。';
      }
    }
    return {
      title,
      subTitle,
      text,
    };
  };
  return (
    <Page title={title}>
      <div className='page-result flex'>
        <div className='content flex'>
          <div className='bg'>
            <div className='result'>
              <div className='top flex'>
                <img src={resultBg} alt='' className='result-bg' />
                <div className={type === 1 ? `text-img${Level}` : 'text'}>
                  <div className='common'>{getText().title}</div>
                  <div className='common'>{getText().subTitle}</div>
                </div>
              </div>
              <div className='bottom'>{getText().text}</div>
            </div>
            <div className='title flex'>评测结果</div>
            <img src={bg} alt='' className='claw' />
          </div>
          {type === 1 && (
            <div className='bg-bottom'>
              <div className='suggest flex'>
                <img src={suggestBg} alt='' className='top-bg' />
                <div className='title'>饮食建议</div>
                <div>
                  中国居民平衡膳食应呈现宝塔形象化的组合，遵循了平衡膳食的原则，体现了一个在营养上比较理想的基本构成。膳食宝塔共分5层，各层面积大小不同，体现了5类食物和食物量的多少。
                </div>
                <img src={food} alt='' className='food' />
                <div className='suggest-item'>
                  <span className='lable'>第一层：</span>
                  <span>
                    谷薯类250～400克（全谷物和杂豆50～150克，薯类50～100克）
                  </span>
                </div>
                <div className='suggest-item'>
                  <span className='lable'>第二层：</span>
                  <span>蔬菜类300～500克，水果类200～350克</span>
                </div>
                <div className='suggest-item'>
                  <span className='lable'>第三层：</span>
                  <span>畜禽肉40～75克，水产品40～75克，蛋类40～50克</span>
                </div>
                <div className='suggest-item'>
                  <span className='lable'>第四层：</span>
                  <span>奶及奶制品300克，大豆及坚果类25～35克</span>
                </div>
                <div className='suggest-item'>
                  <span className='lable'>第五层：</span>
                  <span>
                    盐&lt;6克，油25～30克另外，推荐成人主动身体活动相当于6000步／天；足量饮水，成年人每天7～8杯（1500ml～1700ml）
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <img alt='' src={footer} className='footer' />
      </div>
    </Page>
    // <div className={`page result flex ${toJS(commonStore).env !== 'weapp' ? '' : 'weapp'}`}>
    //     {toJS(commonStore).env !== 'weapp' && <NavBar title={title}/>}
    //     <div className="center">
    //         {/* 膳食 */}
    //         {
    //             type === 1 && (
    //                 <div>
    //                     {Level === 'A' && <div className="common">
    //                         <img src={resultBg} alt="" className='bg'/>
    //                         <img src={successBg} className='success-bg'></img>
    //                         <div className="text">祝贺你！</div>
    //                         <div className="title">A级标准——黄金级</div>
    //                         <div className="text">能达到这个级别的人并不多，说明您非常了解如何健康地安排饮食，有良好的饮食健康意识和生活习惯，有高水准的饮食安全与营养方面的知识！</div>
    //                     </div> }
    //                     {
    //                         Level === 'B' && <div className="common">
    //                             <img src={resultBg} alt="" className='bg'/>
    //                             <div className="title">B级标准——白银级</div>
    //                             <div className="text">您有一定的饮食安全与营养知识，有较好的健康饮食和行为习惯。您的健康饮食和行为习惯还有提升的地方，以便减少一些常见疾病的发生，使生活达到有序化！</div>
    //                         </div>
    //                     }
    //                     {
    //                         Level === 'C' && <div className="common">
    //                             <img src={resultBg} alt="" className='bg'/>
    //                             <div className="title">C级标准——青铜级</div>
    //                             <div className="text">您的饮食和行为习惯很不合理，已经处在亚健康状态，所以您需要关注饮食健康方面的信息，以获取更多的食品安全与营养方面的知识，提高健康意识，注重改变调整健康饮食方式和生活习惯。您的机体可能已经存在一些常见疾病的危险因素，生活质量有所下降！</div>
    //                         </div>
    //                     }
    //                     {
    //                         Level === 'D' && <div className="common">
    //                             <img src={resultBg} alt="" className='bg'/>
    //                             <div className="title">D级标准——生铁级</div>
    //                             <div className="text">很遗憾，您的饮食和行为习惯非常不健康，处在比较严重的亚健康状态，某些常见疾病可能已经处于萌芽状态，为了您和您的家人的健康与幸福，请您马上对您的饮食方式和行为习惯做出调整，密切关注饮食健康和相关咨询，重新规划、改善现在的饮食和生活状况，提高生活质量！</div>
    //                         </div>
    //                     }
    //                     <div className="suggest flex">
    //                         <img src={suggestBg} alt=""  className='top-bg'/>
    //                         <div className="title">饮食建议</div>
    //                         <div>中国居民平衡膳食应呈现宝塔形象化的组合，遵循了平衡膳食的原则，体现了一个在营养上比较理想的基本构成。膳食宝塔共分5层，各层面积大小不同，体现了5类食物和食物量的多少。</div>
    //                         <img src={food} alt="" className='food'/>
    //                         <div className="suggest-item">
    //                             <span className="lable">第一层：</span>
    //                             <span>谷薯类250～400克（全谷物和杂豆50～150克，薯类50～100克）</span>
    //                         </div>
    //                         <div className="suggest-item">
    //                             <span className="lable">第二层：</span>
    //                             <span>蔬菜类300～500克，水果类200～350克</span>
    //                         </div>
    //                         <div className="suggest-item">
    //                             <span className="lable">第三层：</span>
    //                             <span>畜禽肉40～75克，水产品40～75克，蛋类40～50克</span>
    //                         </div>
    //                         <div className="suggest-item">
    //                             <span className="lable">第四层：</span>
    //                             <span>奶及奶制品300克，大豆及坚果类25～35克</span>
    //                         </div>
    //                         <div className="suggest-item">
    //                             <span className="lable">第五层：</span>
    //                             <span>盐&lt;6克，油25～30克另外，推荐成人主动身体活动相当于6000步／天；足量饮水，成年人每天7～8杯（1500ml～1700ml）</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //         }
    //         {/* 糖尿病 */}
    //         {
    //             type === 2 && (
    //                 <div>
    //                     { Level === 'A' && <div className="common">
    //                         <img src={resultBg} alt="" className='bg'/>
    //                         <img src={successBg} className='success-bg'></img>
    //                         <div className="text">恭喜您！</div>
    //                         <div className="title">您的2型糖尿病的致病因素很少！</div>
    //                         <div className="text">请保持您的健康生活方式！</div>
    //                     </div> }
    //                     {
    //                         Level === 'B' && <div className="common">
    //                             <img src={resultBg} alt="" className='bg'/>
    //                             <div className="text">很抱歉！</div>
    //                             <div className="title">您的糖尿病风险有点高，分值越高则代表风险越高！</div>
    //                             <div className="text">建议您进行体检和注意定期体检，并及时调整生活方式来减少发病风险。</div>
    //                         </div>
    //                     }
    //                 </div>
    //             )
    //         }
    //         {/* 心脏病 */}
    //         {
    //             type === 3 && (
    //                 <div>
    //                     {
    //                         Level === 'A' && <div className="common">
    //                             <img src={resultBg} alt="" className='bg'/>
    //                             <img src={successBg} className='success-bg'></img>
    //                             <div className="text">恭喜您！</div>
    //                             <div className="title">您没有心脏病！</div>
    //                             <div className="text">希望继续保持健康的身体，快乐的心态！</div>
    //                         </div>
    //                     }
    //                     {
    //                         Level === 'B' && <div className="common">
    //                             <img src={resultBg} alt="" className='bg'/>
    //                             <div className="text">您处于危险境地！</div>
    //                             <div className="title">虽然现在还不算是心脏病，但是也比较接近了！</div>
    //                             <div className="text">建议多看看关于心脏病的健康讲座，丰富一下对应的知识并在日常生活中加以注意，离心脏病越来越远！</div>
    //                         </div>
    //                     }
    //                     {
    //                         Level === 'C' && <div className="common">
    //                             <img src={resultBg} alt="" className='bg'/>
    //                             <img src={successBg} className='success-bg'></img>
    //                             <div className="text">很抱歉！</div>
    //                             <div className="title">心脏病的症状您基本满足！</div>
    //                             <div className="text">建议采用各种调理方案进行心脏病的调理。如有必要，请咨询专业医生。</div>
    //                         </div>
    //                     }
    //                 </div>
    //             )
    //         }

    //         {/* 高血压 */}
    //         {
    //             type === 4 && (
    //                 <div>
    //                     {Level === 'A' && <div className="common">
    //                         <img src={resultBg} alt="" className='bg'/>
    //                         <img src={successBg} className='success-bg'></img>
    //                         <div className="text">恭喜您！</div>
    //                         <div className="title">您没有高血压！</div>
    //                         <div className="text">希望继续保持健康的身体，快乐的心态！</div>
    //                     </div>}
    //                     {Level === 'B' && <div className="common">
    //                         <img src={resultBg} alt="" className='bg'/>
    //                         <div className="text">您处于危险境地！</div>
    //                         <div className="title">虽然现在还不算是高血压，但是也比较接近了！</div>
    //                         <div className="text">建议多看看关于高血压的健康讲座，丰富一下对应的知识并在日常生活中加以注意，离高血压越来越远！</div>
    //                     </div>}
    //                     {
    //                         Level === 'C' &&  <div className="common">
    //                         <img src={resultBg} alt="" className='bg'/>
    //                         <div className="text">很抱歉！</div>
    //                         <div className="title">高血压的症状您基本满足！</div>
    //                         <div className="text">建议采用各种调理方案进行高血压的调理。如有必要，请咨询专业医生。</div>
    //                     </div>
    //                     }
    //                 </div>
    //             )
    //         }
    //     </div>
    // </div>
  );
};
export default Result;
