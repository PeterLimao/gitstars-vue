var Path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

var myAlias = {
    components: Path.join(__dirname, '../src/components'),
    'vux-components': 'vux/dist/components',
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
        fileContent: ['./src/apiPages/fileContent/fileContent.js']
    },
    output: {
        path: Path.join(__dirname, '../dist/assets/'),
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
                test: /\.(png|jpeg|jpg)$/,
                loader: 'url',
                query: {
                    limit: 10000
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                loader: "url"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.css', '.jpg'],
        alias: myAlias
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new ExtractTextWebpackPlugin('[name].css')
    ]
};
