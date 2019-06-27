var webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  
const config = require('./webpack.config.babel');
const merge = require('webpack-merge');

const isProd = process.env.NODE_ENV == 'production';
const isTest = process.env.NODE_ENV == 'test';
const pxToRem = require('postcss-pxtorem');

module.exports = merge(config, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'react-hookstore.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hookStore',
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          minChunks: 2,
        },
        default: {
          name: 'common',
          priority: -20,
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new UglifyJSPlugin({
      exclude: /node_modules/,
      sourceMap: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
});
