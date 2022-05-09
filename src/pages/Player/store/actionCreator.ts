import { fromJS } from "immutable";
import { getSongDetailRequest } from "../../../api/request";
import * as actionTypes from "./constants"
export const changeCurrentIndex = (index: number) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: index
})

export const changeCurrentSong = (data: { [key: string]: any }) => ({
    type: actionTypes.CHANGE_CURRENT_SONG,
    data: fromJS(data)
})
export const changeFullScreen = (data: boolean) => ({
    type: actionTypes.CHANGE_FULL_SCREEN,
    data
})
export const changeMode = (mode: number) => ({
    type: actionTypes.CHANGE_MODE,
    data: mode
})

export const changePlaying = (playing: boolean) => ({
    type: actionTypes.CHANGE_PLAYING,
    data: playing
})

export const changePlayList = (data) => ({
    type: actionTypes.CHANGE_PLAYLIST,
    data: fromJS(data)
})

export const changeSequencePlayList = (data) => ({
    type: actionTypes.CHANGE_SEQUENCE_PLAYLIST,
    data: fromJS(data)
})

export const changeShowPlayList = (isShow: boolean) => ({
    type: actionTypes.CHANGE_SHOW_PLAYLIST,
    data: isShow
})

export const deleteSong = (data) => ({
    type: actionTypes.DELETE_SONG,
    data
})

// 搜索单曲--插入
export const insertSong = (data) => ({
    type: actionTypes.INSERT_SONG,
    data
})

export const getSongDetail = (id) => {
    return dispatch => {
        getSongDetailRequest(id).then(res => {
            let song = res.songs[0];
            dispatch(insertSong(song));
        })
    }
}