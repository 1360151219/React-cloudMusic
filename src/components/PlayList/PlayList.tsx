import React, { useEffect, useState } from "react";
import Scroll from "../Scroll/Scroll";
import { changeShowPlayList } from "../../pages/Player/store/actionCreator";
import { connect } from "react-redux";
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from "./style";
import { CSSTransition } from "react-transition-group"
import { playMode } from "../../pages/Player/store/reducer";
import { changeCurrentSong, changeCurrentIndex, changePlayList, changeMode, changeSequencePlayList } from "../../pages/Player/store/actionCreator";
import { getName } from "../../utils";
function PlayList(props) {
    const { showPlayList, currentIndex, currentSong, playList, sequencePlayList, mode } = props
    const { togglePlayListDispatch, changeCurrentSongDispatch, changeCurrentIndexDispatch, changePlayListDispatch, changeModeDispatch, changeSequencePlayListDispatch } = props
    const closePlayList = () => {
        togglePlayListDispatch(false)
    }
    const handleShowClear = () => {


    }
    const getPlayMode = () => {
        let res = ""
        let text = ""
        if (mode === playMode.sequence) {
            res = "&#xe625;";
            text = "顺序播放"

        } else if (mode === playMode.loop) {
            res = "&#xe653;";
            text = "单曲循环"
        } else {
            res = "&#xe61b;";
            text = "随机播放"
        }
        return (
            <div
            // onClick={changePlayMode}
            >
                <i
                    className="iconfont"
                    // onClick={changePlayMode}
                    dangerouslySetInnerHTML={{
                        __html: res
                    }}
                ></i>
                <span className="text">{text}</span>
            </div>
        )
    }
    // 获取播放歌曲前的ICON
    const getCurrentIcon = (song) => {
        const current = currentSong.id == song.id
        const className = current ? 'icon-play' : '';
        const content = current ? '&#xe6e3;' : '';
        return (
            <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{ __html: content }}></i>
        )
    }
    return (
        <CSSTransition
            in={showPlayList}
            timeout={300}
            classNames="fade"
            unmountOnExit
            appear
        >
            <PlayListWrapper
                // style={showPlayList ? { display: "block" } : { display: "none" }}
                onClick={closePlayList}
            >
                <div className="list_wrapper">
                    <ListHeader>
                        <h1 className="title">
                            {getPlayMode()}
                            <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
                        </h1>
                    </ListHeader>
                    <ScrollWrapper>
                        <Scroll>
                            <ListContent>
                                {
                                    playList.map((item, index) => {
                                        return (
                                            <li className="item" key={item.id}>
                                                {getCurrentIcon(item)}
                                                <span className="text">{item.name} - {getName(item.ar)}</span>
                                                <span className="like">
                                                    <i className="iconfont">&#xe601;</i>
                                                </span>
                                                <span className="delete">
                                                    <i className="iconfont">&#xe63d;</i>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ListContent>
                        </Scroll>
                    </ScrollWrapper>
                </div>
            </PlayListWrapper>
        </CSSTransition>
    )
}
const mapStateToProps = (state) => ({
    showPlayList: state.getIn(["player", "showPlayList"]),
    currentIndex: state.getIn(['player', 'currentIndex']),
    currentSong: state.getIn(['player', 'currentSong']).toJS(),
    playList: state.getIn(['player', 'playList']).toJS(),// 播放列表
    sequencePlayList: state.getIn(['player', 'sequencePlayList']).toJS(),// 顺序排列时的播放列表
    mode: state.getIn(['player', 'mode'])
})
const mapDispatchToProps = (dispatch) => ({
    togglePlayListDispatch(data: boolean) {
        dispatch(changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index: number) {
        dispatch(changeCurrentIndex(index))
    },
    changePlayListDispatch(data: any) {
        dispatch(changePlayList(data))
    },
    changeModeDispatch(mode: number) {
        dispatch(changeMode(mode))
    },
    changeSequencePlayListDispatch(playList) {
        dispatch(changeSequencePlayList(playList))
    },
    changeCurrentSongDispatch(song: any) {
        dispatch(changeCurrentSong(song))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList))