import React, { useEffect, useState } from "react";
import "./Singers.scss"
import { useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll/Scroll";
import HorizenItem from "../../components/Horizen-Item/HorizenItem";
import { categoryTypes, alphaTypes } from '../../api/request'
import {
    getHotSingerList,
    getSingeTypes,
    changeLoading,
    changePageCount,
    changePullDownLoading,
    changeSingerList,
    changePullUpLoading,
    refreshMoreHotSingerList
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
    let { singerList, pageCount } = props
    let { getHotSingerDispatch, pullUpRefreshDispatch, updateDispatch } = props
    useEffect(() => {
        getHotSingerDispatch()
    }, [])
    let [category, setCategory] = useState('-1')
    let [alpha, setAlpha] = useState('')

    const handleCategory = (value: string) => {
        setCategory(value)
    }
    const handleAlpha = (value: string) => {
        setAlpha(value)
        updateDispatch(category, value)
    }
    const handlePullUp = () => {
        pullUpRefreshDispatch(pageCount)
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
                    list={alphaTypes}
                    title={"首字母"}
                    handleClick={handleAlpha}
                    oldVal={alpha}
                ></HorizenItem>
                <div className="singerlist-container">
                    <Scroll
                        pullUp={handlePullUp}
                    >
                        <SingerList singerList={singerListJS}></SingerList>
                    </Scroll>
                </div>

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
        getHotSingerDispatch() {
            dispatch(getHotSingerList());
        },
        pullUpRefreshDispatch(count) {
            dispatch(changePullUpLoading(true))
            dispatch(changePageCount(count + 1))
            dispatch(refreshMoreHotSingerList())
        },
        updateDispatch(category, alpha) {
            dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
            dispatch(changeLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
            dispatch(getSingeTypes(category, alpha));
        },
        // 滑到最底部刷新部分的处理
        // pullUpRefreshDispatch(category, alpha, hot, count) {
        //     dispatch(changePullUpLoading(true));
        //     dispatch(changePageCount(count + 1));
        //     if (hot) {
        //         dispatch(refreshMoreHotSingerList());
        //     } else {
        //         dispatch(refreshMoreSingerList(category, alpha));
        //     }
        // },
        //顶部下拉刷新
        // pullDownRefreshDispatch(category, alpha) {
        //     dispatch(changePullDownLoading(true));
        //     dispatch(changePageCount(0));//属于重新获取数据
        //     if (category === '' && alpha === '') {
        //         dispatch(getHotSingerList());
        //     } else {
        //         dispatch(getSingerList(category, alpha));
        //     }
        // }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))
