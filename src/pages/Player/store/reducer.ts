import { fromJS } from "immutable";
import * as actionTypes from "./constants"
import { findSongIndex } from "../../../utils";
export const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}

const defaultState = fromJS({
    fullScreen: false,
    playing: false,
    sequencePlayList: [], // 顺序列表，之后有乱序的
    playList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    showPlayList: false,
    currentSong: {}
})
const handleDelete = (state, songId) => {
    // 通过immer库处理的数据内存地址不一样，相当于深拷贝了、
    const playList = state.get("playList").toJS()
    const sequencePlayList = state.get("sequencePlayList").toJS()
    const songIndex = findSongIndex(playList, songId)
    let currentIndex = state.get("currentIndex")
    playList.splice(songIndex, 1)
    // 如果删除歌曲在当前歌曲之前，currentIndex--
    if (songIndex <= currentIndex) currentIndex--
    const songIndexSe = findSongIndex(sequencePlayList, songId)
    sequencePlayList.splice(songIndexSe, 1)
    return state.merge({
        playList: fromJS(playList),
        sequencePlayList: fromJS(sequencePlayList),
        currentIndex: currentIndex
    })
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case (actionTypes.CHANGE_CURRENT_INDEX): {
            return state.set("currentIndex", action.data);
        }
        case (actionTypes.CHANGE_CURRENT_SONG):
            return state.set("currentSong", action.data);
        case (actionTypes.CHANGE_FULL_SCREEN):
            return state.set("fullScreen", action.data);
        case (actionTypes.CHANGE_MODE):
            return state.set("mode", action.data);
        case (actionTypes.CHANGE_PLAYING):
            return state.set("playing", action.data);
        case (actionTypes.CHANGE_PLAYLIST):
            return state.set("playList", action.data);
        case (actionTypes.CHANGE_SEQUENCE_PLAYLIST):
            return state.set("sequencePlayList", action.data);
        case (actionTypes.CHANGE_SHOW_PLAYLIST):
            return state.set("showPlayList", action.data);
        case (actionTypes.DELETE_SONG):
            return handleDelete(state, action.data)
        default:
            return state
    }
}