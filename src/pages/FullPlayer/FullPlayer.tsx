import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { getName, getPosAndScale } from "../../utils";
import { FullPlayerContainer, Top, Middle, CDWrapper, Bottom, Operators } from "./style";
import animations from "create-keyframe-animation";
function FullPlayer(props) {
    const { song, fullScreen } = props
    const { toggleFullScreen } = props
    // 帧动画
    const fullPlayerRef = useRef()
    const cdWrapperRef = useRef()
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
    return (
        <CSSTransition
            classNames="fullScreen"
            in={fullScreen}
            timeout={500}
            mountOnEnter
            onEnter={enter}
            onEntered={afterEnter}
        //onExit={leave}
        //onExited={afterLeave}
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
                <Middle ref={cdWrapperRef}>
                    <CDWrapper>
                        <div className="cd">
                            <img
                                className="image play"
                                src={song.al.picUrl + "?param=400x400"}
                                alt=""
                            />
                        </div>
                    </CDWrapper>
                </Middle>
                <Bottom className="bottom">
                    <Operators>
                        <div className="icon i-left" >
                            <i className="iconfont">&#xe625;</i>
                        </div>
                        <div className="icon i-left">
                            <i className="iconfont">&#xe6e1;</i>
                        </div>
                        <div className="icon i-center">
                            <i className="iconfont">&#xe723;</i>
                        </div>
                        <div className="icon i-right">
                            <i className="iconfont">&#xe718;</i>
                        </div>
                        <div className="icon i-right">
                            <i className="iconfont">&#xe640;</i>
                        </div>
                    </Operators>
                </Bottom>
            </FullPlayerContainer>
        </CSSTransition>
    )
}

export default React.memo(FullPlayer)