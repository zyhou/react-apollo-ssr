const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");

module.exports = {
  entry: ["./src/client/index.js"],
  output: {
    path: path.join(__dirname, "dist/assets/"),
    publicPath: "/assets/",
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
  plugins: [new CleanWebpackPlugin(), new LoadablePlugin()]
};
