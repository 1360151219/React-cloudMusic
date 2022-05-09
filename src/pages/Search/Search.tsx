import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group"
import { Container, ShortcutWrapper, HotKey, AlbumList, ListItem, SongItem } from "./style";
import SearchBox from "../../components/SeachBox/SearchBox";
import Scroll from "../../components/Scroll/Scroll";
import Loading from "../../components/Loading/Loading";
import MusicNote from "../../components/MusicNote/MusicNote";
import { getHotKeyWords, getSuggestList } from "./store/actionCreator";
import { connect } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import placeholderImg from '../../assets/music.png'
import { getName } from "../../utils";
import { getSongDetail } from "../Player/store/actionCreator";
function Search(props) {

    const { hotList,
        loading,
        songList,
        suggestList,
        playing
    } = props

    const { getHotKeyWordsDispatch, getSuggestListDispatch, getSongDetailDispatch } = props
    const navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [query, setQuery] = useState("")
    const musicNoteRef = useRef()
    const searchBack = useCallback(() => {
        setShow(false)
    }, [])
    const handleQuery = useCallback((q) => {
        setQuery(q)
        if (!q) return
        getSuggestListDispatch(q)
    }, [])
    const selectItem = (e, id: string) => {
        //搜索单曲的数据并不完整，需要重新获取具体数据
        getSongDetailDispatch(id)
        musicNoteRef.current.startAnimation({ x: e.clientX, y: e.clientY })

    }
    useEffect(() => {
        getHotKeyWordsDispatch()
    }, [])
    const renderHotKeys = () => {
        let datalist = hotList ? hotList.toJS() : []
        return (
            <ul>
                {
                    datalist.map((item, index) => {
                        return (
                            <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                                <span>{item.first}</span>
                            </li>
                        )

                    })
                }
            </ul>
        )
    }
    const renderSingers = () => {
        let datalist = suggestList.toJS().artists
        return (
            <AlbumList>
                <h1 className="title">相关歌手</h1>
                {
                    datalist
                        ?
                        datalist.map((item, index) => {
                            return (
                                <ListItem key={item.id} onClick={() => navigate('/singers/' + item.id)}>
                                    <div className="img_wrapper">
                                        <LazyLoad placeholder={<img src={placeholderImg} width="100%" height="100%" alt="music" />}>
                                            <img src={item.picUrl} alt="" />
                                        </LazyLoad>
                                    </div>
                                    <div className="des">
                                        <span className="name"> 歌手: {item.name}</span>
                                        {/* <span className="alias">{item.alia}</span> */}
                                    </div>

                                </ListItem>
                            )

                        })
                        :
                        null
                }
            </AlbumList>



        )
    };
    const renderAlbum = () => {
        if (!suggestList.size) return
        let datalist = suggestList.toJS().playlists
        return (
            <AlbumList>
                <h1 className="title">相关歌单</h1>
                {
                    datalist
                        ?
                        datalist.map((item, index) => {
                            return (
                                <ListItem key={item.id} onClick={() => navigate('/album/' + item.id)}>
                                    <div className="img_wrapper">
                                        <LazyLoad placeholder={<img src={placeholderImg} width="100%" height="100%" alt="music" />}>
                                            <img src={item.coverImgUrl} alt="" />
                                        </LazyLoad>
                                    </div>
                                    <div className="des">
                                        <span className="name"> 歌单: {item.name}</span>
                                        <span className="description">{item.description}</span>
                                    </div>

                                </ListItem>
                            )

                        })
                        :
                        null
                }
            </AlbumList>



        )
    };
    const renderSongs = () => {
        let datalist = songList.toJS()
        return (
            <SongItem style={{ paddingLeft: "20px" }}>
                {
                    datalist ?
                        datalist.map((item, index) => {
                            return (
                                <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                                    <div className="info">
                                        <span>{item.name}</span>
                                        <span>
                                            {getName(item.artists)} - {item.album.name}
                                        </span>
                                    </div>
                                </li>
                            )
                        })

                        : null
                }
            </SongItem>
        )
    };
    useEffect(() => {
        setShow(true)
    }, [])


    return (
        <CSSTransition
            in={show}
            timeout={300}
            // appear={true}
            classNames="fly"
            unmountOnExit
            onExited={() => navigate(-1)}
        >
            <Container playing={playing}>
                <MusicNote ref={musicNoteRef} />
                <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
                <ShortcutWrapper show={!query}>
                    <Scroll>
                        <div>
                            <HotKey>
                                <h1 className="title"> 热门搜索 </h1>
                                {renderHotKeys()}
                            </HotKey>
                        </div>
                    </Scroll>
                </ShortcutWrapper>
                <ShortcutWrapper show={query}>
                    <Scroll onScroll={forceCheck}>
                        <div>
                            {renderSingers()}
                            {renderAlbum()}
                            {renderSongs()}
                        </div>
                    </Scroll>
                </ShortcutWrapper>
                {loading ? <Loading /> : null}
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = (state) => ({
    hotList: state.getIn(["search", "hotList"]),
    loading: state.getIn(["search", "loading"]),
    songList: state.getIn(["search", "songList"]),
    suggestList: state.getIn(["search", "suggestList"]),
    playing: state.getIn(["player", "playList"]).size > 0
})
const mapDispatchToProps = (dispatch) => {
    return {
        getHotKeyWordsDispatch() {
            dispatch(getHotKeyWords())
        },
        getSuggestListDispatch(query) {
            dispatch(getSuggestList(query))
        },
        getSongDetailDispatch(id) {
            dispatch(getSongDetail(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Search))
