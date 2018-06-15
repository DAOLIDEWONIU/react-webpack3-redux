const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    plugins: [autoprefixer({ browsers: [
        "iOS >= 8" ,
        "Android >= 4"
        ]
    })],
    postcss: [
        pxtorem({
            rootValue: 100,
            propWhiteList: [],
        })
    ],
};
