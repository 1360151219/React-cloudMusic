import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { getName } from "../../utils";
import { MiniPlayerContainer } from "./style";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";
function MiniPlayer(props) {
    const { song, fullScreen, playing, clickPlaying, percent, playTime, duration } = props
    const { toggleFullScreen, togglePlayList } = props
    const miniRef = useRef()
    const showPlayList = (e) => {
        togglePlayList(true)
        e.stopPropagation()
    }
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
                        <img className={`play ${playing ? "" : "pause"}`} src={song.al.picUrl} width="40" height="40" alt="img" />
                    </div>
                </div>
                <div className="text">
                    <h2 className="name">{song.name}</h2>
                    <p className="desc">{getName(song.ar)}</p>
                </div>
                <div className="control stop">
                    <ProgressCircle radius={32} percent={percent}>
                        {playing ?
                            <i className="icon-mini iconfont icon-pause" onClick={e => clickPlaying(e, false)}>&#xe650;</i>
                            :
                            <i className="icon-mini iconfont icon-play" onClick={e => clickPlaying(e, true)}>&#xe61e;</i>
                        }
                    </ProgressCircle>
                </div>

                <div className="control">
                    <i className="iconfont" onClick={(e) => showPlayList(e)}>&#xe640;</i>
                </div>
            </MiniPlayerContainer>
        </CSSTransition>
    )
}

export default React.memo(MiniPlayer)