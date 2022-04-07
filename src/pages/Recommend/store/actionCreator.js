import * as actionTypes from './constants'
import { fromJS } from 'immutable'
import { getBannerRequest, getRecommendListRequest } from '../../../api/request'

const changeBannerList = (data) => {
    return {
        type: actionTypes.CHANGE_BANNER,
        data: fromJS(data)
    }
}

const changeRecommendList = (data) => {
    return {
        type: actionTypes.CHANGE_RECOMMEND_LIST,
        data: fromJS(data)
    }
}


const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            console.log(data);
            dispatch(changeBannerList(data.banners))
        }).catch((err) => {
            console.log(err);
        })
    }
}

const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch(changeRecommendList(data.result))
        }).catch(err => {
            console.log(err);
        })
    }
}

export {
    // changeBannerList,
    // changeRecommendList,
    getBannerList,
    getRecommendList
}