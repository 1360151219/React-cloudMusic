import { fromJS } from "immutable";
import { getRankListRequest } from "../../../api/request";

// constants
export const CHANGE_RANK_LIST = 'rank/CHANGE_RANK_LIST'
export const CHANGE_LOADING = 'rank/CHANGE_LOADING'

// action
export const changeRankList = (data) => ({
    type: CHANGE_RANK_LIST,
    data: fromJS(data)
})
export const changeLoading = (data) => ({
    type: CHANGE_LOADING,
    data
})
// actionCreator
export const getRankList = () => {
    return dispatch => {
        getRankListRequest().then(res => {
            const data = res.list
            dispatch(changeRankList(data))
            dispatch(changeLoading(false))
        }).catch(err => {
            console.log(err);
        })
    }
}
// reducer
const defaultState = fromJS({
    rankList: [],
    loading: true
})

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_LOADING:
            return state.set('loading', action.data)
        case CHANGE_RANK_LIST:
            return state.set('rankList', action.data)
        default:
            return state
    }
}
