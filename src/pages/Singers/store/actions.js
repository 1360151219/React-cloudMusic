import { getHotSingersRequest, getSingerTypesRequest } from '../../../api/request'
import { Limits } from '../../../api/request'
import {
    changeSingerList, changeLoading, changePullUpLoading, changePullDownLoading, changePageCount, changeNoMore
    , changeCategory, changeArea, changeAlpha
} from '.';


//第一次加载热门歌手
const getHotSingerList = () => {
    return (dispatch) => {
        getHotSingersRequest(0).then(res => {
            const data = res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        })
    }
};
//加载更多热门歌手
const refreshMoreHotSingerList = () => {
    return (dispatch, getState) => {
        const state = getState()
        const pageCount = state.singers.pageCount
        const singerList = state.singers.singerList
        const nomore = state.singers.nomore
        if (nomore) {
            dispatch(changePullUpLoading(false));
            return
        }
        getHotSingersRequest(pageCount * Limits).then(res => {
            if (!res.more) dispatch(changeNoMore(true))
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('热门歌手数据获取失败');
        });
    }
};

//第一次加载对应类别的歌手
const getSingeTypes = () => {
    return (dispatch, getState) => {
        const state = getState()
        const category = state.singers.category
        const area = state.singers.area
        const alpha = state.singers.alpha
        getSingerTypesRequest(category, area, alpha, 0).then(res => {
            const data = res.artists;
            dispatch(changeSingerList(data));
            dispatch(changeLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};

//加载更多歌手
const refreshMoreSingerList = () => {
    return (dispatch, getState) => {
        const state = getState()
        const pageCount = state.singers.pageCount
        const singerList = state.singers.singerList
        const category = state.singers.category
        const area = state.singers.area
        const alpha = state.singers.alpha
        const nomore = state.singers.nomore
        if (nomore) {
            dispatch(changePullUpLoading(false));
            return
        }
        getSingerTypesRequest(category, area, alpha, pageCount * Limits).then(res => {
            if (!res.more) dispatch(changeNoMore(true))
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};



export function getHotSingerDispatch(dispatch) {
    dispatch(getHotSingerList());
}
// 上拉加载新数据
export function pullUpRefreshDispatch(dispatch, count, isHot) {
    dispatch(changePullUpLoading(true))
    dispatch(changePageCount(count + 1))
    if (isHot)
        dispatch(refreshMoreHotSingerList())
    else {
        dispatch(refreshMoreSingerList())
    }
}
//顶部下拉刷新
export function pullDownRefreshDispatch(dispatch, isHot) {
    dispatch(changePullDownLoading(true))
    dispatch(changePageCount(0))
    dispatch(changeNoMore(false))
    if (isHot)
        dispatch(getHotSingerList())
    else dispatch(getSingeTypes())
}

// 重新刷新
export function updateDispatch(dispatch, scrollRef, isHot) {
    dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
    dispatch(changeLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
    dispatch(changeNoMore(false))
    if (isHot) dispatch(getHotSingerList());
    else
        dispatch(getSingeTypes());
    scrollRef.current.refresh()
}
// 数据参数变化
export function categoryDispatch(dispatch, category) {
    dispatch(changeCategory(category))
}
export function alphaDispatch(dispatch, alpha) {
    dispatch(changeAlpha(alpha))
}
export function areaDispatch(dispatch, area) {
    dispatch(changeArea(area))
}