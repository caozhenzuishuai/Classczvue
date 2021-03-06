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
            presets: ["@babel/preset-env"],
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
  },
  devtool: "cheap-module-source-map", //开发环境
  // devtool: "source-map", //生产环境
};
