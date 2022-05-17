import React from "react";
import "./Loading.scss"

function Loadingv2() {
    return (
        <>
            <div className="Loadingv2">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <span>拼命加载中.....</span>
            </div>
        </>
    )
}
export default React.memo(Loadingv2)