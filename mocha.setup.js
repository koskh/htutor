//eslint-disable-next-line
require('babel-core/register');
const { JSDOM } = require('jsdom');
// require('mock-local-storage');

const mockCssModules = require('mock-css-modules');
mockCssModules.register(['.css', '.scss', '.pcss']);

['.png', '.jpg'].forEach(ext => {
    require.extensions[ext] = () => null;
});

// global.window = {};
global.PROJECT_ENV = 'debug';


const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
global.HTMLElement = global.window.HTMLElement;
copyProps(window, global);
