/* eslint-disable no-undef */
import Page from '@components/Page';
import React, { useState, useEffect } from 'react';
import { getUrlParams } from '@utils/filter';
import './index.scss';
export default function DecompressionVideo() {
  const [video, setVideo] = useState({
      title: '',
      url: '',
      subtitle: ''
  });
  useEffect(() => {
      let type = getUrlParams('type') || '';
    if(type === '1'){
        setVideo({
            title: '手指操',
            subtitle: '每天可以根据自己的情况，把手指操全套或者部分小节练习一下，不但能预防老年痴呆，对于儿童和青年人来说，也能有效地开发大脑！',
            url: 'https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/%E6%89%8B%E6%8C%87%E6%93%8D%E9%94%BB%E7%82%BC.mp4'
        });
    }else if(type === '2'){
        setVideo({
            title: '踮脚训练',
            subtitle: '大脑能够控制远端的脚和腿肚，“踮脚”除了有锻炼小腿肌肉、促进下肢血管流动的积极作用外，还能说明神经没坏、脑子没呆，并且能够反馈调节大脑功能。“踮脚”虽简单，作用却很大，不仅能防止痴呆，还能预防中风、降低餐后血糖水平！',
            url: 'https://user-center-images-1301127519.cos.ap-shanghai.myqcloud.com/%E8%B8%AE%E8%84%9A%E8%AE%AD%E7%BB%83.mp4'
        });
    }
  }, []);
  return (
    <Page title={video.title}>
      <div className='decompression-video'>
        <video
          className='video' // 控制栏样式 必需
          controls
          autoPlay
          loop
          id='video'
        >
          <source src={video.url} />
        </video>
        <div>
          <div className='decompression-video-title'>{video.title}</div>
          <div className='decompression-video-subtitle'>
            {video.subtitle}
          </div>
        </div>
      </div>
    </Page>
  );
}
