const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const stylesLoader = (additional = null) => {
    const loaders = ['vue-style-loader', 'css-loader']
    if(additional) loaders.push(`${additional}-loader`)
    return loaders
}

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: stylesLoader() },
            { test: /\.s[ac]ss$/, use: stylesLoader('sass') },
            { test: /\.vue$/, loader: 'vue-loader' },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new VueLoaderPlugin()
    ]
}