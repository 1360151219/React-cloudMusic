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
        console.log(heightInitial);
        // 这个layer非常牛
        layer.current.style.top = `${h - OFFSET}px`;
        songScroll.current.refresh();
    }, [])
    const handleClick = useCallback(() => {
        setFly(false)
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
                    <Scroll ref={songScroll}>
                        <SongsList songs={artist.hotSongs} showCollect={false} collectCount={1}></SongsList>
                    </Scroll>
                </SongListWrapper>
            </Container>
        </CSSTransition>
    )
}
export default connect()(React.memo(Singer))