# React Hooks 与 Immutable 数据流实战 by 神三元

使用 Typescript 以及新 Hook 进行学习编写。有一些地方添加了个人的爱好逻辑吧~

## basic-tutorial 分支

按照 tutorial 的步骤实现的一个基础版

## master/my-innovation 分支

- ✅ 使用 Redux Toolkit 代替 Redux 和 immutable
- ✅ 使用 typescript：初始化 RootState、useAppSelector、useAppDispatch 等等。。
-

## 技术栈学习以及问题

### immutable 库

### swiper 轮播组件

### Redux

经典用法：

**全局 Store**

```js
// reducer：全局reducer
import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../pages/Recommend/store";
import { reducer as singersReducer } from "../pages/Singers/store";
export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
});
// store
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
```

**全局注入**

```js
<React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
    </Router>
  </Provider>
</React.StrictMode>
```

**组件连接**

- 局部 reducer
- 局部 action types
- action creator

```js
// example.
export const changePageCount = (data: number) => {
  return {
    type: actionTypes.CHANGE_LOADING,
    data,
  };
};
export const getloading = () => {
  return (dispatch) => {
    dispatch(changeLoading(false));
  };
};
```

**连接组件**

```js
//example
const mapStateToProps = (state) => ({
  loading: state.getIn(["rank", "loading"]),
  rankList: state.getIn(["rank", "rankList"]),
});
const mapDispatchToProps = (dispatch) => ({
  getRankListDispatch() {
    dispatch(changeLoading(true));
    dispatch(getRankList());
  },
});
// 将 Store state 以及 dispatchFun 注入到组件里
connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
```

### react-lazyload

### 学会了 CSS 技巧啊~~~

- 设置`top`、`bottom`、`left`、`right`四个属性来设置全屏或者扩大区域等。

- `animation-play-state` 控制动画的停止开始

### Section 24: create-keyframe-animation 帧动画插件

### Better Scroll 监听 scroll 事件却不会触发？✅

**Why does my BetterScroll listen for the scroll hook and the listener doesn't execute?**

BetterScroll uses the probeType configuration item to decide whether to dispatch the scroll hook because there is some performance penalty. When the probeType is 2, the event will be dispatched in real time. When the probeType is 3, the event will be dispatched during the momentum animation. The recommended setting is 3.

即 probeType 为 3 之后，滚动动画实时触发

### Better Scroll 无法滚动? ✅

Better Scroll 滚动的原理是通过 transform 动画来做的。因此需要满足以下两个要素：

- Scroll 外部的包裹元素宽度要固定
- Scroll 内部内容元素宽度要大于容器宽度

> " BetterScroll 实现横向滚动，对 CSS 是比较苛刻的。首先你要保证 wrapper 不换行，并且 content 的 display 是 inline-block"。横向滚动 ScrollContainer 加上 “ white-space nowrap”，所有子元素改成 “display: inline-block”，即可。

### 遇到一个问题：`useEffect`传入空依赖仍然被触发 2 次？✅

找了半天的 BUG，最后发现是由于 React 的严格模式`React.StrictMode`的原因。

`React.StrictMode`目前有以下作用：

- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API
- 检测不安全的副作用

其中，严格模式不能自动检测到你的副作用，但它可以帮助你发现它们，使它们更具确定性。通过故意**重复调用**以下函数来实现的该操作：

- class 组件的 constructor，render 以及 shouldComponentUpdate 方法
- class 组件的生命周期方法 getDerivedStateFromProps
- 函数组件体
- 状态更新函数 (即 setState 的第一个参数）
- 函数组件通过使用 useState，useMemo 或者 useReducer

> 这只在生产环境下才会起作用。

### Section 10 中，不需要给 content 手动计算宽度 ✅

直接使用`width:max-content`即可。具体属性的介绍见 https://blog.csdn.net/qq_21522331/article/details/108011206

### Section 12 完成后，思考题：路由跳转数据缓存 ✅

在进行路由跳转后，`category`、`alpha`、`initial`以及`singerList`属性都会重置。有什么办法可以缓存呢？？

1. `getHotSingerDispatch()`方法会先将`singerList`置空，因此要限制它的触发

```js
useEffect(() => {
  // 修复再次渲染Singers的时候导致数据重新刷新的问题
  if (singerList.size > 0) return;
  getHotSingerDispatch();
}, []);
```

2. `category`、`alpha`、`initial`这三个属性我也把他们放进 redux 中，这样组件切换后属性也不会被改变

---

第二种方法：在 Section 13 中使用`useReducer`以及`useContext`来实现一个简单的模拟 redux

### Section 12/13 完成后，当一直加载数据到没有新数据之后，上拉还是会触发请求。 ✅

根据网易云 api 返回的`more`属性，在 redux 中存储一个`nomore`状态来规定是否发请求。

### Section 14 使用`justify-content:space-between`引起的问题 ✅

值得注意的是，当 flex 布局一行填满三个元素，但是最后一行只有两个元素的时候，会出现一些问题，你会发现最后一个元素并不是在居中的位置，而是在最右边，中间留出了空白

使用**伪元素**解决（占位）

### Section 15: react-transition-group 动画库 ✅

现在的类名如下：

```css
.fade-appear,
.fade-appear-active,
.fade-appear-done,
//
.fade-enter,
.fade-enter-active,
.fade-enter-done,
//
.fade-exit,
.fade-exit-active,
.fade-exit-done,;
```

- `CSSTransition`动画 class 只添加在其第一个子元素上。

下面是一个例子：

```css
&.drop-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
&.drop-enter-active {
  opacity: 1;
  transition: all 0.3s;
  transform: translate3d(0, 0, 0);
}
&.drop-exit-active {
  opacity: 0;
  transition: all 0.3s;
  transform: translate3d(0, 100%, 0);
}
```

### Section 15：退出详情页后路由跳转问题

这里如果在`handleBack`中直接调用`navigate(-1)`，则当前组件被立即卸载就不会有动画了。因此要去使用 react-transition-group 库内置的`onExit`钩子。

### Section 16: `<marquee>` 标签被弃用

### Section 17: `currentAlbum.creator.avatarUrl` 在初始化时报错 ✅

当页面进入 Ajax 请求还没有获取数据时，currentAlbum 的值为初始态 {}。直到数据异步加载完成，currentAlbum 才会改变，那么在这个过程中，通过 currentAlbum.creator 为 undefined，通过 current.creator.avatarUrl 取值自然会报错。

解决方法很简单，只要当前 currentAlbum 为空，则不渲染 Scroll 组件

### Section 20：函数组件中定义的渲染 jsx 函数，写成组件形式会有 bug，？

位置`Singers.tsx:line 31`.

推测：如果写成组件形式，因为没有 React.memo 包裹，每次 props 传入的数组更新的时候，组件都会被渲染一次，因此 Scroll 会一直重置。写成函数形式，就没有这个问题了。

### 获取列表有多个 diapatch 同时进行，也会造成多次 setstate，组件多次 render，需要优化。是否可以合并成一个对象，一次执行 setstate？

### Section 20 中完成的 SongsList 组件可以在 Album 中复用

### Section 20 的遮罩：利用 z-index 和 position 进行位置控制 ✅

歌单列表其实是没有自己的背景的。Layer 起到一个背景的作用，因此它也要滚动

### Section 22：`useRef`除了操作 DOM 以外，还可以用来做数据保存。

使用`useState`会在每一次状态改变的时候都会重新渲染一下组件。如果我们想要数据缓存但同时不想要触发函数组件的更新，就可以使用`useRef()`

### Section 26：ReactDom `dangerouslySetInnerHTML`

### Section 26：`audio`在播放过程中不断触发`onTimeUpdate`事件

### Section 28: 切歌太频繁导致异常

解决的原理：其实从 audio 标签拿到 src 加载到能够播放之间有一个缓冲的过程，只有当控件能够播放时才能够切到下一首。如果在这个缓冲过程中切歌就会报错。

### Section 31: 歌曲暂停时点击切换歌词没有反应

因为暂停后 props 中的`curLineIndex`没有更新，组件不会重新渲染。
解决方法：使用`useState`去处理`isLyricShow`

### Section 31: 手动调整进度条后 curLineIndex 从 0 开始

```js
_findcurLineIndex(time: number): number {
        for (let i = 0; i < this.lines.length; i++) {
            const line = this.lines[i]
            if (time <= line.time) {// 这里原本是大于等于，这样的话因为lines是从小到大的，i永远返回0，因此出错
                return i
            }
        }
        return this.lines.length - 1
    }
```

### Section 31: 点击播放列表中的删除单曲的时候，`currentIndex`变成该单曲原来 index

原因：`handleDelete`方法触发后，同时事件冒泡触发了`selectItem`方法。

### Audio 元素的属性与方法总结

- `play()`、`parse()` 播放和暂停
- currentTime 当前播放时间
- src 歌曲源地址
- autoplay
- \*playbackRate 歌曲播放速度
- 事件 ：`onTimeUpdate` `onEnded` `onError`
- ....
