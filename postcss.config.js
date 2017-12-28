/* eslint-disable */
module.exports = {
    plugins: [
        require('precss')({ /* ...options */ }),
        // require('postcss-utilities')({ /* ...options */ }),
        require('postcss-inline-svg')({}),
        require('postcss-svgo')({}),
        require('autoprefixer')({ /* ...options */ }),
    ]
}
