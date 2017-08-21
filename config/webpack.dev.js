var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:3000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
     {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            useRelativePath: false
          }
        }
      ]}
    ]
  },

  plugins: [
    new ExtractTextPlugin({filename: '[name].css', disable: true})
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
