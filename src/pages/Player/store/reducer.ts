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

const handleInsert = (state, song) => {
    const playList = state.get("playList").toJS()
    const sequencePlayList = state.get("sequencePlayList").toJS()
    // 这里直接加一，一方面是为了splice添加,二是当播放列表为0的时候，直接添加一首
    let currentIndex = state.get('currentIndex') + 1
    // 是否存在
    const songIndex = findSongIndex(playList, song.id)
    if (songIndex == currentIndex && currentIndex != -1) return state
    // 插入
    playList.splice(currentIndex, 0, song)
    // 如果已经存在
    if (songIndex > -1) {
        if (currentIndex > songIndex) {
            // 相当于将前面的单曲移到后面
            playList.splice(songIndex, 1)
            currentIndex--
        } else {
            // 直接删除即可，注意此时songIndex变化了
            playList.splice(songIndex + 1, 1)
        }
    }

    let currentIndexSe = findSongIndex(sequencePlayList, playList[currentIndex].id) + 1
    const songIndexSe = findSongIndex(sequencePlayList, song.id)
    sequencePlayList.splice(currentIndexSe, 0, song)
    if (songIndexSe > -1) {
        if (currentIndexSe > songIndexSe) {
            // 相当于将前面的单曲移到后面
            sequencePlayList.splice(songIndexSe, 1)
            currentIndexSe--
        } else {
            // 直接删除即可，注意此时songIndex变化了
            sequencePlayList.splice(songIndexSe + 1, 1)
        }
    }
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
        case (actionTypes.INSERT_SONG):
            return handleInsert(state, action.data)
        default:
            return state
    }
}