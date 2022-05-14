import { getAlbumDetailRequest } from "../../../api/request";
import { changeLoading, changeCurrentAlbum } from ".";



export const getAlbumList = (id) => {
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