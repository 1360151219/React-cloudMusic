import { createSlice } from "@reduxjs/toolkit"

export const singersSlice = createSlice({
    name: "singers",
    initialState: {
        singerList: [],
        loading: true,
        pullUpLoading: false,
        pullDownLoading: false,
        pageCount: 0,
        nomore: false,
        category: -1,
        area: -1,
        alpha: ''
    },
    reducers: {
        changeSingerList: (state, action) => {
            state.singerList = action.payload
        },
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
        changePullUpLoading: (state, action) => {
            state.pullUpLoading = action.payload
        },
        changePullDownLoading: (state, action) => {
            state.pullDownLoading = action.payload
        },
        changePageCount: (state, action) => {
            state.pageCount = action.payload
        },
        changeNoMore: (state, action) => {
            state.nomore = action.payload
        },
        changeCategory: (state, action) => {
            state.category = action.payload
        },
        changeArea: (state, action) => {
            state.area = action.payload
        },
        changeAlpha: (state, action) => {
            state.alpha = action.payload
        },
    }
})

export const { changeSingerList, changeLoading, changePullUpLoading, changePullDownLoading, changePageCount, changeNoMore
    , changeCategory, changeArea, changeAlpha } = singersSlice.actions

export default singersSlice.reducer