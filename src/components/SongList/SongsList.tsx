import React, { useEffect, useState } from "react";
import { SongList, SongItem } from "./style";
import { getName } from "../../utils";
import { changePlayList, changeCurrentIndex, changeSequencePlayList } from "../../pages/Player/store/actionCreator";
import { connect } from "react-redux";
const SongsList = React.forwardRef((props, ref) => {
    const { songs, showCollect, collectCount } = props
    const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequecePlayListDispatch } = props;
    // 接受触发动画的函数
    const { musicAnimation } = props;

    const selectItem = (e, index) => {
        changePlayListDispatch(songs);
        changeSequecePlayListDispatch(songs);
        changeCurrentIndexDispatch(index);
        musicAnimation(e.clientX, e.clientY);
    }
    function renderSongItem(list) {
        return (
            <SongItem>
                {
                    list.map((item, index) => {
                        return (
                            <li key={index} onClick={(e) => selectItem(e, index)}>
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
                <span > 收藏 ({count})</span>
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
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
    return {
        changePlayListDispatch(data) {
            dispatch(changePlayList(data));
        },
        changeCurrentIndexDispatch(data) {
            dispatch(changeCurrentIndex(data));
        },
        changeSequecePlayListDispatch(data) {
            dispatch(changeSequencePlayList(data))
        }
    }
};

// 将 ui 组件包装成容器组件
export default connect(null, mapDispatchToProps)(React.memo(SongsList));
