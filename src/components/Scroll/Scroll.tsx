import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle, useMemo } from "react";
import "./Scroll.scss"
import { debounce } from "../../utils";
import BetterScroll from 'better-scroll';
import Loading from '../Loading/Loading'
import Loadingv2 from '../Loadingv2/Loading'

interface Props {
    children: React.ReactNode;
    direction?: 'vertical' | 'horizental',// 滚动的方向
    click?: boolean,// 是否支持点击
    refresh?: boolean,// 是否刷新
    onScroll?: (pos: { x: number, y: number }) => void,// 滑动触发的回调函数
    pullUp?: () => void,// 上拉加载逻辑
    pullDown?: () => void,// 下拉加载逻辑
    pullUpLoading?: boolean,// 是否显示上拉 loading 动画
    pullDownLoading?: boolean,// 是否显示下拉 loading 动画
    bounceTop?: boolean,// 是否支持向上吸顶
    bounceBottom?: boolean// 是否支持向下吸底
}
// const BlankProps = {
//     direction: "vertical",
//     click: true,
//     refresh: true,
//     onScroll: null,
//     pullUpLoading: false,
//     pullDownLoading: false,
//     pullUp: null,
//     pullDown: null,
//     bounceTop: true,
//     bounceBottom: true
// }

const Scroll = forwardRef((props: Props, ref: any): JSX.Element => {
    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll } = props;
    // 防抖处理
    const debouncePullUp = useMemo(() => {
        return debounce(pullUp, 300);
    }, [pullUp])
    const debouncePullDown = useMemo(() => {
        return debounce(pullDown, 300);
    }, [pullDown])
    //better-scroll 实例对象
    const [bScroll, setBScroll] = useState<any>();
    //current 指向初始化 bs 实例需要的 DOM 元素 
    const scrollContaninerRef = useRef();
    // init BetterScroll
    useEffect(() => {
        let scroll = new BetterScroll(scrollContaninerRef.current, {
            scrollX: direction === 'horizental',// When set to true, horizontal scrolling would be enabled
            scrollY: direction === 'vertical',
            // The probeType is:
            // 0, scroll event will not be dispatched at any time，
            // 1, and only when the finger is moving on the scroll area, a scroll event is dispatched every momentumLimitTime milliseconds.
            // 2, and only when the finger is moving on the scroll area, a scroll event is dispatched all the time.
            // 3, scroll events are dispatched at any time, including invoking scrollTo or triggering momentum
            probeType: 3,
            //To override the native scrolling BetterScroll has to inhibit some default browser behaviors,
            //such as mouse clicks.If you want your application to respond to the click event
            //you have to explicitly set this option to true.And then BetterScroll will add a private attribute 
            //called _constructed to the dispatched event whose value is true
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            },
            mouseWheel: true
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])
    // if refresh ,Scroll must be refreshed
    useEffect(() => {
        if (refresh && bScroll) {
            bScroll.refresh();
        }
    });
    // bounding scroll event
    useEffect(() => {
        if (!onScroll || !bScroll) return
        bScroll.on('scroll', (pos: { x: number, y: number }) => {
            // Better Scroll：这里只要手指松开 即使继续滚动也不会触发
            onScroll(pos)
        })
        bScroll.on('mousewheelMove', onScroll)
        return () => {
            bScroll.off('scroll')
            bScroll.on('mousewheelMove')
        }
    }, [onScroll, bScroll])
    // scrollUp
    useEffect(() => {
        if (!bScroll || !debouncePullUp) return
        bScroll.on('scrollEnd', () => {
            if (Math.abs(bScroll.maxScrollY - bScroll.y) < 100) debouncePullUp()
        })
        return () => {
            bScroll.off('scrollEnd')
        }
    }, [bScroll, debouncePullUp])
    // on down using 'touchEnd' because I want to get position 
    // when I loosen my fingers instead of scroll animation ends
    useEffect(() => {
        if (!bScroll || !debouncePullDown) return
        bScroll.on('touchEnd', (pos: { x: number, y: number }) => {
            if (pos.y > 50) {
                debouncePullDown()
            }
        })
        return () => {
            bScroll.off('touchEnd')
        }
    }, [bScroll, debouncePullDown])
    // use with forWardRef
    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh()
                bScroll.scrollTo(0, 0)
            }
        },
        getBscroll() {
            if (bScroll) return bScroll
        }
    }))
    return (
        <div ref={scrollContaninerRef} className='scroll'>
            {pullDownLoading ? <Loadingv2 /> : null}
            {props.children}
            {pullUpLoading ? <Loading /> : null}
        </div>
    )
})
Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: () => { },
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: () => { },
    pullDown: () => { },
    bounceTop: true,
    bounceBottom: true
};
export default React.memo(Scroll)