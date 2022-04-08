# React Hooks 与 Immutable 数据流实战 by 神三元

使用 Typescript 以及新 Hook 进行学习编写。

## 技术栈学习以及问题

### immutable 库

### Redux

### Better Scroll 监听 scroll 事件却不会触发？✅

**Why does my BetterScroll listen for the scroll hook and the listener doesn't execute?**

BetterScroll uses the probeType configuration item to decide whether to dispatch the scroll hook because there is some performance penalty. When the probeType is 2, the event will be dispatched in real time. When the probeType is 3, the event will be dispatched during the momentum animation. The recommended setting is 3.

即 probeType 为 3 之后，滚动动画实时触发

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

### react-lazyload
