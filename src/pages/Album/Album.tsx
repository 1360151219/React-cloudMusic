import React, { useEffect, useState } from "react";
import "./Album.scss"
import { useNavigate, useParams } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import Header from "../../components/Header/Header";
function Album() {
    let navigate = useNavigate()
    let param = useParams()
    let [fly, setFly] = useState(true)
    const id = param.id
    const handleBack = () => {
        setFly(false)
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
                    <Header title='返回' handleClick={handleBack} />
                    <div className="album-content">album</div>
                </div>
            </CSSTransition>
        </>
    )
}
export default React.memo(Album)