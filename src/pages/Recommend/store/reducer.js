//reducer.js
import * as actionTypes from './constants'
import { fromJS } from 'immutable';

const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    loading: true
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data)
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data)
        case actionTypes.CHANGE_LOADING:
            return state.set('loading', action.data)
        default:
            return state
    }
}