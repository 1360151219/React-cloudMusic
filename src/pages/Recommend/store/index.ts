import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface bannerItem {
    imageUrl: string
}
interface recommendItem {
    id: string,
    picUrl: string,
    playCount: number,
    name: string
}
export const recommendSlice = createSlice({
    name: 'recommend',
    initialState: {
        bannerList: [{ imageUrl: "" }],
        recommendList: [{ id: "", picUrl: "", playCount: 0, name: "" }],
        loading: true
    },
    reducers: {
        changeBannerList: (state, action: PayloadAction<bannerItem[]>) => {
            state.bannerList = action.payload
        },
        changeRecommendList: (state, action: PayloadAction<recommendItem[]>) => {
            state.recommendList = action.payload
        },
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    }
})

export const { changeBannerList, changeRecommendList, changeLoading } = recommendSlice.actions

export default recommendSlice.reducer
