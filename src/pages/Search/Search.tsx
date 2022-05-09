import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group"
import { Container } from "./style";
import SearchBox from "../../components/SeachBox/SearchBox";
export default function Search() {
    const navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [query, setQuery] = useState("")
    const searchBack = useCallback(() => {
        setShow(false)
    }, [])
    const handleQuery = useCallback((q) => {
        setQuery(q)
        console.log(q);
    }, [])
    useEffect(() => {
        setShow(true)
    }, [])
    return (
        <CSSTransition
            in={show}
            timeout={300}
            // appear={true}
            classNames="fly"
            unmountOnExit
            onExited={() => navigate(-1)}
        >
            <Container>
                <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>

            </Container>
        </CSSTransition>
    )
}
