import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { getName, getPosAndScale, prefixStyle, formatPlayTime } from "../../utils";
import { FullPlayerContainer, Top, Middle, CDWrapper, Bottom, Operators, ProgressWrapper, LyricContainer, LyricList } from "./style";
import animations from "create-keyframe-animation";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { playMode } from "../Player/store/reducer";
import Scroll from "../../components/Scroll/Scroll";
const transform = prefixStyle("transform")
function FullPlayer(props) {
    const { song, fullScreen, playing, percent, playTime, duration, mode, curLyricParser, curPlayingLyric, curLineIndex } = props
    const { toggleFullScreen, onPercentChange, clickPlaying, handlePrev, handleNext, changeMode, togglePlayList } = props
    // 帧动画
    const fullPlayerRef = useRef()
    const cdWrapperRef = useRef()
    // 歌词
    let [isLyricShow, setIsLyricShow] = useState(false)
    const lyricScrollRef = useRef()
    const lyricLineRefs = useRef([])

    useEffect(() => {
        if (!lyricScrollRef.current) return
        let bScroll = lyricScrollRef.current.getBscroll()

        if (curLineIndex > 5) {
            // 保持当前歌词在第五行
            let lineEl = lyricLineRefs.current[curLineIndex - 5].current
            bScroll.scrollToElement(lineEl, 1000);
        } else {
            // 当前歌词行数 <=5, 直接滚动到最顶端
            bScroll.scrollTo(0, 0, 1000);
        }
    }, [curLineIndex])
    const toggleLyricShow = () => {
        setIsLyricShow(!isLyricShow)
    }
    const enter = () => {
        fullPlayerRef.current.style.display = "block"
        const { x, y, scale } = getPosAndScale()// 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
        let animation = {
            0: {
                transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
            },
            60: {
                transform: `translate3d(0, 0, 0) scale(1.1)`
            },
            100: {
                transform: `translate3d(0, 0, 0) scale(1)`
            }
        }
        animations.registerAnimation({
            name: "move",
            animation,
            presets: {
                duration: 500,
                easing: "linear"
            }
        });
        animations.runAnimation(cdWrapperRef.current, "move");
    }
    const afterEnter = () => {
        animations.unregisterAnimation('move')
        cdWrapperRef.current.style.animation = ""
    }
    const leave = () => {
        if (!cdWrapperRef.current) return
        const { x, y, scale } = getPosAndScale()
        cdWrapperRef.current.style.transition = "all .4s"
        cdWrapperRef.current.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`

    }
    const afterLeave = () => {
        if (!cdWrapperRef.current) return
        cdWrapperRef.current.style.transition = ""
        cdWrapperRef.current.style[transform] = ""
        // 这里如果卸载的话，唱片的角度会变成0
        // fullPlayerRef.current.style.display = "none"
        setIsLyricShow(false)
    }
    const getPlayMode = () => {
        let res = ""
        if (mode === playMode.sequence) {
            res = "&#xe625;";
        } else if (mode === playMode.loop) {
            res = "&#xe653;";
        } else {
            res = "&#xe61b;";
        }
        return (
            <i
                className="iconfont"
                onClick={changeMode}
                dangerouslySetInnerHTML={{
                    __html: res
                }}
            ></i>
        )
    }
    const showPlayList = (e) => {
        togglePlayList(true)
        e.stopPropagation()
    }
    return (
        <CSSTransition
            classNames="fullScreen"
            in={fullScreen}
            timeout={500}
            mountOnEnter
            unmountOnExit
            onEnter={enter}
            onEntered={afterEnter}
            onExit={leave}
            onExited={afterLeave}
        >
            <FullPlayerContainer ref={fullPlayerRef}>
                <div className="background">
                    <img
                        src={song.al.picUrl + "?param=300x300"}
                        width="100%"
                        height="100%"
                        alt="歌曲图片"
                    />
                </div>
                <div className="background layer"></div>
                <Top className="top">
                    <div className="back">
                        <i className="iconfont icon-back" onClick={() => toggleFullScreen(false)}>&#xe662;</i>
                    </div>
                    <h1 className="title">{song.name}</h1>
                    <h1 className="subtitle">{getName(song.ar)}</h1>
                </Top>
                <Middle ref={cdWrapperRef} onClick={toggleLyricShow}>
                    <CSSTransition
                        classNames="fade"
                        in={!isLyricShow}
                        timeout={400}
                    >
                        <CDWrapper>
                            <div className="cd">
                                <img
                                    className={`image play ${playing ? "" : "pause"}`}
                                    src={song.al.picUrl + "?param=400x400"}
                                    alt=""
                                />
                            </div>
                        </CDWrapper>
                    </CSSTransition>
                    <CSSTransition
                        classNames="fade"
                        in={isLyricShow}
                        timeout={400}
                    >
                        <LyricContainer>
                            <Scroll ref={lyricScrollRef}>
                                <LyricList>
                                    {curLyricParser
                                        ? curLyricParser.lines.map((item, index) => {
                                            lyricLineRefs.current[index] = React.createRef()
                                            return (
                                                <p
                                                    className={`text ${curLineIndex == index ? 'active' : ''}`}
                                                    key={index + item}
                                                    ref={lyricLineRefs.current[index]}
                                                >
                                                    {item.text}
                                                </p>
                                            )
                                        })
                                        :
                                        <p className="text pure">纯音乐，请欣赏！</p>
                                    }
                                    歌词列表
                                </LyricList>
                            </Scroll>
                        </LyricContainer>
                    </CSSTransition>
                </Middle>
                <Bottom className="bottom">
                    <ProgressWrapper>
                        <span className="time time-l">{formatPlayTime(playTime)}</span>
                        <div className="progress-bar-wrapper">
                            <ProgressBar
                                percent={percent}
                                percentChange={onPercentChange}
                            ></ProgressBar>
                        </div>
                        <div className="time time-r">{formatPlayTime(duration)}</div>
                    </ProgressWrapper>
                    <Operators>
                        <div className="icon i-left" >
                            {getPlayMode()}
                        </div>
                        <div className="icon i-left" >
                            <i className="iconfont" onClick={handlePrev}>&#xe6e1;</i>
                        </div>
                        <div className="icon i-center">
                            <i
                                className="iconfont"
                                onClick={e => clickPlaying(e, !playing)}
                                dangerouslySetInnerHTML={{
                                    __html: playing ? "&#xe723;" : "&#xe731;"
                                }}
                            ></i>
                        </div>
                        <div className="icon i-right" >
                            <i className="iconfont" onClick={handleNext}>&#xe718;</i>
                        </div>
                        <div className="icon i-right" >
                            <i className="iconfont" onClick={(e) => showPlayList(e)}>&#xe640;</i>
                        </div>
                    </Operators>
                </Bottom>
            </FullPlayerContainer>
        </CSSTransition>
    )
}

export default React.memo(FullPlayer)