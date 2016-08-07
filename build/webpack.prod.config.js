var Webpack = require('webpack');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var Config = require('./webpack.base.config');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
require('shelljs/global');

var createDirCmd = function() {
    mkdir('font');
    mkdir('img');
};

var mvDirCmd = function() {
    cp('-R', './font', './dist');
    cp('-R', './img', './dist');
    rm('-rf', './font');
    rm('-rf', './img');
};

createDirCmd();

Config.output.publicPath = '';

Config.plugins = (Config.plugins || []).concat([
    new ExtractTextWebpackPlugin('css/[name].css'),
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

var compiler = Webpack(Config);

compiler.apply(new ProgressPlugin(function(percentage, msg) {
    console.log((percentage * 100) + '%', msg);
}));

compiler.run(function(err, stats) {
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }));
    mvDirCmd();
});
