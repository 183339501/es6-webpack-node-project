/**
 * Created by pengyao on 16/5/16.
 */
'use strict';
const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        "./entry.js"
    ],
    output: {
        path: path.resolve(__dirname,'build'),
        filename: "bundle.js",
        publicPath:"/build"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ["react-hot",'babel'] // 'babel-loader' is also a legal name to reference
            },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            {
                test: /\/bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
            }
        ]
    },
    devServer: {
        contentBase: __dirname,
        port: 3000,
        inline: true,
        historyApiFallback: true,
        stats: { colors: true },
        hot: true,
        proxy: {
            '*': 'http://127.0.0.1:3001'
        }
    },
    babel:{
        presets: ['react', 'es2015']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};