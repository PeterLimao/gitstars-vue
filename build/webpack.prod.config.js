var Webpack = require('webpack');
var Config = require('./webpack.base.config');

//Config.output.publicPath = '';

Config.plugins = (Config.plugins || []).concat([
    new Webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new Webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new Webpack.optimize.OccurenceOrderPlugin()
]);

module.exports = Config;
