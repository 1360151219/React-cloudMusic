import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCount } from "../../utils"
import LazyLoad from "react-lazyload";
import placeholderImg from '../../assets/music.png'

import {
    ListWrapper,
    ListItem,
    List
} from './style';

interface recommendItem {
    id: number,
    picUrl: string,
    playCount: number,
    name: string
}



function RecommendList(props: { recommendList: recommendItem[] }) {
    let navigate = useNavigate()
    function enterDetail(id: string) {
        navigate(`/recommend/${id}`)
    }
    return (
        <ListWrapper>
            <h1 className="title"> 推荐歌单 </h1>
            <List>
                {
                    props.recommendList.map((item, index) => {
                        return (
                            <ListItem key={item.id + index} onClick={() => enterDetail(item.id)}>
                                <div className="img_wrapper">
                                    <div className="decorate"></div>
                                    {/* 加此参数可以减小请求的图片资源大小 */}
                                    <LazyLoad placeholder={<img src={placeholderImg} width="100%" height="100%" alt="music" />}>
                                        <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                                    </LazyLoad>
                                    <div className="play_count">
                                        <i className="iconfont play">&#xe885;</i>
                                        <span className="count">{getCount(item.playCount)}</span>
                                    </div>
                                </div>
                                <div className="desc">{item.name}</div>
                            </ListItem>
                        )
                    })
                }
            </List>
        </ListWrapper>
    );
}
export default React.memo(RecommendList)