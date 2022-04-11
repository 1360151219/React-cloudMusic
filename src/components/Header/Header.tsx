import React, { useEffect, useState } from "react";
import "./Header.scss"
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    handleClick: () => void,
    title: string
}
const Header = React.forwardRef((props: HeaderProps = { handleClick: () => { }, title: 'Title' }, ref) => {
    let { title, handleClick } = props
    return (
        <>
            <div className="Header" ref={ref}>
                <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
                <h1>{title}</h1>
            </div>
        </>
    )
})

export default React.memo(Header)