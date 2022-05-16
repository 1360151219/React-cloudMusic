import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface IAlbum {
    creator: any;
    adType: number
    backgroundCoverId: number
    backgroundCoverUrl: string
    cloudTrackCount: number
    commentCount: number
    commentThreadId: string
    coverImgId: number
    coverImgUrl: string
    createTime: number
    description: string
    englishTitle: string
    highQuality: false
    historySharedUsers: string
    id: number
    name: string
    newImported: false
    officialPlaylistType: string
    opRecommend: false
    ordered: true
    playCount: number
    privacy: number
    remixVideo: string
    shareCount: number
    sharedUsers: string
    specialType: number
    status: number
    subscribed: string
    subscribedCount: number
    titleImage: number
    titleImageUrl: string
    trackCount: number
    trackNumberUpdateTime: number
    trackUpdateTime: number
    tracks: Array<any>
}
export const albumSlice = createSlice({
    name: "album",
    initialState: {
        currentAlbum: {} as IAlbum,
        loading: false
    },
    reducers: {
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        changeCurrentAlbum: (state, action: PayloadAction<IAlbum>) => {
            state.currentAlbum = action.payload
        }
    }
})

export const { changeLoading, changeCurrentAlbum } = albumSlice.actions
export default albumSlice.reducer