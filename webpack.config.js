const path = require('path');
module.exports = {
    entry: [
     './node_modules/regenerator-runtime/runtime.js',
      path.join(__dirname, './client/index.js')
    ],
    watch: true,
    mode: 'development',
    output: {
        path: path.join(__dirname, './public'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                },
            },
        ]
    }
}
