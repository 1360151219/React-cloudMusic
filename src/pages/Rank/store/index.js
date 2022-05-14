import { createSlice } from "@reduxjs/toolkit";
import { getRankListRequest } from "../../../api/request";

const rankSlice = createSlice({
    name: "rank",
    initialState: {
        rankList: [],
        loading: true
    },
    reducers: {
        changeRankList: (state, action) => {
            state.rankList = action.payload
        },
        changeLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { changeRankList, changeLoading } = rankSlice.actions
export const getRankList = () => {
    return dispatch => {
        dispatch(changeLoading(true))
        getRankListRequest().then(res => {
            const data = res.list
            dispatch(changeRankList(data))
            dispatch(changeLoading(false))
        }).catch(err => {
            console.log(err);
        })
    }
}
export default rankSlice.reducer