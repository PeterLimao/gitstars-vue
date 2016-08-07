var Config = require('./webpack.base.config');
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

Config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
Config.entry.fileContent.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
Config.entry.notFound.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
Config.output.filename = '[name].js';
Config.output.chunkFilename = '[id].[name].[hash].js';
Config.module.loaders.forEach(function(loader) {
    if (loader.loader === 'url') {
        loader.query.name = '[name].[hash].[ext]';
    }
});

Config.plugins = (Config.plugins || []).concat([
    new ExtractTextWebpackPlugin('[name].css'),
    new Webpack.HotModuleReplacementPlugin()
]);

Config.devtool = '#eval-source-map';

var server = new WebpackDevServer(Webpack(Config), {
    historyApiFallback: true,
    hot: true,
    inline: true,
    proxy: {
        '/api/*': {
            target: 'http://test01.gitstars.cn',
            secure: false,
            rewrite: function(req) {
                console.log('---rewrite---' + req.url);
                req.url = req.url.replace(/^\/api/, '');
            }
        }
    }
});

server.listen(8080, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('listen at localhost:8080');
});
