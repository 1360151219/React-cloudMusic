import style from "../../assets/global-style"
import styled, { keyframes } from "styled-components"
import disc from "../../assets/disc.png"
import needle from "../../assets/needle.png"
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
     &.fullScreen-enter {
         opacity: 0;
        .top{
            transform: translateY(-100px);
        }
        .bottom{
            transform: translateY(100px);
        }
    }
    &.fullScreen-enter-active{
        .top,
        .bottom {
            transform: translate3d(0, 0, 0);
            transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        }
        opacity: 1;
        transition: all 0.4s;
    } 
    &.fullScreen-enter-done {
         opacity: 1;
        .top{
            transform: translateY(0px);
        }
        .bottom{
            transform: translateY(0px);
        }
    }
    &.fullScreen-exit {
         opacity: 1;

        .top{
            transform: translateY(0px);
        }
        .bottom{
            transform: translateY(0px);
        }
    }
    &.fullScreen-exit-active,
    &.fullScreen-exit-done {
        opacity: 0;
        transition: all .4s;
        .top{
            transform: translateY(-100px);
        }
        .bottom{
            transform: translateY(100px);
        }
    }
      
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
    box-sizing: border-box;
    position: absolute;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-bottom: 1px solid ${style["border-color-v2"]};
    padding-bottom: 5px;
    width: 100%;
    height: 8%;
    .back {
    margin-left: 5px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${style["font-color-desc"]};
      font-weight: bold;
      transform: rotate(90deg);
    }
  }
  .text {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .title {
    line-height: 25px;
    font-size: ${style["font-size-l"]};
    color: ${style["font-color-desc"]};
    ${style.noWrap()};
  }
  .subtitle {
    line-height: 20px;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc-v2"]};
    ${style.noWrap()};
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
    top: 4%;
    left: 0;
    right: 0;
    width: 80%;
    box-sizing: border-box;
    height: 80vw;
    &.fade-enter{
        opacity: 0;
    }
    &.fade-enter-active{
        opacity: 1;
        transition: opacity .4s;
    }
    &.fade-exit-active,&.fade-exit-done{
        opacity: 0;
        transition: opacity .4s;
    }
    .needle {
        position: absolute;
        top: -11.67vw;
        left: 48vw;
        width: 25vw;
        height: 40vw;
        z-index: 100;
        background-image: url(${needle});
        ${style.bgFull()};
        transform-origin: 4.5vw 4.5vw;
        transition: all 0.3s;
        transform: rotate(0);
        &.pause {
        transform: rotate(-30deg);
        }
    }
    .cd{
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(${disc});
        border: 4px solid ${style["border-color-v2"]};
        border-radius: 50%;
        ${style.bgFull()};
        .image {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width:80%;
        height: 80%;
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
    .playing_lyric {
        position: absolute;
        margin: auto;
        width: 100%;
        top: 95vw;
        font-size: 16px;
        line-height: 20px;
        white-space: normal;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
    }
`

export const LyricContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    &.fade-enter{
        opacity: 0;
    }
    &.fade-enter-active,&.fade-enter-done{
        opacity: 1;
        transition: opacity .4s;
    }
    &.fade-exit-active,&.fade-exit-done{
        opacity: 0;
        transition: opacity .4s;
    }
`
export const LyricList = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    p{
        line-height: 32px;
        color: rgba (255, 255, 255, 0.5);
        white-space: normal;
        font-size: ${style["font-size-l"]};
        &.active{
            color:#fff;
        }

        &.pure{
            position: relative;
            top: 30vh;
        }
    }
`


export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
  .time {
    color: ${style["font-color-desc"]};
    font-size: ${style["font-size-s"]};
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
    &.time-l {
      text-align: left;
    }
    &.time-r {
      text-align: right;
    }
  }
  .progress-bar-wrapper {
    flex: 1;
  }
`;

export const Bottom = styled.div`
    position: absolute;
    bottom: 50px;
    width: 100%;
`
export const List = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-around;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: ${style["font-color-desc-v2"]};
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`
export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 5px;
  border-radius: 10px;
  color: ${style["font-color-desc-v2"]};
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`
export const Operators = styled.div`
    display: flex;
    align-items: center;
    .icon{
        font-weight: 300;
        flex: 1;
        color: ${style["font-color-desc"]};
        &.disabled{
            color: ${style["background-color-shadow"]};
        }
        i{
            font-weight: 300;
            font-size: 30px;
        }
    }
    .i-left{
       text-align: right;
    }
    .i-center{
        text-align: center;
        margin: 0 20px;
        i{
            font-size: 40px;
        }
    }
    .i-right{
        text-align: left;
    }
    .icon-favorite {
        color: ${style["theme-color"]};
    }
`