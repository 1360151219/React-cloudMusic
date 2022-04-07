import axios from "axios";
export const baseUrl = 'http://localhost:3000/'

const axiosInstance = axios.create({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
    res => res.data
    ,
    err => {
        console.log(err);
    }
)
export { axiosInstance }