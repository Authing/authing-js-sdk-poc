const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'development',
  entry: resolve("src/index.js"),
  output: {
    filename: "[name].js",
    path: resolve("dist/")
  },
  devServer: {
    host: 'localhost',
    port: 3001,
    inline: false,
    progress: true,
    contentBase: resolve("./"),
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    openPage: '../',
    proxy: {
      '/': {
        target: 'localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  devtool: false,
  resolve: {
    alias: {
      "@": resolve("src"),
      static: resolve("static"),
    },
    extensions: [".js", ".jsx", ".css", ".less", ".ts", ".tsx", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      },
      inlineSource: ".(main).*.(js)",
    })
  ]
}