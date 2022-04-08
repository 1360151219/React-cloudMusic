import React from "react";
import "./Loading.scss"

function Loading() {
    return (
        <>
            <div className="Loading">
                <div></div>
                <div></div>
            </div>
        </>
    )
}
export default React.memo(Loading)