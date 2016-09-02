var ProvidePlugin = require('webpack').ProvidePlugin;
var HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './public/js/app.js'
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, {
            test: /\.html$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.(jpe?g|png|gif)$/,
            exclude: /(node_modules)/,
            loader: 'url-loader?limit=10000'
        }, 
        { 
            test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, 
            loader: "file-loader" 
        },
        { 
            test: /\.(hbs|handlebars)([\?]?.*)$/, 
            loader: "handlebars-loader" 
        }
        ]
    },
    postcss: function() {
        return [autoprefixer];
    },
    plugins: [
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": 'jquery',
            "windows.jQuery": 'jquery',
        }),
        new HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.css'],
        alias: {
            "scrollTo": path.resolve(
                __dirname,
                "node_modules/jquery.scrollto/jquery.scrollTo.min"
            ),
            "waypoints": path.resolve(
                __dirname,
                "node_modules/waypoints/lib/jquery.waypoints.min"
            ),
        }
    }
};