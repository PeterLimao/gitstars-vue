var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var Config = require('./webpack.base.config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

Config.output.publicPath = '';

Config.plugins = (Config.plugins || []).concat([
    new Webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new HtmlWebpackPlugin({
        filename: 'app.html',
        template: 'src/app.html',
        chunks: ['app'],
        inject: true,
        hash: true
    }),
    new HtmlWebpackPlugin({
        filename: 'fileContent.html',
        template: 'src/apiPages/fileContent/fileContent.html',
        chunks: ['fileContent'],
        inject: true,
        hash: true
    }),
    new HtmlWebpackPlugin({
        filename: '404.html',
        template: 'src/apiPages/notFound/notFound.html',
        chunks: ['notFound'],
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
