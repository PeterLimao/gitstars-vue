var Webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Path = require('path');

var myAlias = {
    components: Path.join(__dirname, '../src/components'),
    state: Path.join(__dirname, '../src/vuex/state'),
    mutations: Path.join(__dirname, '../src/vuex/mutations'),
    store: Path.join(__dirname, '../src/vuex/store'),
    actions: Path.join(__dirname, '../src/vuex/actions'),
    tools: Path.join(__dirname, '../src/tools'),
    filters: Path.join(__dirname, '../src/filters')
};

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: './dist/assets/',
        filename: '[name].js',
        chunkname: '[id].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpeg)$/,
                loader: 'url',
                query: {
                    limit: 10000
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css'],
        alias: myAlias
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('css')
        }
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html',
            inject: true,
            hash: true
        })
    ]
};
