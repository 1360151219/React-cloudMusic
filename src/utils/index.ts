export function getCount(count: number) {
    if (count < 0) return
    if (count < 10000) return count
    else if (Math.floor(count / 10000) < 10000) return Math.floor(count / 10000) + '万'
    else
        return Math.floor(count / 10000 / 10000) + '亿'
}
export function debounce(func?: () => void, delay: number) {
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