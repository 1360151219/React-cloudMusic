import React, { useEffect, useState } from "react";
import { getName } from "../../utils";
import { FullPlayerContainer, Top, Middle, CDWrapper } from "./style";
function FullPlayer(props) {
    const { song } = props
    return (
        <>
            <FullPlayerContainer>
                <div className="background">
                    <img
                        src={song.al.picUrl + "?param=300x300"}
                        width="100%"
                        height="100%"
                        alt="歌曲图片"
                    />
                </div>
                <div className="background layer"></div>
                <Top className="top">
                    <div className="back">
                        <i className="iconfont icon-back">&#xe662;</i>
                    </div>
                    <h1 className="title">{song.name}</h1>
                    <h1 className="subtitle">{getName(song.ar)}</h1>
                </Top>
                <Middle>
                    <CDWrapper>
                        <div className="cd">
                            <img
                                className="image play"
                                src={song.al.picUrl + "?param=400x400"}
                                alt=""
                            />
                        </div>
                    </CDWrapper>
                </Middle>
            </FullPlayerContainer>
        </>
    )
}

export default React.memo(FullPlayer)