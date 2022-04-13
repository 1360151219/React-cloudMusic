import React, { useEffect, useState } from "react";
import { SongList, SongItem } from "./style";
import { getName } from "../../utils";
const SongsList = React.forwardRef((props, ref) => {
    const { songs, showCollect, collectCount } = props
    function renderSongItem(list) {
        return (
            <SongItem>
                {
                    list.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="index">{index + 1}</span>
                                <div className="info">
                                    <span>{item.name}</span>
                                    <span>
                                        {getName(item.ar)} - {item.al.name}
                                    </span>
                                </div>
                            </li>
                        )
                    })
                }
            </SongItem>
        )
    }
    function collect(count: number) {
        return (
            <div className="add-list">
                <i className="iconfont">&#xe62d;</i>
                <span > 收藏 (count)</span>
            </div>
        )
    }
    return (
        <SongList>
            <div className="first-line">
                <div className="play-all">
                    <i className="iconfont">&#xe6e3;</i>
                    <span >
                        播放全部
                        <span className="sum">(共 10 首)</span>
                    </span>
                </div>
                {showCollect ? collect(collectCount) : null}
            </div>
            <SongItem>
                {renderSongItem(songs)}
            </SongItem>
        </SongList>
    )
})
export default React.memo(SongsList)
