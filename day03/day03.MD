# 过度和动画

## vue 动画的理解

- 操作 css 的 trasition 或 animation
  vue 会给目标元素添加/移除特定的 class

## 基本过渡动画的编码

- 在目标元素外包裹<transition name="xxx">
- 定义 class 样式
  - 指定过渡样式: transition
  - 指定隐藏时的样式: opacity/其它

## 过渡的类名

- xxx-enter-active: 指定显示的 transition
- xxx-leave-active: 指定隐藏的 transition
- xxx-enter: 指定隐藏时的样式

# 过滤器

## 理解过滤器

- 功能: 对要显示的数据进行特定格式化后再显示
- 注意: 并没有改变原本的数据, 可是产生新的对应的数据

## 编码

- 定义过滤器

```vue
Vue.filter(filterName, function(value[,arg1,arg2,...]){ return newValue });
```

## 使用过滤器

```html
<div>{{myData | filterName}}</div>
<div>{{myData | filterName(arg)}}</div>
```

## 对时间进行格式化的函数库

- moment
- dayjs
  - `<script src="https://cdn.bootcss.com/dayjs/1.8.24/dayjs.min.js"></script>`
- date-fns

# 指令

## 常用内置指令

- v-text 内部找到元素，调用 元素.textContent= ''一定会当做纯文本解析

- v-html 内部找到元素，调用 元素.innerHTML = ''一定会当做 HTML 解析

```
  v-text : 更新元素的 textContent
  v-html : 更新元素的 innerHTML
  v-once: 只渲染一次，后面更新都不会再重新渲染（性能优化~）
  v-if : 如果为true, 当前标签才会输出到页面
  v-else: 如果为false, 当前标签才会输出到页面
  v-show : 通过控制display样式来控制显示/隐藏
  v-for : 遍历数组/对象
  v-on : 绑定持久事件监听, 一般简写为@
  v-bind : 强制绑定解析表达式, 一般简写为:
  v-model : 双向数据绑定

```

## 常用属性

- ref : 为某个元素注册一个唯一标识, vue 对象通过\$refs 属性访问这个元素对象
  - 作用：能获取 DOM 元素
  - 注意：一般能不用就不用，vue 不建议直接操作 DOM, 性能优化

## 注册全局指令

```js
//1.注册全局指令
Vue.directive("my-directive", function (el, binding) {
  el.innerHTML = binding.value.toupperCase();
});
```

## 注册局部指令

```js
//注册局部指令
  directives : {
    'my-directive' : {
        bind (el, binding) {
          el.innerHTML = binding.value.toupperCase()
        }
    }
  }
```

## 使用指令

```js
//使用指令
v - my - directive = "xxx";
```

## 为什么组件中的 data 必须是函数形式？

```
Vue解析组件标签时，会找到组件的构造函数，创建组件实例对象，根据实例对象的内容进行显示
有三个组件标签，就会创建三个组件实例对象.
此时，如果data使用的是对象形式，那么创建组件实例对象，进行数据代理，
三个组件实例对象代理的data数据是同一个对象。那么只要有一个变化，全都变（不OK）
每个组件应该要单独使用自己的数据。所以data要使用函数。
 那么创建组件实例对象，进行数据代理，会调用data函数得到新data对象从而进行数据代理
 每一个组件实例对象得到的是新的对象，互不影响
总结：
    定义组件: 组件构造函数 Vue.extend(options/配置对象)
    注册组件: Vue.component(组件名称, 组件构造函数)
    定义并注册组件: Vue.component(组件名称, options/配置对象)
    options/配置对象 data、methods、computed、watch、filters、directives、template
    使用组件: 以标签组件使用 <xxx></xxx>
    当你使用组件标签时，内部会找到组件的构造函数，创建组件实例对象
```

# webpake

- webpack 的配置文件

  - 所有 JS 构建工具都是基于 NODEJS 工作的，所以模块化默认使用 commonjs 使用 commonjs 模块化语法向外暴露一个配置对象（属性名固定的对象）,里面配置不能写错，一旦写错单词就会报错（代码写完检查一遍~）

- 开发环境：让代码在内存中编译运行即可，没有输出文件到本地
- 生产环境：输出打包后的资源文件到本地

## webpack.config.js

```js
 1. 处理js资源
    babel 一个 JavaScript 编译器
    可以将ES6以上语法编译成ES5以下语法~，作用用来做JS兼容性处理

    - 下载依赖包（loader只需要下载不需要引入）
      npm i babel-loader @babel/core @babel/preset-env -D
    - 配置loader
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: [resolve('src')],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [],
          },
        },
      },

  2. 处理css资源
      - 下载依赖包（loader只需要下载不需要引入）
        npm i style-loader css-loader -D
      - 配置loader
        {
          test: /\.css$/,
          include: [resolve("src")],
          use: [
            "style-loader",
            "css-loader",
          ],
        },

  3. 处理图片资源
      - 下载依赖包（loader只需要下载不需要引入）
        npm i url-loader file-loader -D
      - 配置loader
        {
          test: /\.(png|gif|jpe?g|webp)$/,
          include: [resolve("src")],
          use: {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              name: "static/media/[hash:10].[ext]",
            },
          },
        },

  4. 处理html资源
  5. 处理其他资源（字体图标~）
  6. 自动化
```
