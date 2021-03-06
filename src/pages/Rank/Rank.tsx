import React, { useEffect, useRef, useState } from "react";
import "./Rank.scss"
import { getRankList, IRankItem } from "./store";
import { findGlobalIndex } from "../../utils";
import Scroll from "../../components/Scroll/Scroll";
import { useNavigate, Outlet } from "react-router-dom";
// 渲染榜单
import { isMiniExist as isMiniExistState } from "../Player/store";
import { useAppDispatch, useAppSelector } from "../../stores";

function Rank() {
    const dispatch = useAppDispatch()
    const { rankList } = useAppSelector((state) => state.rank)

    const isMiniExist = useAppSelector(isMiniExistState)
    let navigate = useNavigate()
    let scrollRef = useRef<any>()
    useEffect(() => {
        scrollRef.current.refresh()
    }, [isMiniExist])
    function renderRankList(list: IRankItem[], isGlobal = false) {
        const enterDetail = (detail: IRankItem) => {
            navigate(`/rank/${detail.id}`)
        }
        return (
            <div className={isGlobal ? "rank-list-flex" : 'rank-list'}>
                {
                    list.map((item, index) => {
                        return (
                            <div key={item.createTime} className={isGlobal ? "rank-list-item" : 'rank-list-item-flex'} onClick={() => enterDetail(item)}>
                                <div className="img-wrapper">
                                    <img src={item.coverImgUrl} width="100px" height='100px' />
                                    <div className="decorate"></div>
                                    <span className="update_frequency">{item.updateFrequency}</span>
                                </div>
                                {renderSongList(item.tracks)}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    function renderSongList(list: any[]) {
        return list.length ? (
            <ul className="song-wrap">
                {list.map((item, index) => {
                    return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
                })}
            </ul>
        ) : null
    }

    useEffect(() => {
        dispatch(getRankList())
    }, [])
    //排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。
    //官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没有。
    //但是后端数据并没有将这两者分开，因此我们需要做一下数据的处理。
    let globalStartIndex = findGlobalIndex(rankList)
    let officialList = rankList.slice(0, globalStartIndex)
    let globalList = rankList.slice(globalStartIndex)
    return (
        <>
            <div className={`Rank ${isMiniExist ? "mb" : ""}`}>
                <Scroll ref={scrollRef}>
                    <div>
                        <h1 className="offical">官方榜</h1>
                        {renderRankList(officialList)}
                        <h1 className="global">全球榜</h1>
                        {renderRankList(globalList, true)}
                    </div>
                </Scroll>
                <Outlet></Outlet>

            </div>
        </>
    )
}

export default React.memo(Rank)