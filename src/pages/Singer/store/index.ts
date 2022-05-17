import { createSlice } from '@reduxjs/toolkit';
import { getSingerSongsRequest } from "../../../api/request";
const singerSlice = createSlice({
    name: 'singer',
    initialState: {
        songsList: [],
        artist: {},
        loading: true
    },
    reducers: {
        changeSongsList: (state, action) => {
            state.songsList = action.payload
        },
        changeArtist: (state, action) => {
            state.artist = action.payload
        },
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
    }
})
export const { changeSongsList, changeArtist, changeLoading } = singerSlice.actions
export default singerSlice.reducer
export function getArtist(id: string) {
    return dispatch => {
        dispatch(changeLoading(true))
        getSingerSongsRequest(id).then((res: any) => {
            const artist = res.artist
            const songs = res.hotSongs
            dispatch(changeArtist(artist))
            dispatch(changeSongsList(songs))
            dispatch(changeLoading(false))
        })
    }
}