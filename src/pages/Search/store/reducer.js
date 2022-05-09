import { fromJS } from "immutable";
import * as actionTypes from "./constants"
const defaultState = fromJS({
    hotList: [],
    suggestList: [],
    songList: [],
    loading: false
})


export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_HOT_KEYWORDS:
            return state.set("hotList", action.data)
        case actionTypes.CHANGE_LOADING:
            return state.set("loading", action.data)
        case actionTypes.CHANGE_SONGLIST:
            return state.set("songList", action.data)
        case actionTypes.CHANGE_SUGGEST_LIST:
            return state.set("suggestList", action.data)
        default:
            return state
    }
}