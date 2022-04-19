import React, { useEffect, useRef, useState } from "react";
import "./Recommend.scss"
import RecommendList from "../../components/RecommendList/RecommendList";
import Scroll from "../../components/Scroll/Scroll";
import Slider from '../../components/Slider/slider';
import * as actions from './store/actionCreator'
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import { forceCheck } from "react-lazyload";
import Loading from "../../components/Loading/Loading";
function pullUp() {
    console.log('up');
}
function pullDown() {
    console.log('down');
}

interface RecommendProps {
    bannerList: any[]
    recommendList: any[]
    getBannerDataDispatch: () => void
    getRecommendListDataDispatch: () => void
}
function Recommend(props) {
    const { bannerList, recommendList, loading, isMiniExist } = props;

    const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
    useEffect(() => {
        if (!bannerList.size)
            getBannerDataDispatch();
        if (recommendList.size == 0)
            getRecommendListDataDispatch();
    }, []);
    const bannerListJS = bannerList ? bannerList.toJS() : []
    const recommendListJS = recommendList ? recommendList.toJS() : []
    return (
        <div className={`Recommend ${isMiniExist ? "mb" : ""}`}>
            <Scroll pullUp={pullUp} pullDown={pullDown} onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS}></Slider>
                    <RecommendList recommendList={recommendListJS}></RecommendList>
                </div>
            </Scroll>
            {loading ? <Loading></Loading> : null}
            <Outlet></Outlet>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        bannerList: state.getIn(['recommend', 'bannerList']),
        recommendList: state.getIn(['recommend', 'recommendList']),
        loading: state.getIn(['recommend', 'loading']),
        isMiniExist: state.getIn(["player", "playList"]).size > 0
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actions.getBannerList());
        },
        getRecommendListDataDispatch() {
            dispatch(actions.getRecommendList());
        },
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))