import React, { useEffect, useState, useRef } from "react";
import "./Player.scss"
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
    changeMode as changeModeState,
    changeFullScreen,
    changeSpeed,
    SpeedConfig
} from "./store";
import { getLyricRequest } from "../../api/request";
import { getSong, isEmptyObject, findSongIndex, shuffle } from "../../utils";
import { playMode } from "./store";
import LyricParser from "../../utils/LyricParser";
import { useAppSelector, useAppDispatch } from "../../stores";

function Player() {
    const { fullScreen, playing, currentSong, currentIndex, sequencePlayList, mode, playList, speed } = useAppSelector((state) => state.player)
    const dispatch = useAppDispatch()
    const toggleShowPlayListDispatch = (isShow: boolean) => {
        dispatch(changeShowPlayList(isShow))
    }
    const toggleFullScreenDispatch = (isFullScreen: boolean) => {
        dispatch(changeFullScreen(isFullScreen))
    }
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

    const audioRef = useRef<HTMLAudioElement>(null!)
    const toastRef = useRef<any>(null!)
    const songReady = useRef(true)
    const curLyricParser = useRef<LyricParser | null>(null)
    const curLineIndex = useRef(0)
    // 开始播放、暂停
    const clickPlaying = (e: React.MouseEvent<HTMLElement>, playing: boolean) => {
        e.stopPropagation()
        dispatch(changePlaying(playing))

        if (curLyricParser.current) {
            curLyricParser.current.togglePlay(playTime * 1000)
        }

    }
    // 自动更新记录currentTime
    const updateTime = (e: any) => {
        setPlayTime(e.target.currentTime);// s
    }
    const onPercentChange = (curPercent: number) => {
        const newTime = curPercent * duration
        setPlayTime(newTime)
        audioRef.current.currentTime = newTime
        if (curLyricParser.current) {
            curLyricParser.current.seek(newTime * 1000);
        }
        if (!playing) {
            dispatch(changePlaying(true))
        }
    }
    // 单歌曲循环
    const handleLoop = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        dispatch(changePlaying(true))
    };
    const handlePrev = () => {
        // 歌单中只有一首歌
        if (playList.length == 1) {
            handleLoop()
            return
        }
        const index = currentIndex - 1 < 0 ? playList.length - 1 : currentIndex - 1
        if (!playing) dispatch(changePlaying(true))
        dispatch(changeCurrentIndex(index))
        console.log('prev');
    }
    const handleNext = () => {
        if (playList.length == 1) {
            handleLoop()
            return
        }
        const index = currentIndex + 1 >= playList.length ? 0 : currentIndex + 1
        if (!playing) dispatch(changePlaying(true))
        dispatch(changeCurrentIndex(index))
        console.log('next');
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
            dispatch(changePlayList(sequencePlayList))
            dispatch(changeCurrentIndex(index))
            setModeText("顺序循环")
        } else if (newMode === 1) {
            //单曲循环
            dispatch(changePlayList(sequencePlayList))
            setModeText("单曲循环")
        } else if (newMode === 2) {
            //随机播放
            let newList = shuffle(sequencePlayList);
            let index = findSongIndex(newList, currentSong.id);
            dispatch(changePlayList(newList))
            dispatch(changeCurrentIndex(index))
            setModeText("随机播放")
        }
        dispatch(changeModeState(newMode))
        toastRef.current.show()
    }
    const handleLyric = ({ line, text }: { line: number, text: string }): void => {
        if (!curLyricParser.current) return
        curLineIndex.current = line
        setCurPlayingLyric(text)
    }
    const getLyric = (id: string | number) => {
        let lyric = ""
        if (curLyricParser.current) {
            curLyricParser.current.stop()
        }
        getLyricRequest(id as string).then((res: any) => {
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
        audioRef.current.autoplay = true
        audioRef.current.playbackRate = speed
        getLyric(current.id)
        setTimeout(() => {
            // 防止切歌频繁
            audioRef.current.play().then(() => {
                songReady.current = true
            })
            dispatch(changePlaying(true))
        })
        dispatch(changeCurrentSong(current))
        setPrevSong(current.id)
        setPlayTime(0)
        setDuration(current.dt / 1000 | 0)
        // ...


    }, [currentIndex, playList])
    // 将audio和playing参数绑定
    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause()
    }, [playing])
    const clickSpeed = (key: number) => {
        if (!curLyricParser.current) return
        dispatch(changeSpeed(key))
        audioRef.current.playbackRate = key
        // 同步歌词
        curLyricParser.current.changeSpeed(key)
        curLyricParser.current.seek(playTime * 1000)
    }

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
                        speed={speed}
                        clickSpeed={clickSpeed}
                    ></FullPlayer>
                }
                <PlayList></PlayList>
                <Toast text={modeText} delay={1000} ref={toastRef}></Toast>
            </div>
        </>
    )
}


export default React.memo(Player)