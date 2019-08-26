const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const UgilifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["babel-loader", "ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "UStorage.min.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "UStorage测试",
      filename: "index.html",
      template: "./index.html"
    }),
    new cleanWebpackPlugin()
  ]
};
