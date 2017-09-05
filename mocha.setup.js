//eslint-disable-next-line
require('babel-core/register');
// require('mock-local-storage');

const mockCssModules = require('mock-css-modules');
mockCssModules.register(['.css', '.scss', '.pcss']);

['.png', '.jpg'].forEach(ext => {
    require.extensions[ext] = () => null;
});

global.window = {};
global.PROJECT_ENV = 'debug';