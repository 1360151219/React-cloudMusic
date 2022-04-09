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
export const getSingeTypes = (type, area, alpha) => {
    return (dispatch, getState) => {
        getSingerTypesRequest(type, area, alpha, 0).then(res => {
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
export const refreshMoreSingerList = (category, area, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getSingerTypesRequest(category, area, alpha, pageCount * Limits).then(res => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(() => {
            console.log('歌手数据获取失败');
        });
    }
};