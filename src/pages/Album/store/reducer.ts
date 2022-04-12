import { fromJS } from "immutable";
import * as actionTypes from "./constants"
const defaultState = fromJS({
    currentAlbum: {},
    loading: false
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOADING:
            return state.set('loading', action.data)
        case actionTypes.CHANGE_CURRENT_ALBUM:
            return state.set('currentAlbum', action.data)
        default:
            return state
    }
}

