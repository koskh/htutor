/* eslint-disable */
module.exports = {
    plugins: [
        // require('postcss-smart-import')({ /* ...options */ }),
        require('precss')({ /* ...options */ }),
        // require('postcss-mixins')({ /* ...options */ }),
        // require('postcss-simple-vars')({ /* ...options */ }),
        // require('postcss-custom-properties')({ /* ...options */ }),
        // require('postcss-color-function')({ /* ...options */ }),
        // require('postcss-nested')({ /* ...options */ }),
        require('postcss-utilities')({ /* ...options */ }),
        require('postcss-inline-svg')({}),
        require('postcss-svgo')({}),
        require('autoprefixer')({ /* ...options */ }),
    ]
}
