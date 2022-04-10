import { getHotSingersRequest, getSingerTypesRequest } from '../../../api/request'
import { Limits } from '../../../api/request'
import * as actionTypes from './constants'

import { fromJS } from 'immutable'

export const changeSingerList = (data: any) => {
    return {
        type: actionTypes.CHANGE_SINGER_LIST,
        data: fromJS(data)
    }
}
export const changeLoading = (data: boolean) => {
    return {
        type: actionTypes.CHANGE_LOADING,
        data,
    }
}
export const changePullUpLoading = (data: boolean) => {
    return {
        type: actionTypes.CHANGE_PULLUP_LOADING,
        data,
    }
}
export const changePullDownLoading = (data: boolean) => {
    return {
        type: actionTypes.CHANGE_PULLDOWN_LOADING,
        data,
    }
}
export const changePageCount = (data: number) => {
    return {
        type: actionTypes.CHANGE_PAGECOUNT,
        data,
    }
}

export const changeCategory = (data: number) => {
    return {
        type: actionTypes.CHANGE_CATEGORY,
        data
    }
}
export const changeArea = (data: number) => {
    return {
        type: actionTypes.CHANGE_AREA,
        data
    }
}
export const changeAlpha = (data: string) => {
    return {
        type: actionTypes.CHANGE_ALPHA,
        data
    }
}
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
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingersRequest(pageCount * Limits).then(res => {
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
        const category = getState().getIn(['singers', 'category'])
        const area = getState().getIn(['singers', 'area'])
        const alpha = getState().getIn(['singers', 'alpha'])
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
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        const category = getState().getIn(['singers', 'category'])
        const area = getState().getIn(['singers', 'area'])
        const alpha = getState().getIn(['singers', 'alpha'])
        getSingerTypesRequest(category, area, alpha, pageCount * Limits).then(res => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};