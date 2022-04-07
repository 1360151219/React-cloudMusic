import { axiosInstance as axioss } from "./config";

export const getBanner = () => {
    return axioss.get('/banner')
}
export const getRecommendList = () => {
    return axioss.get('/personalized');
}