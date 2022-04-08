# React Hooks 与 Immutable 数据流实战 by 神三元

## 技术栈学习以及问题

### immutable 库

### Redux

### Better Scroll 监听 scroll 事件却不会触发？

**Why does my BetterScroll listen for the scroll hook and the listener doesn't execute?**

BetterScroll uses the probeType configuration item to decide whether to dispatch the scroll hook because there is some performance penalty. When the probeType is 2, the event will be dispatched in real time. When the probeType is 3, the event will be dispatched during the momentum animation. The recommended setting is 3.

即 probeType 为 3 之后，滚动动画实时触发

### 遇到一个问题：`useEffect`传入空依赖仍然被触发 2 次？

### react-lazyload
