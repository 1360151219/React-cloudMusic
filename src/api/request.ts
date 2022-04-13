import { axiosInstance as axioss } from "./config";
export const Limits = 30
export const getBannerRequest = () => {
    return axioss.get('/banner')
}
export const getRecommendListRequest = () => {
    return axioss.get('/personalized');
}

export const getHotSingersRequest = (offset: number) => {
    return axioss.get('/top/artists?limit=' + Limits + '&offset=' + offset)
}

export const getSingerTypesRequest = (type = -1, area = -1, initial: string, offset: number) => {
    return axioss.get(`/artist/list?type=${type}&area=${area}&initial=${initial.toLowerCase()}&offset=${offset}`)
}
// 歌手种类
export const categoryTypes = [{
    name: "全部",
    key: -1
},
{
    name: "男歌手",
    key: 1
}, {
    name: "女歌手",
    key: 2
}, {
    name: "乐队",
    key: 3
},
];
// 地区种类
export const areaTypes = [
    {
        name: "全部",
        key: -1
    },
    {
        name: "华语",
        key: 7
    }, {
        name: "欧美",
        key: 96
    }, {
        name: "日本",
        key: 8
    },
    {
        name: "韩国",
        key: 16
    }, {
        name: "其他",
        key: 0
    },
];
// 歌手首字母
export const alphaTypes = [{
    key: "A",
    name: "A"
},
{
    key: "B",
    name: "B"
},
{
    key: "C",
    name: "C"
},
{
    key: "D",
    name: "D"
},
{
    key: "E",
    name: "E"
},
{
    key: "F",
    name: "F"
},
{
    key: "G",
    name: "G"
},
{
    key: "H",
    name: "H"
},
{
    key: "I",
    name: "I"
},
{
    key: "J",
    name: "J"
},
{
    key: "K",
    name: "K"
},
{
    key: "L",
    name: "L"
},
{
    key: "M",
    name: "M"
},
{
    key: "N",
    name: "N"
},
{
    key: "O",
    name: "O"
},
{
    key: "P",
    name: "P"
},
{
    key: "Q",
    name: "Q"
},
{
    key: "R",
    name: "R"
},
{
    key: "S",
    name: "S"
},
{
    key: "T",
    name: "T"
},
{
    key: "U",
    name: "U"
},
{
    key: "V",
    name: "V"
},
{
    key: "W",
    name: "W"
},
{
    key: "X",
    name: "X"
},
{
    key: "Y",
    name: "Y"
},
{
    key: "Z",
    name: "Z"
}
];
// 排行榜
export const getRankListRequest = () => {
    return axioss.get('/toplist/detail')
}
// 歌单详情
export const getAlbumDetailRequest = (id: number) => {
    return axioss.get(`/playlist/detail?id=${id}`)
}
// 歌手歌曲
export const getSingerSongsRequest = (id: number) => {
    return axioss.get(`/artists?id=${id}`)
}