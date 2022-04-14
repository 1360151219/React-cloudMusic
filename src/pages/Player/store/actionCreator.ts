import { fromJS } from "immutable";
import * as actionTypes from "./constants"

export const changeCurrentIndex = (index: number) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: index
})

export const changeCurrentSong = (data: { [key: string]: any }) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: fromJS(data)
})
export const changeFullScreen = (data: boolean) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data
})
export const changeMode = (mode: number) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: mode
})

export const changePlaying = (playing: boolean) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: playing
})

export const changePlayList = (data) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: fromJS(data)
})

export const changeSequencePlayList = (data) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: fromJS(data)
})

export const changeShowPlayList = (isShow: boolean) => ({
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data: isShow
})