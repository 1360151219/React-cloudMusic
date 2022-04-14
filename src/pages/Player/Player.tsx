import React, { useEffect, useState } from "react";
import "./Player.scss"
import { connect } from "react-redux";
import {
    changePlaying,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changeMode,
    changeFullScreen
} from "./store/actionCreator";
function Player() {
    return (
        <>
            <div className="Player">
                Player
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