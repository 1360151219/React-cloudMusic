import { getAlbumDetailRequest } from "../../../api/request";
import * as actionTypes from './constants'
import { fromJS } from "immutable";

export const changeLoading = (loading: boolean) => ({
    type: actionTypes.CHANGE_LOADING,
    data: loading
})

export const changeCurrentAlbum = (data: any) => ({
    type: actionTypes.CHANGE_CURRENT_ALBUM,
    data: fromJS(data)
})


export const getAlbumList = (id: number) => {
    return dispatch => {
        dispatch(changeLoading(true))
        getAlbumDetailRequest(id).then(res => {
            dispatch(changeLoading(false))
            const data = res.playlist
            dispatch(changeCurrentAlbum(data))
        }).catch(err => {
            console.log('歌单数据获取异常！');
        })
    }
}