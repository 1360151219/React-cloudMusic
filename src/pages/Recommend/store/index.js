import { createSlice } from "@reduxjs/toolkit";
export const recommendSlice = createSlice({
    name: 'recommend',
    initialState: {
        bannerList: [],
        recommendList: [],
        loading: true
    },
    reducers: {
        changeBannerList: (state, action) => {
            state.bannerList = action.payload
        },
        changeRecommendList: (state, action) => {
            state.recommendList = action.payload
        },
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})

export const { changeBannerList, changeRecommendList, changeLoading } = recommendSlice.actions



export default recommendSlice.reducer