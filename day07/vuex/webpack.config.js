const path = require("path");
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");
/**
 * 封装一个处理绝对路径的方法
 * @param {String} relative 相对路径
 * @return {String} 基于项目根目录的绝对路径
 */

function resolve(relative) {
  return path.resolve(__dirname, relative);
}
module.exports = {
  //入口文件
  entry: "./src/index.js",
  //输出地址
  output: {
    path: undefined, //输出的目录
    filename: "built.js", //文件名
  },
  //加载器
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/, //正则判断对那些文件生效
        include: [resolve("src")],
        use: {
          loader: "babel-loader",
          options: {
            //配置对象
            presets: [
              // 预设，babel要干什么活
              [
                "@babel/preset-env",
                {
                  // 配置按需加载
                  useBuiltIns: "usage",
                  corejs: { version: 3 },
                  targets: {
                    // 兼容性
                    ie: 9,
                    chrome: 60,
                    firefox: 50,
                    edge: 17,
                    safari: 11,
                  },
                },
              ],
            ],
            plugins: [], //插件
          },
        },
      },
      {
        test: /\.css$/,
        include: [resolve("src")],
        use: [
          //"style-loader",
          "vue-style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|gif|jpe?g|webp)$/,
        include: [resolve("src")],
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            name: "static/media/[hash:10].[ext]",
            esModule: false,
          },
        },
      },
      {
        exclude: [
          /\.js$/,
          /\.css$/,
          /\.html$/,
          /\.(png|gif|jpe?g|webp)$/,
          /\.vue$/,
        ],
        use: {
          loader: "file-loader",
          options: {
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("public/index.html"),
    }),
    new VueLoaderPlugin(),
    new CopyPlugin([
      {
        from: resolve("public"),
        to: resolve("dist"),
        ignore: ["index.html"],
      },
    ]),
  ],
  //模式
  mode: "development",
  devServer: {
    contentBase: resolve("dist"),
    port: 9527,
    host: "localhost",
    compress: true,
    open: true,
    hot: true,
    quiet: true,
    clientLogLevel: "none",

    //启用代理服务器
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
  devtool: "cheap-module-source-map", //开发环境
  // devtool: "source-map", //生产环境
  resolve: {
    // 帮助webpack解析模块（打包的资源）
    alias: {
      // 配置文件路径别名
      // 当你路径写 vue 实际上代表的路径 vue/dist/vue.esm.js
      // 'vue$': "vue/dist/vue.esm.js",
      "@": resolve("src"),
      "@comps": resolve("src/components"),
    },
    // 自动补全文件扩展名
    extensions: [".js", ".vue", ".json"],
  },
};
