import styled from 'styled-components'
import style from '../../assets/global-style'

export const PlayListWrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: ${style["background-color-shadow"]};
    &.fade-enter{
        opacity: 0;
        transform: translate3d(0, 100%, 0);

    }
    &.fade-enter-active{
        opacity: 1;
        transition: all .3s;
        transform: translate3d(0, 0, 0);

    }
    &.fade-exit-active{
        opacity: 0;
        transition: all .3s;
        transform: translate3d(0, 100%, 0);
    }
    .list_wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        opacity: 1;
        border-radius: 10px 10px 0 0;
        background-color: ${style["highlight-background-color"]};
        transform: translate3d(0, 0, 0);
        /* transition: all .4s; */
        .list_close {
            text-align: center;
            line-height: 50px;
            background: ${style["background-color"]};
            font-size: ${style["font-size-l"]};
            color: ${style["font-color-desc"]};
        }
    }
`
export const ListHeader = styled.div`
    position: relative;
    padding: 20px 30px 10px 20px;
    .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .text{
            flex: 1;
            font-size: ${style["font-size-ll"]};
            color: ${style["font-color-desc"]};
        }
       .iconfont {
           text-align: right;
            margin-right: 10px;
            font-size: ${style["font-size-lll"]};
            color: ${style["theme-color"]};
        }
        .clear {
            ${style.extendClick()}
            font-size: ${style["font-size-lll"]};
        }
    }
`
export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`;

export const ListContent = styled.div`
    .item{
        display: flex;
        align-items: center;
        height: 50px;
        margin: 0 30px 0 10px;
        overflow: hidden;
        .current{
            flex:0 0 20px;
            margin: 0 5px;
            width: 20px;
            font-size: ${style['font-size-ll']};
            color:${style['theme-color']}
        }
        .text{
            flex: 1;
            ${style.noWrap()}
            font-size: ${style["font-size-l"]};
            color: ${style["font-color-desc-v2"]};
            .icon-favorite{
                color: ${style['theme-color']}
            }
        }
        .like{
            ${style.extendClick()}
            margin-right: 15px;
            font-size: ${style['font-size-l']};
            color: ${style['theme-color']}
        }
        .delete{
            ${style.extendClick()}
            font-size: ${style['font-size-l']};
            color: ${style['theme-color']}
        }
    }
`