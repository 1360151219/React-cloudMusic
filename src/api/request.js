import { axiosInstance as axioss } from "./config";

export const getBannerRequest = () => {
    return axioss.get('/banner')
}
export const getRecommendListRequest = () => {
    return axioss.get('/personalized');
}