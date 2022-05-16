import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRankListRequest } from "../../../api/request";
export interface IRankItem {
    ToplistType: string
    adType: number
    anonimous: boolean
    backgroundCoverId: number
    backgroundCoverUrl: string
    cloudTrackCount: number
    commentThreadId: string
    coverImgId: number
    coverImgId_str: string
    coverImgUrl: string
    createTime: number
    description: string
    englishTitle: string
    id: number
    name: string
    newImported: boolean
    opRecommend: boolean
    ordered: boolean
    playCount: number
    privacy: number
    recommendInfo: boolean
    specialType: number
    status: number
    subscribedCount: number
    titleImage: number
    totalDuration: number
    trackCount: number
    trackNumberUpdateTime: number
    trackUpdateTime: number
    tracks: any
    updateFrequency: string
    updateTime: number
    userId: number
}
const rankSlice = createSlice({
    name: "rank",
    initialState: {
        rankList: [] as IRankItem[],
        loading: true
    },
    reducers: {
        changeRankList: (state, action: PayloadAction<IRankItem[]>) => {
            state.rankList = action.payload
        },
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { changeRankList, changeLoading } = rankSlice.actions
export const getRankList = () => {
    return dispatch => {
        dispatch(changeLoading(true))
        getRankListRequest().then((res: any) => {
            const data = res.list
            dispatch(changeRankList(data))
            dispatch(changeLoading(false))
        }).catch(err => {
            console.log(err);
        })
    }
}
export default rankSlice.reducer