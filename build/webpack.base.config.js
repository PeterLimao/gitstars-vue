var Path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var myAlias = {
    components: Path.join(__dirname, '../src/components'),
    view: Path.join(__dirname, '../src/view'),
    state: Path.join(__dirname, '../src/vuex/state'),
    mutations: Path.join(__dirname, '../src/vuex/mutations'),
    store: Path.join(__dirname, '../src/vuex/store'),
    actions: Path.join(__dirname, '../src/vuex/actions'),
    tools: Path.join(__dirname, '../src/tools'),
    filters: Path.join(__dirname, '../src/filters'),
    api: Path.join(__dirname, '../src/api/api.js')
};

module.exports = {
    entry: {
        app: ['./src/app.js'],
        fileContent: ['./src/apiPages/fileContent/fileContent.js'],
        notFound: ['./src/apiPages/notFound/notFound.js']
    },
    output: {
        path: Path.join(__dirname, '../dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].[name].[hash].js'
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
                test: /\.(png|jpeg|jpg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '../img/[name].[hash].[ext]'
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextWebpackPlugin.extract(['css', 'postcss', 'stylus'])
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "url",
                query: {
                    limit: 10000,
                    name: '../font/[name].[hash].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.jpg', '.styl'],
        alias: myAlias
    },
    vue: {
        loaders: {
            css: 'style!css!postcss!stylus'
        }
    },
    postcss: function() {
        return [autoprefixer({browsers: ['last 2 versions']})]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
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
            filename: 'notFound.html',
            template: 'src/apiPages/notFound/notFound.html',
            chunks: ['notFound'],
            inject: true,
            hash: true
        })
    ]
};
