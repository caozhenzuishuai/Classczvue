# day05

## 父组件如何向子组件传递数据

- props（标签属性）：通过标签属性方式传递数据
  - 特点：props 是父组件传递数据给子组件，子组件只能读取使用，不应该直接修改
- 父组件定义 data 数据 `{comments: [{}, {}]}`
- 父组件给子组件指定标签属性：`<CommentList :comments="comments" />`
- 子组件声明接受标签属性（声明接受之后，子组件实例对象就直接拥有这个属性）
- 子组件声明接受标签属性方式：

  - 数组形式
    props: ['prop1', 'prop2']
  - 对象形式
    props: {
    prop1: Object,
    prop2: Array,
    }

    props: {
    prop1: {
    type: Number, // 类型是 Number
    default: 0, // 默认值为 0
    required: true, // 必须要传的属性（必要的）
    validator: function (value) { // 校验函数
    return value >= 0 // 值必须大于 0
    }
    }
    }

- 组件关于数据的 2 个重要问题

  - 数据定义在哪个组件
    - 如果数据只有一个组件使用，就定义在这个组件内容
    - 如果数据由多个组件使用，就定义在多个组件的公共父组件中
  - 更新数据的方法定义在哪个组件？
    - 数据源在哪里，更新数据方法就定义在哪

- 父组件给子组件传递数据
  - 函数
    - 例子：addComment/Function delComment/Function
    - 作用：子组件调用函数修改父组件数据（子组件传递数据给父组件 子 --> 父）
  - 非函数
    - 例子：comments/Array comment/Object
    - 作用：父组件传递子组件直接显示使用（父组件传递数据给子组件 父 --> 子）
    - 注意：子组件不应该直接修改数据，应该通过调用父组件的方法来修改

## 定义函数的几个事项

- 要不要定义形参：看函数内部有没有值是不确定的。
  - 如果有不确定的值，就需要定义，由外面传入
  - 如果没有，就不需要定义

## mouseenter/mouseleave || mouseover/mouseout（通常用法）

- 进入元素触发 mouseover 离开元素触发 mouseout
  和子元素无关
- mouseover/mouseout
  进入元素触发 mouseover 离开元素触发 mouseout
  如果进入子元素，会触发父元素 mouseout / 子元素 mouseover
  问题：导致事件触发 n 次

## 浏览器本地存储方案

- Web Strorage 浏览器本地离线存储方案：用来存储大量数据（4mb）
  - localStorage 持久化存储（一直都有）
  - sessionStorage 会话存储（打开浏览器访问网页：开始会话，关闭浏览器: 结束会话）
  - 当浏览器没有关闭，存储不会消失，但是一旦关闭浏览器，存储会自动销毁
  - xxxStorage.setItem(key, value) 存储数据(注意：value 必须是字符串类型)
  - xxxStorage.getItem(key) 读取数据
  - xxxStorage.removeItem(key) 删除单个数据
  - xxxStorage.clear() 删除全部数据
