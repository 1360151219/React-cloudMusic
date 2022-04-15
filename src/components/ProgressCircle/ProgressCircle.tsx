import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../assets/global-style"
import styled from "styled-components"
const CircleWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 30px;
    svg{
        position: absolute;
    }
    circle{
        stroke-width: 8px;
        transform-origin: center;
        &.progress-background {
            transform: scale(0.9);
            stroke: ${style["theme-color-shadow"]};
        }
         &.progress-bar {
            transform: scale(0.9) rotate(-90deg);
            stroke: ${style["theme-color"]};
        }
    }
    .iconfont{
        margin:10px 6.5px 0;

    }
`

function ProgressCircle(props) {
    const { radius, percent } = props
    const dashArray = Math.PI * 100;
    // 没有高亮的部分，剩下高亮的就是进度
    const dashOffset = (1 - percent) * dashArray;
    return (
        <CircleWrapper>
            <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
                <circle className="progress-bar" r="50" cx="50" cy="50" fill="transparent"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset} />
            </svg>
            {props.children}
        </CircleWrapper>
    )
}

export default React.memo(ProgressCircle)