// 歌词解析器
const STATE_PAUSE = 0
const STATE_PLAYING = 1
const timeExp = /\[(\d{2,}):(\d{2,})\.(\d{2,3})?\]/g

export default class LyricParser {
    lrc: string
    lines: any[]
    handler: (object: { text: string, line: number }) => void
    state: number
    curLineIndex: number
    startStamp: number
    timer: number
    speed: number
    constructor(lrc: string, handler = (object: { line: number, text: string }) => { }, speed = 1) {
        this.lrc = lrc
        this.lines = [] // 解析后数组
        this.handler = handler
        this.state = STATE_PAUSE
        this.curLineIndex = 0
        this.startStamp = 0
        this.timer = 0
        this.speed = speed
        this._initLines()
    }



    _initLines() {
        console.log('init');
        const lines = this.lrc.split('\n')
        for (let line of lines) {
            let res = timeExp.exec(line)
            if (!res) continue
            const text = line.replace(timeExp, "").trim()
            if (text) {
                if (res[3].length == 3) {
                    res[3] = Math.floor((res[3] as unknown as number) / 10).toString()
                }
                this.lines.push({
                    time: Number(res[1]) * 60 * 1000 + Number(res[2]) * 1000 + (Number(res[3]) || 0) * 10,
                    text
                })
            }
        }
        this.lines.sort((a, b) => a.time - b.time)
    }

    _callHandler(i: number) {
        if (i < 0) return
        this.handler({
            text: this.lines[i].text,
            line: i
        })
    }
    _playRest(isSeek?: boolean) {
        let line = this.lines[this.curLineIndex]
        let delay = 0
        if (isSeek) {
            // 手动调进度：找到距离下一个歌词的delay
            delay = line.time - (+new Date() - this.startStamp)
        } else {
            let preTime = this.lines[this.curLineIndex - 1] ? this.lines[this.curLineIndex - 1].time : 0
            delay = line.time - preTime
        }
        this.timer = window.setTimeout(() => {
            // console.log('playRest');
            this._callHandler(this.curLineIndex++)
            if (this.curLineIndex < this.lines.length && this.state == STATE_PLAYING) {
                this._playRest()
            }
            // 倍速关键
        }, delay / this.speed)
    }
    _findcurLineIndex(time: number): number {
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i]
            if (time <= line.time) {
                return i
            }
        }
        return this.lines.length - 1
    }
    /**
 * 
 * @param offset : 时间进度;
 * @param isSeek : 用户是否手动调整过
 */
    play(offset = 0, isSeek = false) {
        // 重新触发定时器
        if (!this.lines.length) return
        this.state = STATE_PLAYING
        this.curLineIndex = this._findcurLineIndex(offset);
        // curLineIndex-1 当前行数
        this._callHandler(this.curLineIndex - 1)
        this.startStamp = +new Date() - offset // 歌曲开始时间戳
        if (this.curLineIndex < this.lines.length) {
            window.clearTimeout(this.timer)
            // 继续播放
            this._playRest(isSeek)
        }
    }
    togglePlay(offset: number) {
        if (this.state === STATE_PLAYING) {
            this.stop()
        } else {
            this.state = STATE_PLAYING
            this.play(offset, true)
        }
    }
    stop() {
        this.state = STATE_PAUSE
        clearTimeout(this.timer)
    }
    seek(offset: number) {
        this.play(offset, true)
    }
    changeSpeed(speed: number) {
        this.speed = speed
    }
}
//let s="[00:01.997]""
