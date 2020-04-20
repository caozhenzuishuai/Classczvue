# 1.class 与 style 的绑定

- 理解

  - 在应用界面中，某些个元素的样式是变化的
  - class/style 绑定就是专门用来实现动态样式效果的技术

- class 绑定: `:class='xxx'`
  - xxx 是字符串/对象/数组
- style 绑定
  - `:style="{color:Color , fontSize:fontsize+'px'}"`
  - 其中 Color/fontsize 是 data 属性

## 2.条件渲染指令

- 条件渲染指令
  - v-if
  - v-else
  - v-show
- 比较 v-if 与 v-show
  - 如果需要频繁切换 v-show 较好
- v-if 和 v-else 是一体的，配合使用
  - 当 v-if 是 true 时，就会显示，而 v-else 隐藏
  - v-if 是 false 是，就会隐藏 v-else 显示
- 当属性值是 true 时，往往可以省略不写
- v-if 和 v-show 的区别
  - 作用：都能实现 DOM 元素切换显示
    - v-if 在内存中干掉标签对象来实现隐藏，重新显示时会重新创建
    - v-show 通过样式 display 来控制显示和隐藏的，显示标签没有样式，隐藏标签会加上 display: none
      DOM 树种所有 DOM 元素都有，只是隐藏的 DOM 元素有一个隐藏样式而已
- 如果要频繁切换样式显示要用那个？
  - v-show 性能好，
    - 因为 v-if 要进行更多 DOM 操作：删除 DOM 元素，重新创建新的 DOM 元素
      而 v-show 只要切换 style 样式即可

## 3.列表渲染

- 列表显示
  - 数组: v-for / index
  - 对象: v-for / key
- 列表的更新显示
  - 删除 item
  - 替换 item
- 数据动态展示
  - 特别注意：遍历的每一项元素需要有一个唯一的 key 属性：值有 id 用 id，没有 id 考虑使用 index

## 4.事件处理

- 绑定监听:
  - v-on:xxx="fun"
  - @xxx="fun"
  - @xxx="fun(参数)"
  - 默认事件形参: event
  - 隐含属性对象: \$event
- 事件修饰符:
  - .prevent : 阻止事件的默认行为 event.preventDefault()
  - .stop : 停止事件冒泡 event.stopPropagation()
- 按键修饰符
  - .keycode : 操作的是某个 keycode 值的健
  - .enter : 操作的是 enter 键

## 5。vue 实例生命周期

- vue 对象的生命周期
- 初始化显示
  - beforeCreate()
  - created()
  - beforeMount()
  - mounted()
- 更新状态
  - beforeUpdate()
  - updated()
- 销毁 vue 实例: vm.\$destory()
  - beforeDestory()
  - destoryed()
- 常用的生命周期方法
  - created()/mounted(): 发送 ajax 请求, 启动定时器等异步任务
  - beforeDestory(): 做收尾工作, 如: 清除定时器
