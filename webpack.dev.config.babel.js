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
  mode: 'development',
  entry: {
    app: ["@babel/polyfill", path.resolve(__dirname, './example/app.js')],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: `static/js/[name].js`,
    chunkFilename: `static/js/[name].chunk.js`
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://api.jd.com',
  //       secure: false,
  //       changeOrigin: true
  //     }
  //   }
  // },
  resolve: {
    alias: {
      'react/lib/Object.assign': 'object-assign'
    },
    extensions: ['.web.js', '.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.less']
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader?cacheDirectory',
        },
        {
          loader: 'ts-loader'
        }
      ]
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader?cacheDirectory',
    },
    {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
      },{
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, './src/web/css/common.scss'),
          ]
        }
      }],
      exclude: /.m.scss$/
    },
    {
      test: /\.m.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          modules: true
        }
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader"
      },{
        loader: 'style-resources-loader',
        options: {
          patterns: [
            path.resolve(__dirname, './src/web/css/common.scss'),
          ]
        }
      }]
    },
    {
      test: /\.less$/,
      use: [{
        loader: "style-loader"
      },{
        loader: 'css-loader'
      }, 'postcss-loader', {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
      }
      }],
      exclude: /.m.less$/
    },
    {
      test: /\.m.less$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          // localIdentName: '[name]__[local]-[hash:base64:5]'
        }
      }, 'postcss-loader', {
        loader: "less-loader",
            options: {
                javascriptEnabled: true
            }
      }]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.(jpe?g|png|gif|ico)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: '/images/[hash:8][name].[ext]'
        }
      }]
    },
    {
      test: /\.(svg)$/i,
      loader: 'svg-sprite-loader',
      include: [
        path.resolve(__dirname, 'src/app/images')
      ]
    },
    {
      test: /\.(woff2?|eot|ttf|otf|svg|ttc)(\?.*)?$/,
      exclude: [
        path.resolve(__dirname, 'src/app/images')
      ],
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: '/images/[hash:8][name].[ext]'
        }
      }]
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.template.html',
      templateParameters: {
        path: './example/src/vendor',
      },
      inject: true,
      chunks: ['app'],
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          pxToRem({
            rootValue: 100,
            propWhiteList: [],
            mediaQuery: true
          })
        ]
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      __ENV: (isProd || isTest) ? "'pro'" : "'dev'",
      __HOST: (isProd || isTest) ? "''" : "'http://localhost:3000/'",
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? 'production' : 'development')
      }
    }),
    new CopyWebpackPlugin([
      { from: './src/vendor/**', to: isProd ? path.join(__dirname, './dist/static/js/[name].[ext]') : path.join(__dirname, './dist/static/js/[name].[ext]') },
  
    ]),
    new MiniCssExtractPlugin({
      filename: !isProd ? `static/css/[name].css` : `static/css/[name].[hash].css`,
      chunkFilename: !isProd ? `static/css/[id].css` : `static/css/[id].[hash].css`,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
  ],
  devtool: 'source-map'
});