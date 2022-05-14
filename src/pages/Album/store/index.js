import { createSlice } from "@reduxjs/toolkit";

export const albumSlice = createSlice({
    name: "album",
    initialState: {
        currentAlbum: {},
        loading: false
    },
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload
        },
        changeCurrentAlbum: (state, action) => {
            state.currentAlbum = action.payload
        }
    }
})

export const { changeLoading, changeCurrentAlbum } = albumSlice.actions
export default albumSlice.reducer