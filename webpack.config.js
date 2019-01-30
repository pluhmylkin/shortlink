const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = [
  {
    name: 'client',
    entry: ['babel-polyfill', path.join(__dirname, '/src/client')],
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'client.js',
      publicPath: '/public',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['transform-async-to-generator', 'transform-class-properties'],
                presets: ['env', 'react'],
                cacheDirectory: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.join(__dirname, './')]),
      new HtmlWebpackPlugin({
        title: 'Short links',
        template: 'index.thtml',
        hash: true,
      }),
    ],
  },
  {
    name: 'server',
    entry: ['babel-polyfill', path.join(__dirname, '/src/server/')],
    target: 'node',
    node: {
      __dirname: true,
    },
    output: {
      path: path.join(__dirname, './public'),
      filename: 'server.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['transform-async-to-generator', 'transform-class-properties'],
              },
            },
          ],
        },
      ],
    },
  },
];
