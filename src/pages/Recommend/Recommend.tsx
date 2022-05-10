import React, { useEffect, useRef, useState } from "react";
import "./Recommend.scss"
import RecommendList from "../../components/RecommendList/RecommendList";
import Scroll from "../../components/Scroll/Scroll";
import Slider from '../../components/Slider/slider';
import * as actions from './store/actions'
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { forceCheck } from "react-lazyload";
import Loading from "../../components/Loading/Loading";
function pullUp() {
    console.log('up');
}
function pullDown() {
    console.log('down');
}

// interface RecommendProps {
//     bannerList: any[]
//     recommendList: any[]
//     getBannerDataDispatch: () => void
//     getRecommendListDataDispatch: () => void
// }
function Recommend() {
    const { bannerList, recommendList, loading } = useSelector((state) => state.recommend);
    // const isMiniExist = useSelector((state) => state.player.playList.size > 0)
    const isMiniExist = false
    const dispatch = useDispatch()
    useEffect(() => {
        if (!bannerList.size)
            dispatch(actions.getBanner())

        // if (recommendList.size == 0)
        // getRecommendListDataDispatch();
    }, []);
    // const recommendListJS = recommendList ? recommendList.toJS() : []
    console.log(bannerList);
    return (
        <div className={`Recommend ${isMiniExist ? "mb" : ""}`}>
            <Scroll pullUp={pullUp} pullDown={pullDown} onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerList}></Slider>
                    <RecommendList recommendList={recommendList}></RecommendList>
                </div>
            </Scroll>
            {loading ? <Loading></Loading> : null}
            <Outlet></Outlet>
        </div>
    )
}


export default React.memo(Recommend)