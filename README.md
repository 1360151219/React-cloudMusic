# React Hooks 与 Immutable 数据流实战 by 神三元

使用 Typescript 以及新 Hook 进行学习编写。

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

### Section 15: react-transition-group 动画库

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

### Section 15：退出详情页后路由跳转问题

这里如果在`handleBack`中直接调用`navigate(-1)`，则当前组件被立即卸载就不会有动画了。因此要去使用 react-transition-group 库内置的`onExit`钩子。
