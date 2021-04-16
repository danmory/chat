const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const stylesLoader = (additional = null) => {
    const loaders = ['vue-style-loader', 'css-loader']
    if (additional) loaders.push(additional)
    return loaders
}

const env = process.env.NODE_ENV

module.exports = {
    mode: env || 'development',
    entry: ['babel-polyfill', path.resolve(__dirname, 'src', 'main.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.css$/, use: stylesLoader() },
            { test: /\.sass$/, use: stylesLoader(
                {
                    loader: 'sass-loader',
                    options: { sassOptions: { indentedSyntax: true } }
                })
            },
            { test: /\.scss$/, use: stylesLoader('sass-loader') },
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
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ]
}