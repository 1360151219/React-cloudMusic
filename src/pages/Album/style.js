import styled from 'styled-components'
import style from '../../assets/global-style'

export const TopDesc = styled.div`
    background-size:100%;
    padding: 5px 20px;
    padding-bottom: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 275px;
    position: relative;
    .background{
        z-index: -1;
        background: url(${props => props.background}) no-repeat;
        background-position: 0 0;
        background-size: 100% 100%;
        position: absolute;
        width: 100%;
        height: 100%;
        filter: blur(20px);
        .filter {
        position: absolute;
        z-index: 10;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7,17,27,0.2);
        }
    }
    .img-wrapper{
        width: 120px;
        height: 120px;
        position: relative;
        .decorate{
            position: absolute;
            top: 0;
            width: 100%;
            height: 35px;
            border-radius: 3px;
             background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
        }
        .play_count {
            position: absolute;
            right: 2px;
            top: 2px;
            font-size: 12px;
            line-height: 15px;
            color: ${style["font-color-light"]};
            .play {
                vertical-align: top;
            }
        }
        img {
            width: 120px;
            height: 120px;
            border-radius:3px;
        }
    }
    .desc-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${style["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: 16px;
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: 14px;
        color: ${style["font-color-desc-v2"]};
      }
    }
  }
`

export const Menu = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 30px 60px 30px;
    margin: -100px 0 0 0;
    div{
        display: flex;
        flex-direction: column;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color:${style['font-color-light']};
        z-index: 100;
        font-weight: 500;
        .iconfont{
            font-size: 20px;
        }
    }
`

export const SongList = styled.div`
    border-radius: 10px;
    opacity: 0.98;
    position: relative;
    top: -20px;
    ${props => props.showBackground ? `background: ${style["highlight-background-color"]}` : ""};
    .first-line{
        box-sizing: border-box;
        padding: 10px 0;
        margin-left: 10px;
        position: relative;
        justify-content: space-between;
        border-bottom: 1px solid ${style["border-color"]};
        .play-all{
            display: inline-block;
            line-height: 24px;
            color: ${style['font-color-desc']};
            .iconfont{
                font-size: 24px;
                margin-right: 10px;
                vertical-align: top;
            }
            .sum{
                font-size: 14px;
                color:${style['font-color-desc-v2']}
            }
            span{
                vertical-align: top;
            }
        }
        .add-list,
        .isCollected{
            display: flex;
            align-items: center;
            position: absolute;
            right: 0;
            top: 4px;
            bottom: 4px;
            width: 130px;
            background-color: ${style['theme-color']};
            color:${style['font-color-light']};
            font-size:0;
            border-radius:5px;
            vertical-align: top;
            .iconfont{
                vertical-align: top;
                font-size: 10px;
                margin: 0 5px 0 15px;
            }
            span{
                font-size: 14px;
                line-height: 0px;
            }
        }
        .isCollected{
            display: flex;
            background-color: ${style['background-color']};
            color:${style['font-color-desc']}
        }
    }
`

export const SongItem = styled.div`
    margin-top: -20px;
    li {
        display: flex;
        height: 60px;
        align-items:center;
        span.index {
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }

        div.info {
            box-sizing: border-box;
            flex:1;
            display: flex;
            height: 100%;
            padding: 5px 0;
            flex-direction: column;
            justify-content: space-around;
             border-bottom: 1px solid ${style["border-color"]};
            span:first-child {
                color:${style['font-color-desc']}
            }
            span:last-child{
                color:#bba8a8;
                font-size: 12px;
            }
        }
    }
`