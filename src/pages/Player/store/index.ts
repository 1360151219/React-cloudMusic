import { createSlice } from "@reduxjs/toolkit";
import { getSongDetailRequest } from "../../../api/request";
import { findSongIndex } from "../../../utils";
export const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}

const handleDelete = (state, songId) => {
    const playList = state.playList
    const sequencePlayList = state.sequencePlayList
    const songIndex = findSongIndex(playList, songId)
    let currentIndex = state.currentIndex
    playList.splice(songIndex, 1)
    // 如果删除歌曲在当前歌曲之前，currentIndex--
    if (songIndex <= currentIndex) currentIndex--
    const songIndexSe = findSongIndex(sequencePlayList, songId)
    sequencePlayList.splice(songIndexSe, 1)


    state.playList = playList
    state.sequencePlayList = sequencePlayList
    state.currentIndex = currentIndex
}

const handleInsert = (state, song) => {
    const playList = state.playList
    const sequencePlayList = state.sequencePlayList
    // 这里直接加一，一方面是为了splice添加,二是当播放列表为0的时候，直接添加一首
    let currentIndex = state.currentIndex + 1
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


    state.playList = playList
    state.sequencePlayList = sequencePlayList
    state.currentIndex = currentIndex

}
const playerSlice = createSlice({
    name: "player",
    initialState: {
        fullScreen: false,
        playing: false,
        sequencePlayList: [], // 顺序列表，之后有乱序的
        playList: [],
        mode: playMode.sequence,
        currentIndex: -1,
        showPlayList: false,
        currentSong: {}
    },
    reducers: {
        changeFullScreen: (state, action) => {
            state.fullScreen = action.payload
        },
        changePlaying: (state, action) => {
            state.playing = action.payload
        },
        changeSequencePlayList: (state, action) => {
            state.sequencePlayList = action.payload
        },
        changePlayList: (state, action) => {
            state.playList = action.payload
        },
        changeMode: (state, action) => {
            state.mode = action.payload
        },
        changeCurrentIndex: (state, action) => {
            state.currentIndex = action.payload
        },
        changeShowPlayList: (state, action) => {
            state.showPlayList = action.payload
        },
        changeCurrentSong: (state, action) => {
            state.currentSong = action.payload
        },
        deleteSong: (state, action) => {
            handleDelete(state, action.payload)
        },
        // 搜索单曲--插入
        insertSong: (state, action) => {
            handleInsert(state, action.payload)
        },
    }
})


export const { changeCurrentIndex, changeCurrentSong, changeFullScreen, changeMode, changePlaying, changePlayList,
    changeSequencePlayList, changeShowPlayList, deleteSong, insertSong } = playerSlice.actions

export let isMiniExist = (state) => state.player.playlist.length > 0

export default playerSlice.reducer

export const getSongDetail = (id) => {
    return dispatch => {
        getSongDetailRequest(id).then(res => {
            let song = res.songs[0];
            dispatch(insertSong(song));
        })
    }
}