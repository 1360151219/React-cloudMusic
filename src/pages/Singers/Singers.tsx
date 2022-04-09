import React, { useEffect, useRef, useState } from "react";
import "./Singers.scss"
import { useNavigate } from "react-router-dom";
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
    changeSingerList,
    changePullUpLoading,
    refreshMoreHotSingerList,
    refreshMoreSingerList
} from "./store/actionCreator";
import { connect } from "react-redux";

const SingerList = (props) => {
    const { singerList } = props
    return (
        <div className="singerlist">
            {
                singerList.map((item, index) => {
                    return (
                        <div className="singerlist-item" key={item.accountId + "" + index}>
                            <div className="img_wrapper">
                                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                            </div>
                            <span className="name">{item.name}</span>
                        </div>
                    )
                })
            }
        </div>
    )
};
function Singers(props) {
    let { singerList, pageCount, pullUpLoading } = props
    let { getHotSingerDispatch, pullUpRefreshDispatch, updateDispatch, pullDownRefreshDispatch } = props
    useEffect(() => {
        getHotSingerDispatch()
    }, [])
    // ！！！这里逻辑一定要清晰：每次改变参数的时候，都需要以新的参数状态去判断当前是否是hot
    let [category, setCategory] = useState(-1)
    let [alpha, setAlpha] = useState('')
    let [area, setArea] = useState(-1)
    let scrollRef = useRef()
    const handleCategory = (value: number | string) => {
        setCategory(value as number)
        let hot = !alpha && value == -1 && area == -1
        updateDispatch(scrollRef, value, area, alpha, hot)
    }
    const handleAlpha = (value: number | string) => {
        setAlpha(value as string)
        let hot = value && category == -1 && area == -1
        updateDispatch(scrollRef, category, area, value, hot)
    }
    const handleArea = (value: number | string) => {
        setArea(value as number)
        let hot = !alpha && category == -1 && value == -1
        updateDispatch(scrollRef, category, value, alpha, hot)
    }
    const handlePullUp = () => {
        let hot = !alpha && category == -1 && area == -1
        pullUpRefreshDispatch(pageCount, hot, category, area, alpha)
    }
    const handlePullDown = () => {
        let hot = !alpha && category == -1 && area == -1
        pullDownRefreshDispatch(category, area, alpha, hot)
    }
    const singerListJS = singerList ? singerList.toJS() : []
    return (
        <>
            <div className="Singers">
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
                <div className="singerlist-container">
                    <Scroll
                        ref={scrollRef}
                        pullUp={handlePullUp}
                        pullDown={handlePullDown}
                    >
                        <SingerList singerList={singerListJS}></SingerList>
                    </Scroll>
                </div>

                {pullUpLoading ? <Loading></Loading> : null}
            </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'loading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
    return {
        // 首次请求热门歌手
        getHotSingerDispatch() {
            dispatch(getHotSingerList());
        },
        // 上拉加载新数据
        pullUpRefreshDispatch(count, isHot, type, area, alpha) {
            dispatch(changePullUpLoading(true))
            dispatch(changePageCount(count + 1))
            if (isHot)
                dispatch(refreshMoreHotSingerList())
            else {
                dispatch(refreshMoreSingerList(type, area, alpha))
            }
        },
        //顶部下拉刷新
        pullDownRefreshDispatch(category, area, alpha, isHot) {
            dispatch(changePullDownLoading(true))
            dispatch(changePageCount(0))
            if (isHot)
                dispatch(getHotSingerList())
            else dispatch(getSingeTypes(category, area, alpha))
        }
        ,
        // 重新刷新
        updateDispatch(scrollRef, category, area, alpha, isHot) {
            dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
            dispatch(changeLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
            if (isHot) dispatch(getHotSingerList());
            else
                dispatch(getSingeTypes(category, area, alpha));
            scrollRef.current.refresh()
        },

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
