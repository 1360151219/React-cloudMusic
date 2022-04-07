import React, { useEffect, useRef, useState } from "react";
import "./Recommend.scss"
import { useNavigate } from "react-router-dom";
import RecommendList from "../../components/RecommendList/RecommendList";
import Scroll from "../../components/Scroll/Scroll";
import Slider from '../../components/slider';
import { getBanner } from "../../api/request";
function pullUp() {
    console.log('up');
}
function pullDown() {
    console.log('down');
}

function Recommend() {
    //mock 数据
    const bannerList = [1, 2, 3, 4].map(item => {
        return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    });
    const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
        return {
            id: 1,
            picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
            playCount: 17171122,
            name: "朴树、许巍、李健、郑钧、老狼、赵雷"
        }
    });
    const scrollRef = useRef()
    return (
        <div className="Recommend">
            <Scroll pullUp={pullUp} pullDown={pullDown} ref={scrollRef}>
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList>
                    <button onClick={() => { scrollRef.current.refresh() }}>refresh</button>
                </div>
            </Scroll>
        </div>
    )
}
export default React.memo(Recommend)