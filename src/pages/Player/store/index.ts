import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSongDetailRequest } from "../../../api/request";
import { findSongIndex } from "../../../utils";
import { RootState, Dispatch } from "../../../stores"
interface ISong {
    al: any
    alia: any
    ar: any
    cd: string
    copyright: number
    cp: number
    djId: number
    dt: number
    fee: number
    ftype: number
    h: any
    id: number
    l: any
    m: any
    mark: number
    mst: number
    mv: number
    name: string
    no: number
    originCoverType: number
    pop: number
    pst: number
    publishTime: number
    rt: string
    rtype: number
    s_id: number
    single: number
    sq: any
    st: number
    t: number
}
export const playMode = {
    sequence: 0,
    loop: 1,
    random: 2
}
export const SpeedConfig = [
    {
        key: 0.75,
        name: "x0.75"
    },
    {
        key: 1,
        name: "x1"
    },
    {
        key: 1.25,
        name: "x1.25"
    },
    {
        key: 1.5,
        name: "x1.5"
    },
    {
        key: 2,
        name: "x2"
    }
]

const handleDelete = (state: RootState["player"], songId: string) => {
    const playList = state.playList

    const sequencePlayList = state.sequencePlayList
    const songIndex = findSongIndex(playList, songId)
    let currentIndex = state.currentIndex
    playList.splice(songIndex, 1)
    // 如果删除歌曲在当前歌曲之前，currentIndex--
    if (songIndex <= currentIndex) currentIndex--
    const songIndexSe = findSongIndex(sequencePlayList, songId)
    sequencePlayList.splice(songIndexSe, 1)


    state.playList = playList
    state.sequencePlayList = sequencePlayList
    state.currentIndex = currentIndex
}

const handleInsert = (state: RootState["player"], song: ISong) => {
    const playList = state.playList
    const sequencePlayList = state.sequencePlayList
    // 这里直接加一，一方面是为了splice添加,二是当播放列表为0的时候，直接添加一首
    let currentIndex = state.currentIndex + 1
    // 是否存在
    const songIndex = findSongIndex(playList, song.id)
    if (songIndex == currentIndex && currentIndex != -1) return state
    // 插入
    playList.splice(currentIndex, 0, song)
    // 如果已经存在
    if (songIndex > -1) {
        if (currentIndex > songIndex) {
            // 相当于将前面的单曲移到后面
            playList.splice(songIndex, 1)
            currentIndex--
        } else {
            // 直接删除即可，注意此时songIndex变化了
            playList.splice(songIndex + 1, 1)
        }
    }

    let currentIndexSe = findSongIndex(sequencePlayList, playList[currentIndex].id) + 1
    const songIndexSe = findSongIndex(sequencePlayList, song.id)
    sequencePlayList.splice(currentIndexSe, 0, song)
    if (songIndexSe > -1) {
        if (currentIndexSe > songIndexSe) {
            // 相当于将前面的单曲移到后面
            sequencePlayList.splice(songIndexSe, 1)
            currentIndexSe--
        } else {
            // 直接删除即可，注意此时songIndex变化了
            sequencePlayList.splice(songIndexSe + 1, 1)
        }
    }


    state.playList = playList
    state.sequencePlayList = sequencePlayList
    state.currentIndex = currentIndex

}
const playerSlice = createSlice({
    name: "player",
    initialState: {
        fullScreen: false,
        playing: false,
        sequencePlayList: [] as ISong[], // 顺序列表，之后有乱序的
        playList: [] as ISong[],
        mode: playMode.sequence,
        currentIndex: -1,
        showPlayList: false,
        currentSong: {} as ISong,
        speed: 1
    },
    reducers: {
        changeFullScreen: (state, action: PayloadAction<boolean>) => {
            state.fullScreen = action.payload
        },
        changePlaying: (state, action: PayloadAction<boolean>) => {
            state.playing = action.payload
        },
        changeSequencePlayList: (state, action: PayloadAction<ISong[]>) => {
            state.sequencePlayList = action.payload
        },
        changePlayList: (state, action: PayloadAction<ISong[]>) => {
            state.playList = action.payload
        },
        changeMode: (state, action: PayloadAction<number>) => {
            state.mode = action.payload
        },
        changeCurrentIndex: (state, action: PayloadAction<number>) => {
            state.currentIndex = action.payload
        },
        changeShowPlayList: (state, action: PayloadAction<boolean>) => {
            state.showPlayList = action.payload
        },
        changeCurrentSong: (state, action: PayloadAction<ISong>) => {
            state.currentSong = action.payload
        },
        deleteSong: (state, action: PayloadAction<string>) => {
            handleDelete(state, action.payload)
        },
        // 搜索单曲--插入
        insertSong: (state, action: PayloadAction<ISong>) => {
            handleInsert(state, action.payload)
        },
        // 歌曲倍速
        changeSpeed: (state, action: PayloadAction<number>) => {
            state.speed = action.payload
        }
    }
})


export const { changeCurrentIndex, changeCurrentSong, changeFullScreen, changeMode, changePlaying, changePlayList,
    changeSequencePlayList, changeShowPlayList, deleteSong, insertSong, changeSpeed } = playerSlice.actions

export let isMiniExist = (state: RootState) => state.player.playList.length > 0

export default playerSlice.reducer

export const getSongDetail = (id: string) => {
    return (dispatch: Dispatch) => {
        getSongDetailRequest(id).then((res: any) => {
            let song = res.songs[0];
            dispatch(insertSong(song));
        })
    }
}