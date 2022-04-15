import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { getName } from "../../utils";
import { MiniPlayerContainer } from "./style";
function MiniPlayer(props) {
    const { song, fullScreen } = props
    const { toggleFullScreen } = props
    const miniRef = useRef()
    return (
        <CSSTransition
            classNames="mini"
            in={!fullScreen}
            timeout={400}
            mountOnEnter
        //onEnter={enter}
        //onEntered={afterEnter}
        //onExit={leave}
        //onExited={afterLeave}
        >
            <MiniPlayerContainer ref={miniRef} onClick={() => toggleFullScreen(true)}>
                <div className="icon">
                    <div className="imgWrapper">
                        <img className="play" src={song.al.picUrl} width="40" height="40" alt="img" />
                    </div>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control">
                    <i className="iconfont">&#xe650;</i>
                </div>
                <div className="control">
                    <i className="iconfont">&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    )
}

export default React.memo(MiniPlayer)