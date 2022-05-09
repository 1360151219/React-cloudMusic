import React, { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Home.scss"
import { Top } from "./style";
import Player from "../Player/Player";
const Links = [
    {
        path: '/recommend',
        title: '推荐'
    },
    {
        path: '/singers',
        title: '歌手'
    }, {
        path: '/rank',
        title: '排行榜'
    },
]
function Home() {
    const navigate = useNavigate()
    // moving-border 的left值
    let [left, setLeft] = useState(0)
    const borderRef = useRef()
    let location = useLocation()
    let pathName = location.pathname
    useEffect(() => {
        // path 路径变换也是副作用
        Links.forEach((item, index) => {
            if (item.path === pathName) {
                setLeft(index * 125)
            }
        })
        borderRef.current.style.left = `${left}px`
    })
    let Tab = (Links.map((link, index) => {
        return <NavLink key={index} to={link.path}
        >{link.title}</NavLink>
    }))
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">云音乐</span>
                <span className="iconfont search" onClick={() => { navigate('/search') }}>&#xe62b;</span>
            </Top>
            <div className="tab">
                {Tab}
                <div className="moving-border" ref={borderRef}></div>
            </div>
            <Player></Player>
            <Outlet></Outlet>
        </div>
    )
}

export default React.memo(Home)