import React, { useEffect, useState } from "react";
import "./Album.scss"
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
function Album() {
    let navigate = useNavigate()
    let param = useParams()
    let [fly, setFly] = useState(false)
    const id = param.id
    return (
        <>
            {/* <CSSTransition
                in={fly}
                timeout={300}
                classNames="fly"
                appear={true}
                unmountOnExit
                onExited={}
            >
                <div className="Album">
                    album
                </div>
            </CSSTransition> */}
            <div className="Album">
                album
            </div>
        </>
    )
}
export default React.memo(Album)