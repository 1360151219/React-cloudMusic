import React, { useEffect, useRef, useState } from "react";
import "./Singers.scss"
import { Outlet, useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll/Scroll";
import HorizenItem from "../../components/Horizen-Item/HorizenItem";
import { categoryTypes, alphaTypes, areaTypes } from '../../api/request'
import Loading from "../../components/Loading/Loading";
import {
    getHotSingerDispatch, categoryDispatch, alphaDispatch, areaDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch
} from "./store/actions";

import { useDispatch, useSelector } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import placeholder from '../../assets/singer.png'

function Singers() {
    const { singerList, pageCount, pullUpLoading, pullDownLoading, loading, category, alpha, area } = useSelector((state) => state.singers)
    const dispatch = useDispatch()

    let navigate = useNavigate()
    const isMiniExist = false
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
        if (singerList.length > 0) return
        getHotSingerDispatch(dispatch)
    }, [])
    // ！！！这里逻辑一定要清晰：每次改变参数的时候，都需要以新的参数状态去判断当前是否是hot
    let scrollRef = useRef()
    const handleCategory = (value: number | string) => {
        categoryDispatch(dispatch, value as number)
        let hot = !alpha && value == -1 && area == -1
        updateDispatch(dispatch, scrollRef, hot)
    }
    const handleAlpha = (value: number | string) => {
        alphaDispatch(dispatch, value)
        let hot = !value && category == -1 && area == -1
        updateDispatch(dispatch, scrollRef, hot)
    }
    const handleArea = (value: number | string) => {
        areaDispatch(dispatch, value as number)
        let hot = !alpha && category == -1 && value == -1
        updateDispatch(dispatch, scrollRef, hot)
    }
    const handlePullUp = () => {
        let hot = !alpha && category == -1 && area == -1
        pullUpRefreshDispatch(dispatch, pageCount, hot)
    }
    const handlePullDown = () => {
        let hot = !alpha && category == -1 && area == -1
        pullDownRefreshDispatch(dispatch, hot)
    }

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
                        {renderSingerList(singerList)}
                    </Scroll>
                </div>
                {loading ? <Loading></Loading> : null}
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default React.memo(Singers)
