# day06

## 自定义事件

1. 原生 DOM 事件

- 绑定事件监听
  - 事件名称(事件名是固定，有限的 n 个事件名)
  - 事件回调函数

```js
document.body.onclick = function (event) {};
```

- 触发事件/分发事件

  - 当用户做了某些操作（点击按钮，移动鼠标...），浏览器会自动触发事件
  - 数据：event 对象

## Vue 的自定义事件

- 绑定事件监听
  - 事件名称(事件名是任意的。通常不会和原生 DOM 事件一致)
  - 事件回调函数

```js
<MyComponent @my-event="callback" />
<MyComponent @xxx="callback" />
```

- 触发事件/分发事件
  - 手动触发：`this.$emit(事件名称[, 事件参数1, 事件参数2...])`
    - `this.$emit(eventName[, arg1, arg2...])`
    - []代表可选值（可传可不传）
  - 数据：arg1, arg2...

1. 总结自定义事件

- 绑定事件方式

```js
// 方式一
<MyComponent @my-event="callback" />

// 方式二
<MyComponent ref="xxx" />

mounted() {
  this.$refs.xxx.$on('my-event', callback);
}
```

- 触发事件方式: `this.$emit(eventName[, arg1, arg2...])`

- API

  - `this.$on(eventName, callback)` 绑定持久事件
  - `this.$once(eventName, callback)` 绑定一次性事件
  - `this.$off(eventName, callback)` 解绑事件
  - `this.$emit(eventName[, arg1, arg2...])` 触发事件

- 注意：绑定自定义事件的组件对象 A，那么触发事件组件对象也必须是 A，其他组件不能触发（哪个组件绑定事件，只有这个组件可以触发，其他组件触发不了）
- 作用：用于子组件向父组件通信

## 3. 全局事件总线 Event Bus

- 原理：基于自定义事件，解决自定义事件痛点
- 自定义事件痛点：哪个组件绑定事件，只有这个组件可以触发，其他组件触发不了
  - 导致结果只能实现子组件向父组件通信
- 目的：实现所有组件任意通信
- 解决：给任意组件绑定事件，能由任意组件触发事件

- 全局事件总线 / 全局事件对象
  - `$globalEventBus` 用来统一绑定事件或者触发事件的对象
- 作用：可以用来实现任意组件通信
  - 通常用于：兄弟/祖孙 （一般父子组件用 props 最方便）

## 4. 消息订阅发布机制

- API

  - 发布消息 PubSub.publish(msg, data);
  - 订阅消息 PubSub.subscribe(msg, callback);
  - 取消订阅消息 PubSub.unsubscribe(msg);

- 注意

  - 订阅消息只要做一次，通常在 created 中完成
  - 发布消息可以多次

- 适用于 祖孙/兄弟 通信

## 5. 插槽

- 作用：父组件向子组件传递标签数据
- 默认插槽

  - 父组件定义标签数据

  ```vue
  <Child>
    <template>xxx</template>
  </Child>
  ```

  - 子组件接受使用

  ```vue
  <slot></slot>
  ```

- 问题：多个标签只能渲染到一个位置，不能选择多个渲染位置
- 适用于只有一个标签数据

- 具名/命名插槽

  - 父组件定义标签数据

  ```vue
  <Child>
    <template v-slot:title>xxx</template>
    <template #title>xxx</template>
  </Child>
  ```

  - 子组件接受使用

  ```vue
  <slot name="title"></slot>
  ```

- 问题：不能获取子组件数据渲染
- 适用于有多个标签数据

- 作用域插槽

  - 父组件声明接受数据

  ```vue
  <Child>
    <template #title="data">{{data.perons}}</template>
    <template #title="{ persons }">{{persons}}</template>
  </Child>
  ```

  - 子组件传递数据

  ```vue
  <slot name="title" :persons="person"></slot>
  ```

- 适用于有多个标签数据，并且要接受子组件数据渲染

## 总结组件间通信

- props
  - 子 --> 父
  - 父 --> 子
- 自定义事件
  - 子 --> 父
- 全局事件总线
  - 祖孙
  - 兄弟
- 消息订阅发布
  - 祖孙
  - 兄弟
- 插槽
  - 父 --> 子
  - 传递标签数据
- vuex（后面讲）
