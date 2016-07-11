var Config = require('./webpack.base.config');
var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

Config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
Config.entry.fileContent.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
Config.plugins = (Config.plugins || []).concat([
    new Webpack.HotModuleReplacementPlugin(),
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
    })
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
