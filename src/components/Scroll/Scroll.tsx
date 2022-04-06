import React, { useEffect, useState, useRef, forwardRef } from "react";
import "./Scroll.scss"
import { useNavigate } from "react-router-dom";
import BetterScroll from 'better-scroll'
interface Props {
    children: React.ReactNode;
    direction?: 'vertical' | 'horizental',// 滚动的方向
    click?: boolean,// 是否支持点击
    refresh?: boolean,// 是否刷新
    onScroll?: () => void,// 滑动触发的回调函数
    pullUp?: () => void,// 上拉加载逻辑
    pullDown?: () => void,// 下拉加载逻辑
    pullUpLoading?: boolean,// 是否显示上拉 loading 动画
    pullDownLoading?: boolean,// 是否显示下拉 loading 动画
    bounceTop?: boolean,// 是否支持向上吸顶
    bounceBottom?: boolean// 是否支持向下吸底
}
const BlankProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll: null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
}
const Scroll = forwardRef((props: Props, ref: any): JSX.Element => {
    props = Object.assign(BlankProps, props)
    const { direction, click, refresh, pullUpLoading, pullDownLoading, bounceTop, bounceBottom } = props;
    const { pullUp, pullDown, onScroll } = props;
    //better-scroll 实例对象
    const [bScroll, setBScroll] = useState();
    //current 指向初始化 bs 实例需要的 DOM 元素 
    const scrollContaninerRef = useRef(null);

    useEffect(() => {
        const scroll = new BetterScroll(scrollContaninerRef.current, {
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
                bottom: bounceBottom,
                top: bounceTop
            },
            mouseWheel: true
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])
    // useEffect(() => {
    //     if (refresh && bScroll) {
    //         bScroll.refresh();
    //     }
    // });
    // useEffect(() => {
    //     if (!bScroll || !onScroll) return;
    //     bScroll.on('scroll', (scroll) => {
    //         onScroll(scroll);
    //     })
    //     return () => {
    //         bScroll.off('scroll');
    //     }
    // }, [onScroll, bScroll]);
    return (
        <div ref={scrollContaninerRef} className='scroll'>
            {props.children}
        </div>
    )
})

export default React.memo(Scroll)