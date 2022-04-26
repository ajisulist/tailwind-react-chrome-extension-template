/* eslint-disable */
const webpack = require('webpack');
const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const manifest = require('./src/manifest.json');
function generatePageTitle(title) {
  return title ? `${title} - ${manifest.name}` : manifest.name;
}

const ASSET_PATH = process.env.ASSET_PATH || '/';

var fileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

const isDevelopment = process.env.NODE_ENV !== 'production';

const options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: path.join(__dirname, 'src/newtab'),
    options: path.join(__dirname, 'src/options'),
    popup: path.join(__dirname, 'src/popup'),
    background: path.join(__dirname, 'src/background'),
    content: path.join(__dirname, 'src/content'),
    devtools: path.join(__dirname, 'src/devtools'),
    panel: path.join(__dirname, 'src/panel'),
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['background', 'content', 'devtools'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
        },
      },
    ],
  },
  resolve: {
    extensions: fileExtensions.map(extension => '.' + extension).concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/content/content.styles.css',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/img/icon-128.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/img/icon-34.png',
          to: path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: generatePageTitle('New Tab'),
      template: 'public/index.html',
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,
      showErrors: true,
    }),
    new HtmlWebpackPlugin({
      title: generatePageTitle('Options'),
      template: 'public/index.html',
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
      showErrors: true,
    }),
    new HtmlWebpackPlugin({
      title: generatePageTitle('Popup'),
      template: 'public/index.html',
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
      showErrors: true,
    }),
    new HtmlWebpackPlugin({
      title: generatePageTitle('Devtools'),
      template: 'public/index.html',
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
      showErrors: true,
    }),
    new HtmlWebpackPlugin({
      title: generatePageTitle('Panel'),
      template: 'public/index.html',
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
      showErrors: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (isDevelopment) {
  options.devtool = 'cheap-module-source-map';
  options.plugins = [...options.plugins, new ReactRefreshWebpackPlugin()];
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
