import * as actionTypes from "./constants"
import { fromJS } from "immutable"
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from "../../../api/request"

const changeHotKeyWords = (data) => ({
    type: actionTypes.CHANGE_HOT_KEYWORDS,
    data: fromJS(data)
})

const changeSuggestList = (data) => ({
    type: actionTypes.CHANGE_SUGGEST_LIST,
    data: fromJS(data)
})
const changeLoading = (data) => ({
    type: actionTypes.CHANGE_LOADING,
    data
})
const changeSongList = (data) => ({
    type: actionTypes.CHANGE_SONGLIST,
    data: fromJS(data)
})

export const getHotKeyWords = () => {
    return dispatch => {
        getHotKeyWordsRequest().then(res => {
            const list = res.result.hots
            dispatch(changeHotKeyWords(list))
        })
    }
}
export const getSuggestList = (query) => {
    return dispatch => {
        dispatch(changeLoading(true))
        getSuggestListRequest(query).then(data => {
            if (!data) return;
            let res = data.result || [];
            dispatch(changeSuggestList(res));
        })
        getResultSongsListRequest(query).then(data => {
            if (!data) return;
            let res = data.result.songs || [];
            dispatch(changeSongList(res));
            dispatch(changeLoading(false));// 关闭 loading
        })
    }
};