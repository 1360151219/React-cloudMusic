import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group"
import { connect } from "react-redux";
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from "./style"
import Header from "../../components/Header/Header";
import SongsList from "../../components/SongList/SongsList";
import Scroll from "../../components/Scroll/Scroll";
// 列表偏移量
const OFFSET = 5
function Singer() {
    const artist = {
        picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
        name: "薛之谦",
        hotSongs: [
            {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            },
            {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            },
            // 省略 20 条
            {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            }, {
                name: "我好像在哪见过你",
                ar: [{ name: "薛之谦" }],
                al: {
                    name: "薛之谦专辑"
                }
            },
        ]
    }
    let [fly, setFly] = useState(true)
    let navigate = useNavigate()
    let songScrollWrapper = useRef()
    let imgWrapper = useRef()
    let collectButton = useRef()
    let songScroll = useRef()
    let header = useRef()
    let layer = useRef()
    const heightInitial = useRef(0)
    useEffect(() => {
        let h = imgWrapper.current.offsetHeight
        songScrollWrapper.current.style.top = h - OFFSET + 'px'
        heightInitial.current = h
        // 这个layer非常牛
        layer.current.style.top = `${h - OFFSET}px`;
        songScroll.current.refresh();
    }, [])
    const handleClick = useCallback(() => {
        setFly(false)
    }, [])
    const handleScroll = useCallback((pos: { x: number, y: number }) => {
        let height = heightInitial.current
        let percent = Math.abs(pos.y / height)
        let headerHeight = header.current.offsetHeight
        let minScrollY = -(height - OFFSET - headerHeight)
        // 当下拉的时候
        if (pos.y > 0) {
            imgWrapper.current.style.transform = `scale(${1 + percent})`
            layer.current.style.top = `${height - OFFSET + pos.y}px`
            collectButton.current.style.transform = `translateY(${pos.y}px)`
        } else if (pos.y >= minScrollY) {
            // 上拉
            layer.current.style.top = `${height - OFFSET + pos.y}px`
            collectButton.current.style.transform = `translateY(${pos.y}px)`
            collectButton.current.style.opacity = `${1 - percent * 2}`// 加快消失速度
            imgWrapper.current.style.height = `0px`;
            imgWrapper.current.style.paddingTop = '75%';
            imgWrapper.current.style.zIndex = 0;
        } else {
            // 超过了Header的时候
            imgWrapper.current.style.height = `${headerHeight}px`;
            imgWrapper.current.style.paddingTop = 0;
            imgWrapper.current.style.zIndex = 99;
        }

    }, [])
    return (
        <CSSTransition
            in={fly}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={() => { navigate(-1) }}
        >
            <Container>
                <Header title={artist.name} handleClick={handleClick} ref={header}></Header>
                <ImgWrapper bgUrl={artist.picUrl} ref={imgWrapper}>
                    <div className="filter"></div>
                </ImgWrapper>
                <CollectButton ref={collectButton}>
                    <i className="iconfont">&#xe62d;</i>
                    <span className="text"> 收藏 </span>
                </CollectButton>
                <BgLayer ref={layer}></BgLayer>
                <SongListWrapper ref={songScrollWrapper}>
                    <Scroll ref={songScroll} onScroll={handleScroll}>
                        <div>
                            <SongsList songs={artist.hotSongs} showCollect={false} collectCount={1}></SongsList>
                        </div>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}
export default connect()(React.memo(Singer))