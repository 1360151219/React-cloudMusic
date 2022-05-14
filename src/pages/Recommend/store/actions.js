import { getBannerRequest, getRecommendListRequest } from "../../../api/request";
import { changeBannerList, changeRecommendList, changeLoading } from ".";


export const getBanner = () => (dispatch) => {
    dispatch(changeLoading(true))
    getBannerRequest().then(data => {
        dispatch(changeBannerList(data.banners));
        dispatch(changeLoading(false))
    }).catch((err) => {
        console.log(err);
    })
};
export const getRecommendList = () => (dispatch) => {
    dispatch(changeLoading(true))
    getRecommendListRequest().then(data => {
        dispatch(changeRecommendList(data.result));
        dispatch(changeLoading(false))
    }).catch((err) => {
        console.log(err);
    })
};
