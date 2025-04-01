const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // Добавляем плагин

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  // Добавляем секцию resolve.fallback
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "vm": require.resolve("vm-browserify"),
      "fs": false, // отключаем fs, так как он не нужен в браузере
      "tty": require.resolve("tty-browserify")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new NodePolyfillPlugin() // Добавляем плагин в секцию plugins
  ],
  devServer: {
    static: './dist',
  },
};