var path = require('path');
var commonConfig = require('./webpack.common.config');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var extractCSS = new ExtractTextPlugin('style.css');
var htmlwp = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public', 'index.hbs')
})

var output = {
    path: path.resolve(__dirname),
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
};

module.exports = Object.assign(commonConfig, {
    output: output,
    devtool: 'source-map',
    module: {
        loaders: commonConfig.module.loaders.concat({
            test: /\.s?css$/,
            exclude: /(node_modules)/,
            loader: extractCSS.extract('style', 'css?sourceMap!postcss?sourceMap!sass?sourceMap')
        })
    },
    plugins: commonConfig.plugins.concat(extractCSS).concat(htmlwp)
});