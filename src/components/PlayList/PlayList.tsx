import React, { useRef, useState } from "react";
import Scroll from "../Scroll/Scroll";
import MusicNote from "../MusicNote/MusicNote";
import Confirm from "../Confirm/Confirm";
import { changePlaying, changeShowPlayList } from "../../pages/Player/store/actionCreator";
import { connect } from "react-redux";
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from "./style";
import { CSSTransition } from "react-transition-group"
import { playMode } from "../../pages/Player/store/reducer";
import { changeCurrentSong, changeCurrentIndex, changePlayList, changeMode, changeSequencePlayList, deleteSong } from "../../pages/Player/store/actionCreator";
import { getName, findSongIndex, shuffle } from "../../utils";
function PlayList(props) {
    const { showPlayList, currentIndex, currentSong, playList, sequencePlayList, mode } = props
    const { togglePlayListDispatch, changeCurrentSongDispatch, changeCurrentIndexDispatch, changePlayListDispatch, changeModeDispatch, changeSequencePlayListDispatch, deleteSongDispatch, deletePlayListDispatch } = props
    const closePlayList = () => {
        togglePlayListDispatch(false)
    }
    // 切换模式
    const changeMode = () => {
        let newMode = (mode + 1) % 3
        if (newMode == 0) {
            // 顺序
            let index = findSongIndex(sequencePlayList, currentSong.id)
            changePlayListDispatch(sequencePlayList)
            changeCurrentIndexDispatch(index)
        } else if (newMode === 1) {
            //单曲循环
            changePlayListDispatch(sequencePlayList);
        } else if (newMode === 2) {
            //随机播放
            let newList = shuffle(sequencePlayList);
            let index = findSongIndex(newList, currentSong.id);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
        }
        changeModeDispatch(newMode)
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
                    onClick={changeMode}
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
    // 是否允许滑动事件生效
    const [canTouch, setCanTouch] = useState(true);
    //touchStart 后记录 y 值
    const [startY, setStartY] = useState(0);
    //touchStart 事件是否已经被触发
    const [initialed, setInitialed] = useState(0);
    // 用户下滑的距离
    const [distance, setDistance] = useState(0);
    // List高度
    const [height, setHeight] = useState(0);
    const listContentRef = useRef();
    const handleScroll = (pos) => {
        // 只有当内容偏移量为 0 的时候才能下滑关闭 PlayList。否则一边内容在移动，一边列表在移动，出现 bug
        let state = pos.y === 0;
        setCanTouch(state);
    }
    const musicNoteRef = useRef();
    const confirmRef = useRef()
    const listWrapperRef = useRef()
    const handleTouchStart = (e) => {
        if (!canTouch || initialed) return
        setStartY(e.touches[0].pageY);// 记录 y 值
        setDistance(0)
        setHeight(listWrapperRef.current.offsetHeight)
        setInitialed(true)
    }
    const handleTouchMove = (e) => {
        if (!canTouch || !initialed) return
        let distance = e.touches[0].pageY - startY
        setDistance(distance)
        // listWrapperRef.current.style["transform"] = `translateY(${distance}px)`
        listWrapperRef.current.style["height"] = height - distance + "px"
    }
    const handleTouchEnd = () => {
        setInitialed(false)
        if (distance > 150) {
            closePlayList()
        } else {
            // listWrapperRef.current.style.transform = `translateY(0)`
            // listWrapperRef.current.style.transition = `all .4s`
            listWrapperRef.current.style["height"] = "auto"
        }
    }
    const handleShowClear = () => {
        confirmRef.current.showConfirm()
    }
    const musicAnimation = (x, y) => {
        musicNoteRef.current.startAnimation({ x, y });
    };
    // 切歌逻辑
    const selectItem = (e, index) => {
        changeCurrentIndexDispatch(index);
        musicAnimation(e.clientX, e.clientY);
    }
    const handleDelete = (e, id: number) => {
        deleteSongDispatch(id)
        e.stopPropagation()
    }
    const deletePlayList = () => {
        deletePlayListDispatch()
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
                <div className="list_wrapper"
                    onClick={(e) => e.stopPropagation()}
                    ref={listWrapperRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <ListHeader>
                        <h1 className="title">
                            {getPlayMode()}
                            <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
                        </h1>
                    </ListHeader>
                    <ScrollWrapper>
                        <Scroll bounceTop={false} ref={listContentRef} onScroll={pos => handleScroll(pos)}>
                            <ListContent>
                                {
                                    playList.map((item, index) => {
                                        return (
                                            <li className="item" key={item.id} onClick={(e) => selectItem(e, index)}>
                                                {getCurrentIcon(item)}
                                                <span className="text">{item.name} - {getName(item.ar)}</span>
                                                <span className="like">
                                                    <i className="iconfont">&#xe601;</i>
                                                </span>
                                                <span className="delete" onClick={(e) => handleDelete(e, item.id)}>
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
                <MusicNote ref={musicNoteRef}></MusicNote>
                <Confirm ref={confirmRef} cancelBtnText="取消" confirmBtnText="确定" text="是否删除全部？" handleConfirm={deletePlayList}></Confirm>
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
    deleteSongDispatch(index: number) {
        dispatch(deleteSong(index))

    },
    deletePlayListDispatch() {
        dispatch(changePlayList([]))
        dispatch(changeSequencePlayList([]))
        dispatch(changeCurrentIndex(-1))
        dispatch(changeShowPlayList(false))
        dispatch(changeCurrentSong({}))
        dispatch(changePlaying(false))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList))