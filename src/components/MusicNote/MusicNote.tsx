import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { Container } from "./style"
import { prefixStyle } from './../../utils';
const transform = prefixStyle("transfrom")
const ICON_NUMBER = 3
const MusicNote = forwardRef((props, ref) => {
    const iconsRef = useRef()
    // 原生 DOM 操作，返回一个 DOM 节点对象
    const createNode = (txt) => {
        const template = `<div class='icon_wrapper'>${txt}</div>`;
        let tempNode = document.createElement('div');
        tempNode.innerHTML = template;
        return tempNode.firstChild;
    }
    useEffect(() => {
        for (let i = 0; i < ICON_NUMBER; i++) {
            let node = createNode(`<div class="iconfont">&#xe642;</div>`);
            iconsRef.current.appendChild(node);
        }
        // 类数组转换成数组，当然也可以用 [...xxx] 解构语法或者 Array.from ()
        let domArray: HTMLDivElement[] = [].slice.call(iconsRef.current.children);
        domArray.forEach(item => {
            item.running = false;
            item.addEventListener('transitionend', function () {
                console.log("end");
                this.style[transform] = `translate3d(0, 0, 0)`;
                this.style.transform = `translate3d(0, 0, 0)`;
                this.running = false;
                let icon = this.querySelector('div');
                icon.style[transform] = `translate3d(0, 0, 0)`;
                icon.style.transform = `translate3d(0, 0, 0)`;
                this.style['display'] = 'none';
            }, false);
        });
    }, [])
    const startAnimation = ({ x, y }) => {
        let domArray: HTMLDivElement[] = [].slice.call(iconsRef.current.children)
        for (let i = 0; i < ICON_NUMBER; i++) {
            let item = domArray[i]
            // 选择一个空闲的元素来开始动画
            if (item.running === false) {
                item.style.left = x + "px";
                item.style.top = y + "px";
                item.style.display = "inline-block";
                setTimeout(() => {
                    item.running = true;
                    item.style[transform] = `translate3d(0, 1000px, 0)`;
                    item.style.transform = `translate3d(0, 1000px, 0)`;
                    let icon = item.querySelector("div") as HTMLDivElement;
                    icon.style[transform] = `translate3d(40px, 0, 0)`;
                    icon.style.transform = `translate3d(40px, 0, 0)`;
                    // icon.style["transition"] = `all 0.03s`;
                }, 20);
                break;
            }
        }
    };
    // 外界调用的 ref 方法
    useImperativeHandle(ref, () => ({
        startAnimation
    }));
    return (
        <Container ref={iconsRef}>
        </Container>
    )
})
export default React.memo(MusicNote)