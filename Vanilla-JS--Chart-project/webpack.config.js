const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: "./src/scss/variables.scss"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: ["handlebars-loader"]
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          publicPath: "/"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("build"),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/html/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new SpriteLoaderPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    stats: "errors-only",
    clientLogLevel: "warning",
    compress: true,
    port: 9002
  }
};
