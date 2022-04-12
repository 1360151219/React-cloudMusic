import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group"
import { connect } from "react-redux";
import { Container } from "./style"

function Singer() {
    let [fly, setFly] = useState(true)
    let navigate = useNavigate()
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
                singer
            </Container>
        </CSSTransition>
    )
}
export default connect()(React.memo(Singer))