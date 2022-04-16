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

export const MiniPlayerContainer = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 60px;
    background-color: ${style["highlight-background-color"]};
    &.mini-appear {
        transform: translate3d(0, 0, 0);
        transition: all .4s;
    }
    &.mini-enter {
        transform: translate3d(0, 100%, 0);
        transition: all .4s;
    }
    &.mini-enter-active,
    &.mini-enter-done {
        transform: translate3d(0, 0, 0);
        transition: all .4s;
    }
    &.mini-exit {
        transform: translate3d(0, 0, 0);
        transition: all .4s
    }
    &.mini-exit-active,
    &.mini-exit-done {
        transform: translate3d(0, 100%, 0);
        transition: all .4s
    }
    .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper {
      width: 100%;
      height: 100%;
      img {
        border-radius: 50%;
        &.play {
          animation: ${rotate} 20s infinite;
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
  }
   .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      font-size: 14px;
      color: ${style["font-color-desc"]};
      ${style.noWrap()}
    }
    .desc {
      font-size: 12px;
      color: ${style["font-color-desc-v2"]};
      ${style.noWrap()}
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    .iconfont, .icon-playlist {
      font-size: 30px;
      color: ${style["theme-color"]};
    }
    .icon-mini {
      font-size: 16px;
      position: absolute;
      left: 8px;
      top: 8px;
      &.icon-play {
        left: 10px;
      }

    }
  }
`
