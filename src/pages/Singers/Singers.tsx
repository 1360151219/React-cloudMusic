import React, { useEffect, useRef, useState } from "react";
import "./Singers.scss"
import { Outlet, useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll/Scroll";
import HorizenItem from "../../components/Horizen-Item/HorizenItem";
import { categoryTypes, alphaTypes, areaTypes } from '../../api/request'
import Loading from "../../components/Loading/Loading";
import {
    getHotSingerList,
    getSingeTypes,
    changeLoading,
    changePageCount,
    changePullDownLoading,
    changeCategory,
    changeAlpha,
    changeArea,
    changePullUpLoading,
    changeNoMore,
    refreshMoreHotSingerList,
    refreshMoreSingerList
} from "./store/actionCreator";
import { connect } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import placeholder from '../../assets/singer.png'

function Singers(props) {
    let { singerList, pageCount, pullUpLoading, pullDownLoading, loading, category, alpha, area, isMiniExist } = props
    let { getHotSingerDispatch, pullUpRefreshDispatch, updateDispatch, pullDownRefreshDispatch, categoryDispatch,
        alphaDispatch, areaDispatch } = props
    let navigate = useNavigate()
    // 注意，这里渲染的时候不能写成组件形式，会出bug！！
    const renderSingerList = (childList) => {
        const enterDetail = (id: number) => {
            navigate(`/singers/${id}`)
        }
        return (
            <div className="singerlist">
                {
                    childList.map((item, index) => {
                        return (
                            <div className="singerlist-item" key={item.accountId + "" + index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <LazyLoad placeholder={<img src={placeholder} width="100%" height="100%" alt="music" />}>
                                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                                    </LazyLoad>

                                </div>
                                <span className="name">{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    };
    useEffect(() => {
        // 修复再次渲染Singers的时候导致数据重新刷新的问题
        if (singerList.size > 0) return
        getHotSingerDispatch()
    }, [])
    // ！！！这里逻辑一定要清晰：每次改变参数的时候，都需要以新的参数状态去判断当前是否是hot
    let scrollRef = useRef()
    const handleCategory = (value: number | string) => {
        categoryDispatch(value as number)
        let hot = !alpha && value == -1 && area == -1
        updateDispatch(scrollRef, hot)
    }
    const handleAlpha = (value: number | string) => {
        alphaDispatch(value)
        let hot = !value && category == -1 && area == -1
        updateDispatch(scrollRef, hot)
    }
    const handleArea = (value: number | string) => {
        areaDispatch(value as number)
        let hot = !alpha && category == -1 && value == -1
        updateDispatch(scrollRef, hot)
    }
    const handlePullUp = () => {
        let hot = !alpha && category == -1 && area == -1
        pullUpRefreshDispatch(pageCount, hot, area, alpha)
    }
    const handlePullDown = () => {
        let hot = !alpha && category == -1 && area == -1
        pullDownRefreshDispatch(hot)
    }
    const singerListJS = singerList ? singerList.toJS() : []
    return (
        <>
            <div className="Singers" >
                <HorizenItem
                    list={categoryTypes}
                    title={"分类（默认热门）："}
                    handleClick={handleCategory}
                    oldVal={category}
                ></HorizenItem>
                <HorizenItem
                    list={areaTypes}
                    title={"地区分类（默认热门）："}
                    handleClick={handleArea}
                    oldVal={area}
                ></HorizenItem>
                <HorizenItem
                    list={alphaTypes}
                    title={"首字母"}
                    handleClick={handleAlpha}
                    oldVal={alpha}
                ></HorizenItem>
                <div className={`singerlist-container ${isMiniExist ? "mb" : ""}`}>
                    <Scroll
                        ref={scrollRef}
                        pullUp={handlePullUp}
                        pullDown={handlePullDown}
                        pullDownLoading={pullDownLoading}
                        pullUpLoading={pullUpLoading}
                        onScroll={forceCheck}
                    >
                        {renderSingerList(singerListJS)}
                    </Scroll>
                </div>
                {loading ? <Loading></Loading> : null}
                <Outlet></Outlet>
            </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    loading: state.getIn(['singers', 'loading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount']),
    category: state.getIn(['singers', 'category']),
    alpha: state.getIn(['singers', 'alpha']),
    area: state.getIn(['singers', 'area']),
    isMiniExist: state.getIn(["player", "playList"]).size > 0

});
const mapDispatchToProps = (dispatch) => {
    return {
        // 首次请求热门歌手（会将singerList先置空）
        getHotSingerDispatch() {
            dispatch(getHotSingerList());
        },
        // 上拉加载新数据
        pullUpRefreshDispatch(count: number, isHot: boolean) {
            dispatch(changePullUpLoading(true))
            dispatch(changePageCount(count + 1))
            if (isHot)
                dispatch(refreshMoreHotSingerList())
            else {
                dispatch(refreshMoreSingerList())
            }
        },
        //顶部下拉刷新
        pullDownRefreshDispatch(isHot: boolean) {
            dispatch(changePullDownLoading(true))
            dispatch(changePageCount(0))
            dispatch(changeNoMore(false))
            if (isHot)
                dispatch(getHotSingerList())
            else dispatch(getSingeTypes())
        }
        ,
        // 重新刷新
        updateDispatch(scrollRef, isHot: boolean) {
            dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
            dispatch(changeLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
            dispatch(changeNoMore(false))
            if (isHot) dispatch(getHotSingerList());
            else
                dispatch(getSingeTypes());
            scrollRef.current.refresh()
        },
        // 数据参数变化
        categoryDispatch(category: number) {
            dispatch(changeCategory(category))
        },
        alphaDispatch(alpha: string) {
            dispatch(changeAlpha(alpha))
        },
        areaDispatch(area: number) {
            dispatch(changeArea(area))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
