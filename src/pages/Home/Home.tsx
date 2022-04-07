import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./Home.scss"
import { Top } from "./style";
const Links = [
    {
        path: '',
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
    let Tab = (Links.map((link, index) => {
        return <NavLink key={index} to={link.path}
        >{link.title}</NavLink>
    }))
    return (
        <div>
            <Top>
                <span className="iconfont menu">&#xe65c;</span>
                <span className="title">云音乐</span>
                <span className="iconfont search">&#xe62b;</span>
            </Top>
            <div className="tab">
                {Tab}
            </div>

            <Outlet></Outlet>
        </div>
    )
}

export default React.memo(Home)