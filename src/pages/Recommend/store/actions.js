import { getBannerRequest } from "../../../api/request";
import { changeBannerList, changeRecommendList, changeLoading } from ".";


export const getBanner = () => (dispatch) => {
    getBannerRequest().then(data => {
        dispatch(changeBannerList(data.banners));
    }).catch((err) => {
        console.log(err);
    })
};