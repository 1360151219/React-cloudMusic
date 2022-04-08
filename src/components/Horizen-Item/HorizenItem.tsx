import React, { useEffect, useState } from "react";
import "./HorizenItem.scss"
import Scroll from '../Scroll/Scroll'
interface HorizenProps<T> {
    list: Array<T>,
    oldVal: string,
    title: string,
    handleClick: () => void
}
const HorizenItem: React.FC<HorizenProps> = ({ list, oldVal, title = 'title', handleClick }) => {
    return (
        <>
            <Scroll direction="horizental">
                <div>
                    <div className="list">
                        <span>{title}</span>
                        {
                            list.map((item) => {
                                return (
                                    <div
                                        key={item.key}
                                        className={`${oldVal === item.key ? 'selected list-item' : 'list-item'}`}
                                        onClick={() => handleClick(item.key)}>
                                        {item.name}
                                    </div>
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