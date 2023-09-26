const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);

    const entry = path.join(fullDir, 'app.ts');
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry;
    }
    return entries;
  }, {}),

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: 'tslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  devServer: {
    // // static: {
    // //   directory: path.resolve(__dirname, 'app'),
    // // },
    // open: true,
    // proxy: {
    //   '/api/': {
    //     target: 'http://localhost:3000',
    //     ws: true,
    //     changOrigin: true,
    //   },
    // },

    compress: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      // 匹配api前缀时，则代理到3000端口
      // 即http://localhost:8080/api/123 = http://localhost:3000/api/123
      // 注意:这里是把当前server8080代理到3001，而不是任意端口的api代理到3000
      '/api': 'http://localhost:3000',
      // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
      // 主要解决跨域问题
      changeOrigin: true,
      // 针对代理https
      secure: false,
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Shape Tracker',
      template: './index.html',
      inject: 'body',
    }),
  ],
};
