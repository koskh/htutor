// @flow

const express = require('express');
const path = require('path');

// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const configWebpack = require('../webpack/webpack.config');
// const compiler = webpack(configWebpack);

const api = require('./api');

const app = express();
const host = '0.0.0.0';
const port = 3001;

const publicPath = path.resolve(__dirname, './static');

// const options = {
//     noInfo: false,
//     publicPath: configWebpack.output.publicPath
// };
//
// app.use(webpackMiddleware(compiler, {
//     noInfo: false,
//     publicPath: '/',
// }));
// app.use(require("webpack-hot-middleware")(compiler));


app.use('/api', api);

app.use(express.static(publicPath));

app.get('*', (request: express$Request, response: express$Response) => {
    response.sendFile(path.resolve(publicPath, 'index.html'));
});

app.listen(port, host, err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://0.0.0.0:${port}`);
});

