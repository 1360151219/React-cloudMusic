import React, { useEffect, useState } from "react";
import "./Singers.scss"
import { useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll/Scroll";
import HorizenItem from "../../components/Horizen-Item/HorizenItem";
import { categoryTypes, alphaTypes } from '../../api/request'

function Singers() {
    let [category, setCategory] = useState('')
    let [alpha, setAlpha] = useState('')
    const handleCategory = (value: string) => {
        setCategory(value)
    }
    const handleAlpha = (value: string) => {
        setAlpha(value)
    }
    return (
        <>
            <div className="Singers">
                <HorizenItem
                    list={categoryTypes}
                    title={"分类（默认热门）："}
                    handleClick={handleCategory}
                    oldVal={category}
                ></HorizenItem>
                <HorizenItem
                    list={alphaTypes}
                    title={"首字母"}
                    handleClick={handleAlpha}
                    oldVal={alpha}
                ></HorizenItem>
            </div>
        </>
    )
}

export default React.memo(Singers)
