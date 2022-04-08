import React, { useEffect, useState } from "react";
import "./Singers.scss"
import { useNavigate } from "react-router-dom";
import Scroll from "../../components/Scroll/Scroll";
import HorizenItem from "../../components/Horizen-Item/HorizenItem";
import { categoryTypes } from '../../api/request'
function Singers() {
    return (
        <>
            <div className="Singers">
                <HorizenItem list={categoryTypes}></HorizenItem>
            </div>
        </>
    )
}
export default React.memo(Singers)
