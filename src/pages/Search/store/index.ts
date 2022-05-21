import { createSlice } from "@reduxjs/toolkit";
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from "../../../api/request"

const searchSlice = createSlice({
    name: "search",
    initialState: {
        hotList: [],
        suggestList: [],
        songList: [],
        loading: false
    },
    reducers: {
        changeHotList: (state, action) => {
            state.hotList = action.payload
        },
        changeSuggestList: (state, action) => {
            state.suggestList = action.payload
        },
        changeSongList: (state, action) => {
            state.songList = action.payload
        },
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})

const { changeHotList, changeSuggestList, changeSongList, changeLoading } = searchSlice.actions
export default searchSlice.reducer

export const getHotKeyWords = () => {
    return dispatch => {
        getHotKeyWordsRequest().then((res: any) => {
            const list = res.result.hots
            dispatch(changeHotList(list))
        })
    }
}
export const getSuggestList = (query: string) => {
    return dispatch => {
        dispatch(changeLoading(true))
        getSuggestListRequest(query).then((data: any) => {
            if (!data) return;
            let res = data.result || [];
            dispatch(changeSuggestList(res));
        })
        getResultSongsListRequest(query).then((data: any) => {
            if (!data) return;
            let res = data.result.songs || [];
            dispatch(changeSongList(res));
            dispatch(changeLoading(false));// 关闭 loading
        })
    }
};