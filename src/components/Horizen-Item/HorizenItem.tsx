import React, { useEffect, useRef, useState } from "react";
import "./HorizenItem.scss"
import Scroll from '../Scroll/Scroll'
interface HorizenProps<T> {
    list: Array<T>,
    oldVal: string,
    title: string,
    handleClick: (value: string) => void
}
interface HorizenItem {
    name: string,
    key: string
}
const HorizenItem: React.FC<HorizenProps<HorizenItem>> = ({ list, oldVal, title = 'title', handleClick }) => {
    // 注：这里给content加一个css：width:max-content 即可
    // 给Scroll内第一个div设置初始化高度
    // const Category = useRef(null)
    // useEffect(() => {
    //     let category = (Category.current) as HTMLDivElement
    //     let itemEls = category.querySelectorAll('span')
    //     let totalWidth = Array.from(itemEls).reduce((acc, cur) => acc + cur.offsetWidth, 0)
    //     category.style.width = totalWidth + 'px'
    // }, [])
    return (
        <>
            <Scroll direction="horizental">
                <div className="scroll-content">
                    <div className="list">
                        <span className="title">{title}</span>
                        {
                            list.map((item) => {
                                return (
                                    <span
                                        key={item.key}
                                        className={`${oldVal === item.key ? 'selected list-item' : 'list-item'}`}
                                        onClick={() => handleClick(item.key)}>
                                        {item.name}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </Scroll>
        </>
    )
}

export default React.memo(HorizenItem)