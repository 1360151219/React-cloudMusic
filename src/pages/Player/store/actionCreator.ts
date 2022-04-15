import { fromJS } from "immutable";
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