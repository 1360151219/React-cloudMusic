import React, { useEffect, useState, useRef } from "react";
import "./Player.scss"
import { connect } from "react-redux";
import MiniPlayer from "../MiniPlayer/MiniPlayer";
import FullPlayer from "../FullPlayer/FullPlayer";
import Toast from "../../components/Toast/Toast";
import PlayList from "../../components/PlayList/PlayList";
import {
    changePlaying,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changeMode,
    changeFullScreen,
    changeSequencePlayList
} from "./store/actionCreator";
import { getLyricRequest } from "../../api/request";
import { getSong, isEmptyObject, findSongIndex, shuffle } from "../../utils";
import { playMode } from "./store/reducer";
import LyricParser from "../../utils/LyricParser";
function Player(props) {
    const { fullScreen, playing, currentSong, currentIndex, sequencePlayList, mode, playList } = props
    const { toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch,
        changeCurrentSongDispatch, changeModeDispatch, changeSequencePlayListDispatch,
        changePlayListDispatch, toggleShowPlayListDispatch
    } = props

    // 已经播放时间
    let [playTime, setPlayTime] = useState(0)
    //歌曲总时长
    let [duration, setDuration] = useState(0)
    // 记录上一首歌曲id，减少重新播放
    let [prevSong, setPrevSong] = useState(0)
    let [modeText, setModeText] = useState("")
    // 即时歌词
    let [curPlayingLyric, setCurPlayingLyric] = useState("")
    // 歌曲播放进度
    let percent = Number.isNaN(playTime / duration) ? 0 : playTime / duration

    const audioRef = useRef()
    const toastRef = useRef()
    const songReady = useRef(true)
    const curLyricParser = useRef()
    const curLineIndex = useRef(0)
    // 开始播放、暂停
    const clickPlaying = (e, playing) => {
        e.stopPropagation()
        togglePlayingDispatch(playing)

        if (curLyricParser.current) {
            curLyricParser.current.togglePlay(playTime * 1000)
        }

    }
    // 自动更新记录currentTime
    const updateTime = (e) => {
        setPlayTime(e.target.currentTime);// s
    }
    const onPercentChange = (curPercent) => {
        const newTime = curPercent * duration
        setPlayTime(newTime)
        audioRef.current.currentTime = newTime
        if (curLyricParser.current) {
            curLyricParser.current.seek(newTime * 1000);
        }
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
    // 歌曲结束逻辑
    const handleEnd = () => {
        if (mode == playMode.loop) handleLoop()
        else handleNext()
    }
    const handleError = () => {
        songReady.current = true
        console.log("播放错误");
    }
    // 切换播放模式
    const changeMode = () => {
        let newMode = (mode + 1) % 3
        if (newMode == 0) {
            // 顺序
            let index = findSongIndex(sequencePlayList, currentSong.id)
            changePlayListDispatch(sequencePlayList)
            changeCurrentIndexDispatch(index)
            setModeText("顺序循环")
        } else if (newMode === 1) {
            //单曲循环
            changePlayListDispatch(sequencePlayList);
            setModeText("单曲循环")
        } else if (newMode === 2) {
            //随机播放
            let newList = shuffle(sequencePlayList);
            let index = findSongIndex(newList, currentSong.id);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
            setModeText("随机播放")
        }
        changeModeDispatch(newMode)
        toastRef.current.show()
    }
    const handleLyric = ({ line, text }: { line: number, text: string }): void => {
        if (!curLyricParser.current) return
        console.log(line);
        curLineIndex.current = line
        setCurPlayingLyric(text)
    }
    const getLyric = (id: number) => {
        let lyric = ""
        if (curLyricParser.current) {
            curLyricParser.current.stop()
        }
        getLyricRequest(id).then(res => {
            lyric = res.lrc.lyric
            if (!lyric) {
                curLyricParser.current = null
                return
            }
            curLyricParser.current = new LyricParser(lyric, handleLyric)
            curLyricParser.current.play()
            curLineIndex.current = 0
            // curLyricParser.current.seek(0)

        }).catch(err => {
            songReady.current = true;
            audioRef.current.play();
        })
    }
    // 切歌逻辑
    useEffect(() => {
        if (!songReady.current ||
            !playList.length
            || currentIndex == -1
            || !playList[currentIndex]
            || prevSong == playList[currentIndex].id) return
        let current = playList[currentIndex]
        songReady.current = false
        audioRef.current.src = getSong(current.id)
        getLyric(current.id)
        setTimeout(() => {
            // 防止切歌频繁
            audioRef.current.play().then(() => {
                songReady.current = true
            })
            togglePlayingDispatch(true)
        })
        changeCurrentSongDispatch(current)
        setPrevSong(current.id)
        setPlayTime(0)
        setDuration(current.dt / 1000 | 0)
    }, [currentIndex])
    // 将audio和playing参数绑定
    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause()
    }, [playing])


    return (
        <>
            <div className="Player">
                <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd} onError={handleError}></audio>
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
                        togglePlayList={toggleShowPlayListDispatch}
                        curLyricParser={curLyricParser.current}
                        curPlayingLyric={curPlayingLyric}
                        curLineIndex={curLineIndex.current}
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
                        changeMode={changeMode}
                        mode={mode}
                        togglePlayList={toggleShowPlayListDispatch}
                        curLyricParser={curLyricParser.current}
                        curPlayingLyric={curPlayingLyric}
                        curLineIndex={curLineIndex.current}
                    ></FullPlayer>
                }
                <PlayList></PlayList>
                <Toast text={modeText} delay={1000} ref={toastRef}></Toast>
            </div>
        </>
    )
}
const mapStateToProps = state => ({
    fullScreen: state.getIn(["player", "fullScreen"]),
    playing: state.getIn(["player", "playing"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"]).toJS(),
    playList: state.getIn(["player", "playList"]).toJS(),
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
        changeSequencePlayListDispatch(playList) {
            dispatch(changeSequencePlayList(playList))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))