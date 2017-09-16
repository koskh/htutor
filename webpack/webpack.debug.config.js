const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractApplicationCss = new ExtractTextPlugin({ filename: 'index.css', allChunks: true });
const extractBootstrapCss = new ExtractTextPlugin({ filename: 'bootstrap.css', allChunks: true });

const pkg = require('./../package.json');

const baseConfig = require('./webpack.config');

baseConfig.module.rules.push(
    {
        test: /bootstrap\.css$/,
        use: extractBootstrapCss.extract({
            fallback: 'style-loader',
            use: {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }
        })
    },

    {
        test: /global\.(css|pcss)$/,
        use: extractApplicationCss.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    importLoaders: 1,
                }
            },
            'postcss-loader'
            ]
        })
    },

    {
        test: /index\.(css|pcss)$/,
        use: extractApplicationCss.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[folder]_[name]__[local]--[hash:base64:5]',
                    sourceMap: true,
                    importLoaders: 1,
                    // minimize: true
                }
            },
            'postcss-loader'
            ]
        })
    }
);

// baseConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());

baseConfig.plugins.push(
    extractBootstrapCss,
    extractApplicationCss,
    new webpack.BannerPlugin(`${pkg.name}   ${new Date()}. DEBUG.`),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('debug'),
        PROJECT_ENV: JSON.stringify('debug')
    })
);


module.exports = Object.assign({}, baseConfig, {
    // entry: {
    //
    // },

    devtool: 'source-map',

    watchOptions: {
        aggregateTimeout: 300
    },

    // module: {
    //     loaders: config.module.loaders
    // },

    // plugins: baseConfig.plugins
});

