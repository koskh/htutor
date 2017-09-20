const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

// const extractBootstrap = new ExtractTextPlugin({ filename: 'bootstrap.css', allChunks: true });
// const extractGlobalApplicationStyles = new ExtractTextPlugin({ filename: 'global.css', allChunks: true });


module.exports = {
    entry: {
        index: path.join(__dirname, '../src/scripts/index.js'),
        react: [
            'react', 'react-dom', 'react-router', 'react-router-dom',
            'redux', 'react-redux', 'react-router-redux', 'history'
        ],

        polyfill: 'babel-polyfill',
        moment: 'moment',
        lodash: 'lodash'
    },

    output: {
        path: path.resolve('./output', 'static'),
        publicPath: '/',
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },

            // {
            //     test: /\.json$/,
            //     use: 'json-loader'
            // },

            // {
            //     test: /\.png$/,
            //     use:'file-loader'
            // },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/html', 'index.html'),
            favicon: path.join(__dirname, '../src/media', 'favicon.ico'),
            hash: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['react', 'lodash', 'polyfill', 'moment']
            // children: true,
            // async: true,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        // new CopyWebpackPlugin(
        //     [
        //         { from: 'src/static_assets', to: 'files' }
        //     ], {
        //         ignore: [],
        //         copyUnmodified: true
        //     }
        // ),
        // new WebpackShellPlugin({onBuildStart:[], onBuildEnd:['ln -s /media/Video/soft/Linux_Soft/StarDict_Словари/Sound_En/ build/sounds']})

    ]

};
