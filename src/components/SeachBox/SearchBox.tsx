import React, { useMemo, useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../utils";
import { SearchBoxWrapper } from "./style"

const SearchBox = (props) => {
    const { newQuery } = props
    const { handleQuery, back } = props
    const navigate = useNavigate()
    const queryRef = useRef()
    let [query, setQuery] = useState("")
    const clearQuery = () => {
        setQuery('');
        queryRef.current.focus();
    }
    const displayStyle = () => {
        return query ? { display: 'block' } : { display: 'none' }
    }
    const handleChange = (e) => {
        setQuery(e.target.value)
    }
    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 500)
    }, [handleQuery])
    // 进入页面自动聚焦
    useEffect(() => {
        queryRef.current.focus()
    }, [])
    useEffect(() => {
        console.log(handleQueryDebounce);
        handleQueryDebounce(query)
    }, [query])
    useEffect(() => {
        if (newQuery !== query) setQuery(newQuery)
    }, [newQuery])
    return (
        <SearchBoxWrapper>
            <i className="iconfont icon-back" onClick={back}>&#xe655;</i>
            <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange} />
            <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle()}>&#xe600;</i>
        </SearchBoxWrapper>
    )
}
export default React.memo(SearchBox)