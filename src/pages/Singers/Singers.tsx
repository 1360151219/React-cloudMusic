import React, { useEffect, useState } from "react";
import "./Singers.scss"
import { useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll/Scroll";
import HorizenItem from "../../components/Horizen-Item/HorizenItem";
import { categoryTypes, alphaTypes } from '../../api/request'

const SingerList = () => {
    const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1, 1].map(item => {
        return {
            picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
            name: "隔壁老樊",
            accountId: 277313426,
        }
    });
    return (
        <div className="singerlist">
            {
                singerList.map((item, index) => {
                    return (
                        <div className="singerlist-item" key={item.accountId + "" + index}>
                            <div className="img_wrapper">
                                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                            </div>
                            <span className="name">{item.name}</span>
                        </div>
                    )
                })
            }
        </div>
    )
};
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
                <div className="singerlist-container">
                    <Scroll>
                        <SingerList></SingerList>
                    </Scroll>
                </div>

            </div>
        </>
    )
}

export default React.memo(Singers)
