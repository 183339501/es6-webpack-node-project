/**
 * Created by pengyao on 16/5/16.
 */
'use strict';
const path = require("path");
const webpack = require("webpack");
module.exports = {
    entry: [
        "./entry.js"
    ],
    output: {
        path: path.resolve(__dirname,'build'),
        filename: "bundle.js",
        publicPath:"/build/"
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
    babel:{
        presets: ['react', 'es2015']
    }
};