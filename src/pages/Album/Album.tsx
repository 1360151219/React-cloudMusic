import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Album.scss"
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import Header from "../../components/Header/Header";
import Scroll from "../../components/Scroll/Scroll";
import { TopDesc, Menu, SongList, SongItem } from './style';
import style from '../../assets/global-style'
import { getCount, getName, isEmptyObject } from "../../utils";
import { getAlbumList } from "./store/actions";
import Loading from "../../components/Loading/Loading";
import SongsList from "../../components/SongList/SongsList";
import MusicNote from "../../components/MusicNote/MusicNote";
import { useDispatch, useSelector } from "react-redux";
function renderTopDes(currentAlbum) {
    return (
        <TopDesc background={currentAlbum.coverImgUrl}>
            <div className="background">
                <div className="filter"></div>
            </div>
            <div className="img-wrapper">
                <div className="decorate"></div>
                <img src={currentAlbum.coverImgUrl} alt="" />
                <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{Math.floor(currentAlbum.playCount / 1000) / 10} 万 </span>
                </div>
            </div>
            <div className="desc-wrapper">
                <div className="title">{currentAlbum.name}</div>
                <div className="person">
                    <div className="avatar">
                        <img src={currentAlbum.creator.avatarUrl} alt="" />
                    </div>
                    <div className="name">{currentAlbum.creator.nickname}</div>
                </div>
            </div>
        </TopDesc>
    )
}
function renderMenu() {
    return (
        <Menu>
            <div>
                <i className="iconfont">&#xe6ad;</i>
                评论
            </div>
            <div>
                <i className="iconfont">&#xe86f;</i>
                点赞
            </div>
            <div>
                <i className="iconfont">&#xe62d;</i>
                收藏
            </div>
            <div>
                <i className="iconfont">&#xe606;</i>
                更多
            </div>
        </Menu>
    )
}
function Album() {
    // const { getAlbumListDispatch } = props
    // const { loading, currentAlbum, isMiniExist } = props
    const dispatch = useDispatch()
    const { loading, currentAlbum } = useSelector((state) => state.album)
    // 
    const isMiniExist = false
    let navigate = useNavigate()
    const { id } = useParams()
    let [fly, setFly] = useState(true)
    let [title, setTitle] = useState("歌单")
    let [isMarquee, setIsMarquee] = useState(false)
    const musicNoteRef = useRef();
    const musicAnimation = (x, y) => {
        musicNoteRef.current.startAnimation({ x, y });
    };
    const headerEl = useRef()
    const scrollRef = useRef()
    useEffect(() => {
        dispatch(getAlbumList(id))
    }, [])
    useEffect(() => {
        if (isMiniExist)
            scrollRef.current.refresh()
    }, [isMiniExist, currentAlbum])
    const handleBack = useCallback(() => {
        setFly(false)
    }, [])
    const handleScroll = useCallback((pos: { x: number, y: number }) => {
        let minScrollY = -45
        let percent = Math.abs(pos.y / minScrollY)
        let headerDOM = headerEl.current
        // 开始滑动，且大于最小值
        if (pos.y < minScrollY) {
            headerDOM.style.backgroundColor = style['theme-color']
            headerDOM.style.opacity = Math.min(1, (percent - 1) / 2)
            setTitle(currentAlbum.name)
            setIsMarquee(true)
        } else {
            headerDOM.style.backgroundColor = ''
            headerDOM.style.opacity = 1
            setTitle('歌单')
            setIsMarquee(false)
        }
    }, [currentAlbum])
    return (
        <>
            <CSSTransition
                in={fly}
                timeout={300}
                classNames="fly"
                appear={true}
                unmountOnExit
                onExited={() => { navigate(-1) }}
            >
                <div className={`Album ${isMiniExist ? "mb" : ""}`}>
                    {loading ? <Loading /> : null}
                    <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee} />
                    <div className="album-content">
                        {!isEmptyObject(currentAlbum) ?
                            <Scroll bounceTop={false} onScroll={handleScroll} ref={scrollRef}>
                                <div>
                                    {renderTopDes(currentAlbum)}
                                    {renderMenu()}
                                    <SongsList
                                        songs={currentAlbum.tracks}
                                        showCollect={true}
                                        collectCount={getCount(currentAlbum.subscribedCount)}
                                        musicAnimation={musicAnimation}
                                    ></SongsList>
                                </div>
                            </Scroll>
                            : null}
                    </div>
                    <MusicNote ref={musicNoteRef}></MusicNote>

                </div>
            </CSSTransition>
        </>
    )
}


export default React.memo(Album)