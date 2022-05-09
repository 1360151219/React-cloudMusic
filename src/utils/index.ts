export function getCount(count: number) {
    if (count < 0) return
    if (count < 10000) return count
    else if (Math.floor(count / 10000) < 10000) return Math.floor(count / 10000) + '万'
    else
        return Math.floor(count / 10000 / 10000) + '亿'
}
export function debounce(func?: (key?: string) => void, delay: number) {
    if (!func) return
    let timer: NodeJS.Timeout;
    return function (...args: any) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
            clearTimeout(timer)
        }, delay)
    }
}
export const findGlobalIndex = (rankList) => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) return i + 1
    }
}
// 拼接名字
export const getName = list => {
    let str = "";
    list.map((item, index) => {
        str += index === 0 ? item.name : "/" + item.name;
        return item;
    });
    return str;
};
// 判断对象是否空
export const isEmptyObject = (obj: any) => {
    if (typeof obj != 'object') return false
    return !obj || Object.keys(obj).length == 0
}
// 计算偏移的函数
export const getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 40;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = (window.innerHeight - paddingBottom - 100) - (paddingTop + width / 2);
    return {
        x,
        y,
        scale
    };
}
// 增加浏览器前缀，处理浏览器兼容问题
let elementStyle = document.createElement("div").style
let vendor = (() => {
    let transformNames = {
        webkit: "webkitTransform",
        Moz: "MozTransform",
        O: "OTransfrom",
        ms: "msTransform",
        standard: "Transform"
    };
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] != undefined) {
            return key
        }
    }
    return false
})()
export function prefixStyle(style: string) {
    if (vendor === false) {
        return false;
    }
    if (vendor === "standard") {
        return style;
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
// console.log(prefixStyle("transform")); webkitTransform 
export function getSong(id: number) {
    return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}
//转换歌曲播放时间
export const formatPlayTime = interval => {
    interval = interval | 0;// |0表示向下取整
    const minute = (interval / 60) | 0;
    const second = (interval % 60).toString().padStart(2, "0");
    return `${minute}:${second}`;
};

// 找到歌曲index
export const findSongIndex = (arr, id) => {
    return arr.findIndex((item, index) => item.id == id)
}
export const shuffle = (arr) => {
    let res = arr.slice()
    for (let i = 0; i < arr.length; i++) {
        let random = Math.floor(Math.random() * (i + 1))
        let t = res[i]
        res[i] = res[random]
        res[random] = t
    }
    return res
}
