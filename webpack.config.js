const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry: { app: "./src/client/index.js" },
  mode: "development",
  output: {
    path: __dirname + "/dist/client",
    publicPath: "/",
    filename: "[name].js"
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerHost: "0.0.0.0"
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html"
    })
  ]
};
