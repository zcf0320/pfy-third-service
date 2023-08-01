import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.scss';
interface IProps {
  imgList: Array<String>;
  close: () => void;
}
function Predivimg(props: IProps) {
  const { imgList } = props;
  return (
    <div className='component-preview'>
      <div className='img-list'>
        <Swiper
          className='swiper-content'
          // indicatorDots={true}
          // circular
          // interval={5000}
        >
          {imgList &&
            imgList.length &&
            imgList.map((item: any) => {
              return (
                <SwiperSlide className='swiper-item' key={item}>
                  <img alt='' className='img' src={item}></img>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <div
        className='close'
        onClick={() => {
          props.close();
        }}></div>
    </div>
  );
}
export default Predivimg;
