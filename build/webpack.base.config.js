var Path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var Webpack = require('webpack');

var mAlias = {
    components: Path.join(__dirname, '../src/components'),
    pages: Path.join(__dirname, '../src/pages'),
    directives: Path.join(__dirname, '../src/directives'),
    assets: Path.join(__dirname, '../src/assets'),
    state: Path.join(__dirname, '../src/store/state'),
    mutations: Path.join(__dirname, '../src/store/mutations'),
    store: Path.join(__dirname, '../src/store'),
    actions: Path.join(__dirname, '../src/store/actions'),
    api: Path.join(__dirname, '../src/api'),
    libs: Path.join(__dirname, '../src/libs'),
    i18n: Path.join(__dirname, '../src/i18n')
};

module.exports = {
    entry: {
        app: ['./src/app.js'],
        fileContent: ['./src/apiPages/fileContent/fileContent.js'],
        noNetwork: ['./src/apiPages/noNetwork/noNetwork.js'],
        vendor: [
            'vue',
            'vue-router',
            'vuex'
        ]
    },
    output: {
        path: Path.join(__dirname, '../dist'),
        filename: 'js/[name].[hash:7].js',
        chunkFilename: 'js/[name].[hash:7].js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue!eslint'
            },
            {
                test: /\.js$/,
                loader: 'babel!eslint',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpeg|jpg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '../img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextWebpackPlugin.extract('style', 'css!postcss!less')
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style', 'css')
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "url",
                query: {
                    limit: 10000,
                    name: '../font/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.jpg', '.less'],
        alias: mAlias
    },
    postcss: function() {
        return [autoprefixer];
    },
    vue: {
        autoprefixer: {
            browsers: ['last 2 versions']
        }
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new Webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            filename: 'app.html',
            template: 'src/app.html',
            chunks: ['vendor', 'app'],
            inject: true,
            hash: false
        }),
        new HtmlWebpackPlugin({
            filename: 'fileContent.html',
            template: 'src/apiPages/fileContent/fileContent.html',
            chunks: ['vendor', 'fileContent'],
            inject: true,
            hash: false
        }),
        new HtmlWebpackPlugin({
            filename: 'noNetwork.html',
            template: 'src/apiPages/noNetwork/noNetwork.html',
            chunks: ['vendor', 'noNetwork'],
            inject: true,
            hash: false
        })
    ]
};
