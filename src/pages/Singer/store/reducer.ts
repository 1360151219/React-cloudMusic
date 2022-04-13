import * as actionTypes from "./constants"

import { fromJS } from "immutable"
const defaultState = fromJS({
    songsList: [],
    artist: {},
    loading: true
})
export default function (state = defaultState, action) {
    switch (action.type) {
        case (actionTypes.CHANGE_ARTIST):
            return state.set("artist", action.data)
        case (actionTypes.CHANGE_SONGSLIST):
            return state.set("songsList", action.data)
        case (actionTypes.CHANGE_LOADING):
            return state.set("loading", action.data)
        default:
            return state
    }
}