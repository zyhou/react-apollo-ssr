const webpack = require("webpack");
const merge = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  entry: ["webpack-hot-middleware/client"],
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerHost: "0.0.0.0"
    })
  ]
});
