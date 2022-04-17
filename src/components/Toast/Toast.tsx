import React, { useState, forwardRef, useImperativeHandle } from "react";
import { ToastWrapper } from "./style"
import { CSSTransition } from "react-transition-group"

const Toast = forwardRef((props, ref) => {
    const { text, delay } = props
    const [isShow, setIsShow] = useState<Boolean>(false)
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    useImperativeHandle(ref, () => ({
        show() {
            if (timer) clearTimeout(timer)
            setIsShow(true)
            setTimer(setTimeout(() => {
                setIsShow(false)
            }, delay))
        }
    }))
    return (
        <CSSTransition
            in={isShow}
            timeout={300}
            classNames="drop"
            unmountOnExit>
            <ToastWrapper>
                <div className="text">{text}</div>
            </ToastWrapper>
        </CSSTransition>
    )
})
export default React.memo(Toast)