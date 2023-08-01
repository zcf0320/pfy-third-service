import React from 'react';
import Page from '@components/Page';
import { useHistory } from 'react-router-dom';
import { getUrlParams } from '@utils/filter';
import './index.scss';
const DementiaStart = () => {
    const history = useHistory();
    return (
        <Page title="阿尔兹海默症数字疗法">
            <div className='dementia-page'>
                <div className="dementia-page-content">
                    <div className="dementia-page-content-item">阿尔茨海默病是一种起病隐匿的进行性发展的神经系统退行性疾病。</div>
                    <div className="dementia-page-content-item">临床上以记忆障碍、失语、失用、失认、视空间技能损害、执行功能障碍以及人格和行为改变等全面性痴呆表现为特征，病因迄今未明；</div>
                    <div className="dementia-page-content-item">通过早期预防，可有效减少患病几率；</div>
                    <div className="dementia-page-content-button" onClick={()=>{history.push(`/dementia/EntryInformation?serviceRecordId=${getUrlParams('serviceRecordId')}`);}}>立即开始</div>
                </div>
            </div>
        </Page>
    );
};
export default DementiaStart;