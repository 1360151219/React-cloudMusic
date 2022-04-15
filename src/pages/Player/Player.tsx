import React, { useEffect, useState } from "react";
import "./Player.scss"
import { connect } from "react-redux";
import MiniPlayer from "../MiniPlayer/MiniPlayer";
import FullPlayer from "../FullPlayer/FullPlayer";
import {
    changePlaying,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changeMode,
    changeFullScreen
} from "./store/actionCreator";
function Player(props) {
    const { fullScreen } = props
    const { toggleFullScreenDispatch } = props
    const currentSong = {
        al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
        name: "木偶人",
        ar: [{ name: "薛之谦" }]
    }
    return (
        <>
            <div className="Player">
                <MiniPlayer
                    song={currentSong}
                    fullScreen={fullScreen}
                    toggleFullScreen={toggleFullScreenDispatch}
                ></MiniPlayer>
                <FullPlayer
                    song={currentSong}
                    fullScreen={fullScreen}
                    toggleFullScreen={toggleFullScreenDispatch}
                ></FullPlayer>

            </div>
        </>
    )
}
const mapStateToProps = state => ({
    fullScreen: state.getIn(["player", "fullScreen"]),
    playing: state.getIn(["player", "playing"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"]),
    playList: state.getIn(["player", "playList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    currentSong: state.getIn(["player", "currentSong"]),
})
const mapDispatchToProps = dispatch => {
    return {
        togglePlayingDispatch(isplaying: boolean) {
            dispatch(changePlaying(isplaying))
        },
        toggleShowPlayListDispatch(isShow: boolean) {
            dispatch(changeShowPlayList(isShow))
        },
        toggleFullScreenDispatch(isFullScreen: boolean) {
            dispatch(changeFullScreen(isFullScreen))
        },
        changeCurrentIndexDispatch(index: number) {
            dispatch(changeCurrentIndex(index))
        },
        changeCurrentSongDispatch(song: any) {
            dispatch(changeCurrentSong(song))
        },
        changePlayListDispatch(data: any) {
            dispatch(changePlayList(data))
        },
        changeModeDispatch(mode: number) {
            dispatch(changeMode(mode))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))