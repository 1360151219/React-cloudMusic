import { getHotSingersRequest, getSingerTypesRequest } from '../../../api/request'
import { Limits } from '../../../api/request'
import {
    changeSingerList, changeLoading, changePullUpLoading, changePullDownLoading, changePageCount, changeNoMore
    , changeCategory, changeArea, changeAlpha
} from '.';


//第一次加载热门歌手
export const getHotSingerList = () => {
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
export const refreshMoreHotSingerList = () => {
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
export const getSingeTypes = () => {
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
export const refreshMoreSingerList = () => {
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