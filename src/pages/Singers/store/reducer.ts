import { fromJS } from "immutable";
import * as actionTypes from './constants'
const defaultState = fromJS({
    singerList: [],
    loading: true,
    pullUpLoading: false,
    pullDownLoading: false,
    pageCount: 0
})

export default (state = defaultState, action: { data: any, type: string }) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOADING:
            return state.set('loading', action.data)
        case actionTypes.CHANGE_SINGER_LIST:
            return state.set('singerList', action.data)
        case actionTypes.CHANGE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', action.data)
        case actionTypes.CHANGE_PULLUP_LOADING:
            return state.set('pullUpLoading', action.data)
        case actionTypes.CHANGE_PAGECOUNT:
            return state.set('pageCount', action.data)
        default:
            return state
    }
}