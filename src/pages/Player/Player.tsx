import React, { useEffect, useState, useRef } from "react";
import "./Player.scss"
import { connect } from "react-redux";
import MiniPlayer from "../MiniPlayer/MiniPlayer";
import FullPlayer from "../FullPlayer/FullPlayer";
import {
    changePlaying,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changeMode,
    changeFullScreen
} from "./store/actionCreator";
import { getSong, isEmptyObject } from "../../utils";
function Player(props) {
    const { fullScreen, playing, currentSong, currentIndex } = props
    const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentSongDispatch } = props
    // 已经播放时间
    let [playTime, setPlayTime] = useState(0)
    //歌曲总时长
    let [duration, setDuration] = useState(0)
    // 歌曲播放进度
    let percent = Number.isNaN(playTime / duration) ? 0 : playTime / duration

    const audioRef = useRef()
    //mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
    const playList = [
        {
            ftype: 0,
            djId: 0,
            a: null,
            cd: '01',
            crbt: null,
            no: 1,
            st: 0,
            rt: '',
            cf: '',
            alia: [
                '手游《梦幻花园》苏州园林版推广曲'
            ],
            rtUrls: [],
            fee: 0,
            s_id: 0,
            copyright: 0,
            h: {
                br: 320000,
                fid: 0,
                size: 9400365,
                vd: -45814
            },
            mv: 0,
            al: {
                id: 84991301,
                name: '拾梦纪',
                picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
                tns: [],
                pic_str: '109951164627180052',
                pic: 109951164627180050
            },
            name: '拾梦纪',
            l: {
                br: 128000,
                fid: 0,
                size: 3760173,
                vd: -41672
            },
            rtype: 0,
            m: {
                br: 192000,
                fid: 0,
                size: 5640237,
                vd: -43277
            },
            cp: 1416668,
            mark: 0,
            rtUrl: null,
            mst: 9,
            dt: 234947,
            ar: [
                {
                    id: 12084589,
                    name: '妖扬',
                    tns: [],
                    alias: []
                },
                {
                    id: 12578371,
                    name: '金天',
                    tns: [],
                    alias: []
                }
            ],
            pop: 5,
            pst: 0,
            t: 0,
            v: 3,
            id: 1416767458,
            publishTime: 0,
            rurl: null
        },
        {
            ftype: 0,
            djId: 0,
            a: null,
            cd: '01',
            crbt: null,
            no: 1,
            st: 0,
            rt: '',
            cf: '',
            alia: [
                '手游《梦幻花园》苏州园林版推广曲'
            ],
            rtUrls: [],
            fee: 0,
            s_id: 0,
            copyright: 0,
            h: {
                br: 320000,
                fid: 0,
                size: 9400365,
                vd: -45814
            },
            mv: 0,
            al: {
                id: 84991301,
                name: '拾梦纪',
                picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
                tns: [],
                pic_str: '109951164627180052',
                pic: 109951164627180050
            },
            name: '拾梦纪',
            l: {
                br: 128000,
                fid: 0,
                size: 3760173,
                vd: -41672
            },
            rtype: 0,
            m: {
                br: 192000,
                fid: 0,
                size: 5640237,
                vd: -43277
            },
            cp: 1416668,
            mark: 0,
            rtUrl: null,
            mst: 9,
            dt: 234947,
            ar: [
                {
                    id: 12084589,
                    name: '妖扬',
                    tns: [],
                    alias: []
                },
                {
                    id: 12578371,
                    name: '金天',
                    tns: [],
                    alias: []
                }
            ],
            pop: 5,
            pst: 0,
            t: 0,
            v: 3,
            id: 1416767000,
            publishTime: 0,
            rurl: null
        }
    ];
    useEffect(() => {
        changeCurrentIndexDispatch(0)
    }, [])
    // 切歌逻辑
    useEffect(() => {
        if (!playList.length || currentIndex == -1 || !playList[currentIndex]) return
        console.log("change");
        let current = playList[currentIndex]
        audioRef.current.src = getSong(current.id)
        setTimeout(() => {
            audioRef.current.play()
            togglePlayingDispatch(true)
        })
        changeCurrentSongDispatch(current)
        setPlayTime(0)
        setDuration(current.dt / 1000 | 0)
    }, [currentIndex])
    // 将audio和playing参数绑定
    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause()
    }, [playing])
    const clickPlaying = (e, playing) => {
        e.stopPropagation()
        togglePlayingDispatch(playing)
    }
    const updateTime = (e) => {
        setPlayTime(e.target.currentTime);
    }
    const onPercentChange = (curPercent) => {
        const newTime = curPercent * duration
        setPlayTime(newTime)
        audioRef.current.currentTime = newTime
        if (!playing) {
            togglePlayingDispatch(true)
        }
    }
    // 单歌曲循环
    const handleLoop = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        togglePlayingDispatch(true)
    };
    const handlePrev = () => {
        // 歌单中只有一首歌
        if (playList.length == 1) {
            handleLoop()
            return
        }
        const index = currentIndex - 1 < 0 ? playList.length - 1 : currentIndex - 1
        if (!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }
    const handleNext = () => {
        if (playList.length == 1) {
            handleLoop()
            return
        }
        const index = currentIndex + 1 >= playList.length ? 0 : currentIndex + 1
        if (!playing) togglePlayingDispatch(true)
        changeCurrentIndexDispatch(index)
    }
    return (
        <>
            <div className="Player">
                <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
                {isEmptyObject(currentSong) ? null :
                    <MiniPlayer
                        song={currentSong}
                        fullScreen={fullScreen}
                        toggleFullScreen={toggleFullScreenDispatch}
                        playing={playing}
                        clickPlaying={clickPlaying}
                        duration={duration}
                        playTime={playTime}
                        percent={percent}
                    ></MiniPlayer>
                }
                {isEmptyObject(currentSong) ? null :
                    <FullPlayer
                        song={currentSong}
                        fullScreen={fullScreen}
                        toggleFullScreen={toggleFullScreenDispatch}
                        playing={playing}
                        clickPlaying={clickPlaying}
                        duration={duration}
                        playTime={playTime}
                        percent={percent}
                        onPercentChange={onPercentChange}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                    ></FullPlayer>
                }
            </div>
        </>
    )
}
const mapStateToProps = state => ({
    fullScreen: state.getIn(["player", "fullScreen"]),
    playing: state.getIn(["player", "playing"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"]),
    playList: state.getIn(["player", "playList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    currentSong: state.getIn(["player", "currentSong"]).toJS(),
})
const mapDispatchToProps = dispatch => {
    return {
        togglePlayingDispatch(isplaying: boolean) {
            dispatch(changePlaying(isplaying))
        },
        toggleShowPlayListDispatch(isShow: boolean) {
            dispatch(changeShowPlayList(isShow))
        },
        toggleFullScreenDispatch(isFullScreen: boolean) {
            dispatch(changeFullScreen(isFullScreen))
        },
        changeCurrentIndexDispatch(index: number) {
            dispatch(changeCurrentIndex(index))
        },
        changeCurrentSongDispatch(song: any) {
            dispatch(changeCurrentSong(song))
        },
        changePlayListDispatch(data: any) {
            dispatch(changePlayList(data))
        },
        changeModeDispatch(mode: number) {
            dispatch(changeMode(mode))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))