import React, { useEffect, useRef, useState } from "react";
import "./Album.scss"
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import Header from "../../components/Header/Header";
import Scroll from "../../components/Scroll/Scroll";
import { TopDesc, Menu, SongList, SongItem } from './style';
import style from '../../assets/global-style'
import { getCount, getName } from "../../utils";

function Album() {
    let navigate = useNavigate()
    let param = useParams()
    let [fly, setFly] = useState(true)
    let [title, setTitle] = useState("歌单")
    let [isMarquee, setIsMarquee] = useState(false)
    const headerEl = useRef()
    const id = param.id
    const currentAlbum = {
        creator: {
            avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
            nickname: "浪里推舟"
        },
        coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
        subscribedCount: 2010711,
        name: "听完就睡，耳机是天黑以后柔软的梦境",
        tracks: [
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
            {
                name: "我真的受伤了",
                ar: [{ name: "张学友" }, { name: "周华健" }],
                al: {
                    name: "学友 热"
                }
            },
        ]
    }
    const handleBack = () => {
        setFly(false)
    }
    const handleScroll = (pos: { x: number, y: number }) => {
        let minScrollY = -45
        let percent = Math.abs(pos.y / minScrollY)
        let headerDOM = headerEl.current
        // 开始滑动，且大于最小值
        console.log(pos.y);
        if (pos.y < minScrollY) {
            headerDOM.style.backgroundColor = style['theme-color']
            headerDOM.style.opacity = Math.min(1, (percent - 1) / 2)
            setTitle(currentAlbum.name)
            setIsMarquee(true)
        } else {
            headerDOM.style.backgroundColor = ''
            headerDOM.style.opacity = 1
            setTitle('歌单')
            setIsMarquee(false)
        }
    }
    return (
        <>
            <CSSTransition
                in={fly}
                timeout={300}
                classNames="fly"
                appear={true}
                unmountOnExit
                onExited={() => { navigate(-1) }}
            >
                <div className="Album">
                    <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee} />
                    <div className="album-content">
                        <Scroll bounceTop={false} onScroll={handleScroll}>
                            <div>
                                <TopDesc background={currentAlbum.coverImgUrl}>
                                    <div className="background">
                                        <div className="filter"></div>
                                    </div>
                                    <div className="img-wrapper">
                                        <div className="decorate"></div>
                                        <img src={currentAlbum.coverImgUrl} alt="" />
                                        <div className="play_count">
                                            <i className="iconfont play">&#xe885;</i>
                                            <span className="count">{Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万 </span>
                                        </div>
                                    </div>
                                    <div className="desc-wrapper">
                                        <div className="title">{currentAlbum.name}</div>
                                        <div className="person">
                                            <div className="avatar">
                                                <img src={currentAlbum.creator.avatarUrl} alt="" />
                                            </div>
                                            <div className="name">{currentAlbum.creator.nickname}</div>
                                        </div>
                                    </div>
                                </TopDesc>
                                <Menu>
                                    <div>
                                        <i className="iconfont">&#xe6ad;</i>
                                        评论
                                    </div>
                                    <div>
                                        <i className="iconfont">&#xe86f;</i>
                                        点赞
                                    </div>
                                    <div>
                                        <i className="iconfont">&#xe62d;</i>
                                        收藏
                                    </div>
                                    <div>
                                        <i className="iconfont">&#xe606;</i>
                                        更多
                                    </div>
                                </Menu>
                                <SongList>
                                    <div className="first-line">
                                        <div className="play-all">
                                            <i className="iconfont">&#xe6e3;</i>
                                            <span >
                                                播放全部
                                                <span className="sum">(共 {currentAlbum.tracks.length} 首)</span>
                                            </span>
                                        </div>
                                        <div className="add-list">
                                            <i className="iconfont">&#xe62d;</i>
                                            <span > 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
                                        </div>
                                    </div>
                                </SongList>
                                <SongItem>
                                    {
                                        currentAlbum.tracks.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <span className="index">{index + 1}</span>
                                                    <div className="info">
                                                        <span>{item.name}</span>
                                                        <span>
                                                            {getName(item.ar)} - {item.al.name}
                                                        </span>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </SongItem>
                            </div>
                        </Scroll>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
}
export default React.memo(Album)