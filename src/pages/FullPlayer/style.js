import style from "../../assets/global-style"
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
`

export const FullPlayerContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: ${style["background-color"]};
    .background{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .6;
        filter: blur(20px);
        &.layer{
            opacity: .3;
            filter: none;
            background-color: ${style["font-color-desc"]};
        }
    }
`

export const Top = styled.div`
    position: relative;
    margin-bottom: 25px;
    .back{
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50px;
        .iconfont{
            display: block;
            padding: 9px;
            font-size: 24px;
            color: ${style["font-color-desc"]};
            font-weight: bold;
            transform: rotate(90deg);
        }
    }
    .title{
        text-align: center;
        margin: auto;
        line-height: 40px;
        font-size: ${style["font-size-m"]};
        color:${style["font-color-desc"]};
        ${style.noWrap()}
    }
    .subtitle{
        line-height: 20px;
        text-align: center;
        font-size: ${style["font-size-m"]};
        color:${style["font-color-desc-v2"]};
        ${style.noWrap()}
    }
`

export const Middle = styled.div`
    position:fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0;
    overflow: hidden;
`

export const CDWrapper = styled.div`
    position: absolute;
    margin: auto;
    top: 10%;
    left: 0;
    right: 0;
    width: 80%;
    box-sizing: border-box;
    height: 80vw;
    .cd{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        .image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid rgba(255, 255, 255, 0.1) ;
        }
        .play{
            animation:${rotate} 20s infinite linear;
            &.pause{
                animation-play-state: paused;
            }
        }
    }
`