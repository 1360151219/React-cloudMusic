import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';

import './swiper.scss'
interface img {
    imageUrl: string
}
interface Props {
    bannerList: Array<img>
}
// Import Swiper styles
function Slider(props: Props): JSX.Element {
    let bannerList = props.bannerList
    return (
        <div className="swiper-container-outer">
            <div className="before"></div>
            <div className="swiper-container">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    autoplay={{ delay: 1000000 }}
                >
                    {
                        bannerList.map((slide, index) => {
                            return (
                                <SwiperSlide key={index}><img src={slide.imageUrl} alt="推荐" width="110%" /></SwiperSlide>
                            )
                        })
                    }
                </Swiper >
            </div>
        </div>


    )
}
export default React.memo(Slider)