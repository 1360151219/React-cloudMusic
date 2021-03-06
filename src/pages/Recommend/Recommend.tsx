import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../stores";
import "./Recommend.scss"
import RecommendList from "../../components/RecommendList/RecommendList";
import Scroll from "../../components/Scroll/Scroll";
import Slider from '../../components/Slider/slider';
import * as actions from './store/actions'
import { Outlet } from "react-router-dom";
import { forceCheck } from "react-lazyload";
import Loading from "../../components/Loading/Loading";
import { isMiniExist as isMiniExistState } from "../Player/store";

function pullUp() {
    console.log('up');
}
function pullDown() {
    console.log('down');
}
function Recommend() {
    const { bannerList, recommendList, loading } = useAppSelector((state) => state.recommend);
    const isMiniExist = useAppSelector(isMiniExistState)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!bannerList.length)
            dispatch(actions.getBanner())
        if (!recommendList.length)
            dispatch(actions.getRecommendList())
    }, []);
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