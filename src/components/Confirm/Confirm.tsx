import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import style from '../../assets/global-style';

const confirmFadeIn = keyframes`
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
`

const confirmZoom = keyframes`
    0%{
        transform: scale(0);
    }
    50%{
        transform: scale(1.1);
    }
    100%{
        transform: scale(1);
    }

`

const ConfirmWrapper = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: ${style["background-color-shadow"]};
    >div{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 100;
        .confirm_content{
            width: 270px;
            border-radius: 13px;
            background: ${style['background-color']};
            .text{
                padding: 20px 15px;
                line-height: 22px;
                text-align: center;
                font-size: ${style['font-size-l']};
                color: ${style['font-color-desc-v2']};
            }
            .operate{
                display: flex;
                align-items: center;
                text-align: center;
                font-size: ${style['font-size-l']};
                .operate_btn{
                    flex: 1;
                    line-height: 22px;
                    padding: 10px 0;
                    border-top: 2px solid ${style['border-color']};
                    color: ${style['font-color-desc']};
                    &.left{
                        border-right: 2px solid ${style['border-color']};
                    }
                }
            }
        }
    }
`
const Confirm = forwardRef((props, ref) => {
    const { text, cancelBtnText, confirmBtnText } = props;
    const { handleConfirm } = props;
    const [show, setShow] = useState(false);
    
    useImperativeHandle(ref, () => ({
        showConfirm() {
            setShow(true)
        }
    }))
    return (
        <CSSTransition classNames="confirm-fade" timeout={300} appear={true} in={show}>
            <ConfirmWrapper style={{ display: show ? "block" : "none" }} onClick={e => e.stopPropagation()}>
                <div>
                    <div className="confirm_content">
                        <p className="text">{text}</p>
                        <div className="operate" >
                            <div className="operate_btn left" onClick={() => setShow(false)}>{cancelBtnText}</div>
                            <div className="operate_btn" onClick={() => { setShow(false); handleConfirm(); }}>{confirmBtnText}</div>
                        </div>
                    </div>
                </div>
            </ConfirmWrapper>
        </CSSTransition>
    )
})


export default React.memo(Confirm)