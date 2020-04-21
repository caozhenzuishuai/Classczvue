const path = require("path");
/**
 * 封装一个处理绝对路径的方法
 * @param {String} relative 相对路径
 * @return {String} 基于项目根目录的绝对路径
 */
function resolve(resolve) {
  return path.relative(__dirname, relative);
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
        include: [Response("src")],
        use: ["style-loader", "css-loader"],
      },
      {
        test: / \.(png|gif|jpeg|webp|)$/,
        include: [resolve("src")],
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            name: "static/media/[hash:10].[ext]",
          },
        },
      },
    ],
  },
  plugins: [],
  //模式
  mode: "development",
};
