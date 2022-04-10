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