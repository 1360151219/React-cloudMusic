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
    //mock 数据
    // const bannerList = [1, 2, 3, 4].map(item => {
    //     return { imageUrl: "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg" }
    // });
    // const recommendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(item => {
    //     return {
    //         id: 1,
    //         picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
    //         playCount: 17171122,
    //         name: "朴树、许巍、李健、郑钧、老狼、赵雷"
    //     }
    // });
    const { bannerList, recommendList, loading } = props;

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
        <div className="Recommend">
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
        loading: state.getIn(['recommend', 'loading'])
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