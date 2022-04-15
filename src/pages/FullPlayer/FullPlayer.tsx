import React, { useEffect, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { getName } from "../../utils";
import { FullPlayerContainer, Top, Middle, CDWrapper, Bottom, Operators } from "./style";
function FullPlayer(props) {
    const { song, fullScreen } = props
    const { toggleFullScreen } = props
    return (
        <CSSTransition
            classNames="fullScreen"
            in={fullScreen}
            timeout={400}
            mountOnEnter
        //onEnter={enter}
        //onEntered={afterEnter}
        //onExit={leave}
        //onExited={afterLeave}
        >
            <FullPlayerContainer>
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
                <Middle>
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