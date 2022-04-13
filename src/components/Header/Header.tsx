import React, { useEffect, useState } from "react";
import "./Header.scss"

interface HeaderProps {
    handleClick?: () => void,
    title: string,
    isMarquee?: boolean
}
const Header = React.forwardRef((props: HeaderProps = { handleClick: () => { }, title: 'Title', isMarquee: false }, ref) => {
    let { title, handleClick, isMarquee } = props
    return (
        <>
            <div className="Header" ref={ref}>
                <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
                {isMarquee ? <marquee><h1>{title}</h1></marquee> : <h1>{title}</h1>}
            </div>
        </>
    )
})

export default React.memo(Header)