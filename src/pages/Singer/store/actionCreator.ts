import { getSingerSongsRequest } from "../../../api/request";
import { fromJS } from "immutable";
import * as actionTypes from "./constants"

function changeLoading(loading: boolean) {
    return {
        type: actionTypes.CHANGE_LOADING,
        data: loading
    }
}
function changeArtist(data) {
    return {
        type: actionTypes.CHANGE_ARTIST,
        data: fromJS(data)
    }
}
function changeSongsList(data) {
    return {
        type: actionTypes.CHANGE_SONGSLIST,
        data: fromJS(data)
    }
}
export function getArtist(id: number) {
    return dispatch => {
        changeLoading(true)
        getSingerSongsRequest(id).then(res => {
            const artist = res.artist
            const songs = res.hotSongs
            dispatch(changeArtist(artist))
            dispatch(changeSongsList(songs))
            dispatch(changeLoading(false))
        })
    }
}