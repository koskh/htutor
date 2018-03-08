const path = require('path');
const webpack = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

var nodeExternals = require('webpack-node-externals');


// const extractBootstrap = new ExtractTextPlugin({ filename: 'bootstrap.css', allChunks: true });
// const extractGlobalApplicationStyles = new ExtractTextPlugin({ filename: 'global.css', allChunks: true });

var commonLoaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
];

module.exports = [
    {
        entry:{
            index: './server/src/index.js',
        },
        output: {
            path: path.join(__dirname, '../output'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            // publicPath: '/',
        },
        target: 'node',
        node: {
        //     console: false,
        //     global: false,
        //     process: false,
        //     Buffer: false,
        //     __filename: false,
            __dirname: false
        },
        externals: nodeExternals(),
        plugins: [
            // new FlowWebpackPlugin(),
            // new webpack.BannerPlugin({
            //     banner: require("source-map-support").install(),
            //     raw: true, entryOnly: false })
            // new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
        ],
        devtool: 'sourcemap',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        }
    }
];
