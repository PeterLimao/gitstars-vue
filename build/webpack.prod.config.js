var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var Config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

Config.output.publicPath = 'assets/';

Config.plugins = (Config.plugins || []).concat([
    new Webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new HtmlWebpackPlugin({
        filename: '../index.html',
        template: 'src/index.html',
        inject: true,
        hash: true
    }),
    new Webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new Webpack.optimize.OccurenceOrderPlugin()
]);

module.exports = Config;
