//reducer.js
import { combineReducers } from 'redux-immutable';
import * as actionTypes from './constants'
import { fromJS, set } from 'immutable';

const defaultState = fromJS({
    bannerList: [],
    recommendList: []
})
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data)
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data)
        default:
            return state
    }
}