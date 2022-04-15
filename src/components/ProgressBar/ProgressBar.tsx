import React, { useEffect, useState, useRef } from "react";
import style from "../../assets/global-style"
import styled from "styled-components"
import { prefixStyle } from "../../utils";
const ProgressBarWrapper = styled.div`
    height: 30px;
    .bar-inner{
        position: relative;
        top: 13px;
        height: 4px;
        background-color: rgba(0,0,0,.3);
        .progress{
            position: absolute;
            height: 100%;
            background-color: ${style["theme-color"]};
        }
        .progress-btn-wrapper{
            position: absolute;
            left: -15px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn{
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 14px;
                height: 14px;
                border: 2px solid ${style["border-color"]};
                border-radius: 50%;
                background: ${style["theme-color"]};
            }
        }
    }

`

function ProgressBar(props) {
    const progressBar = useRef();
    const progress = useRef();
    const progressBtn = useRef();
    const [touch, setTouch] = useState({});
    const progressBtnWidth = 16;
    const handleOffset = (offset) => {
        progress.current.style.width = `${offset}px`
        progressBtn.current.style.transform = `translate3d(${offset}px,0,0)`
    }
    const touchStart = (e) => {
        const startTouch = {}
        startTouch.moving = true // 开始滑动
        startTouch.startX = e.touches[0].pageX
        startTouch.left = progress.current.clientWidth
        setTouch(startTouch)
    }
    const touchMove = (e) => {
        if (!touch.moving) return
        const deltaX = e.touches[0].pageX - touch.startX
        const barWidth = progressBar.current.clientWidth;
        const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
        handleOffset(offsetWidth);
    }
    const touchEnd = (e) => {
        //todo
    }
    return (
        <ProgressBarWrapper>
            <div className="bar-inner" ref={progressBar}>
                <div className="progress" ref={progress}></div>
                <div className="progress-btn-wrapper"
                    ref={progressBtn}
                    onTouchStart={touchStart}
                    onTouchMove={touchMove}
                    onTouchEnd={touchEnd}
                >
                    <div className="progress-btn"></div>
                </div>
            </div>
        </ProgressBarWrapper>
    )
}

export default React.memo(ProgressBar)