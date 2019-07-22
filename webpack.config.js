const path = require("path");
const webpack = require("webpack");
const LoadablePlugin = require("@loadable/webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  entry: ["webpack-hot-middleware/client", "./src/client/index.js"],
  mode: "development",
  output: {
    publicPath: "/dist/",
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\/]node_modules[\/]/,
          name: "manifest",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new LoadablePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerHost: "0.0.0.0"
    })
  ]
};
