# 运行

yarn start

# MobX 介绍

怎么读？"[mʌ][bæ]X"（太难了），我更喜欢拆开读 M O B X。

[文档](https://mobx.js.org/README.html) [中文文档](https://zh.mobx.js.org/README.html) 

MobX6 较 MobX4&5 在使用上已经简化很多了。网上很多mobx4&5的文档旧用法，不要看，不要看，不要看。

关于 MobX(来自文档)

- 简单直接，操作数据就是操作 javascript。
- 轻松实现最优渲染。在需要的时候才更新。写下来无需额外优化手段。
- 架构自由。低耦合。

补充
- 低低低成本入门。
- 基于 proxy。
- UI、数据独立，各司其职，简单清晰。
- 只能在 store 改变数据。否则报错。

# 逐步深入使用 mobx

1 **定义**

定义组件 todo/index.js，使用 observer 包裹组件，响应数据变化。直接使用 todoStore 即可，observer 会自动收集需要响应那些数据变化。
定义 store todo/store.js，使用 makeAutoObservable 使 store 的数据可观察.

2 **收拢数据操作**

组件直接引入 store 即可直接操作数据。
同时 store 是纯粹的 js，哪里都可以改变 store，为了更利于维护，MobX 默认只能在 action 内改变数据（可以理解为 store 内改变数据）。

3 **衍生数据**

例子中搜索的数据不用特地维护一个新字段来存放，因为可以通过 search 和 data 衍生出来，使用 `get` er。
`makeAutoObservable` 会对 `get` er 自动使用 `computed`，类似 reselect，只有用到的值变化的时候 computed 值才会变化。

4 **异步**

获取异步数据，等数据回来设置下 data 即可。就像操作 js 一样。

5 **合并更新**

注意到 init 方法，会赋值 search data，两次赋值动作常规情况下会触发两次 render。
`makeAutoObservable` 会给方法自动加上 `action`，多次赋值只会触发一次 render。

6 **react 之外**

Mobx 架构自由，你可以在任意地方管理 store，可以任意搭配其他数据流或者组件 state。它是低耦合的。

# 使用

用的时候关注"定义"即可，简单理解就是三个东西
- observer(Component)
- makeAutoObservable(this, null, { autoBind: true })
- runInAction() 包裹下要修改数据的异步方法

就是这么简单，其他都是 react 和 js 的东西。

# 加深理解

什么时候用 MobX，什么时候用 state？

observer 怎么收集依赖？

store 用类定义？store 类可继承其他类么？

runInAction() 和 action() 的区别？

怎么转换成常规的 javascript ?

# 和 redux 比

MobX vs redux
- 学习成本低。 redux 概念太多，优化手段复杂。
- 架构自由。MobX 可任意搭配其他框架，而 redux 入侵了整个应用，换数据流成本大。
- react 内，react 外，哪里都可以使用 store
- 调用关系清晰可见。不像 redux 查问题需要通过漫长的搜索。
- 不用考虑性能优化，本身性能就杠杠的。你可以重新赋值个数组 or 单独改变数组某个数据，后者性能更佳，前者性能也不差。性能优化如此自然简单。
