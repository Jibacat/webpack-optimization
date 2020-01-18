const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
    entry: {
        index: __dirname + '/index',
        index2: __dirname + '/index2',
    },

    output: {
        path: __dirname + '/dist/bundle',
        filename: 'bundle.[name].[chunkhash:8].js',
        chunkFilename: 'bundle.[name].[chunkhash:8].js'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                // styles: {
                //      // 将所有css文件放在一起打包到一个文件里，不加的话会有index.css index2.css同时存在
                //     name: 'styles',
                //     test: /\.(sa|sc|c)ss$/,
                //     chunks: 'all',
                //     enforce: true
                // }
            }
        }
    },

    module: {
        rules: [
            
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory=true',
                }
            },
            {
                // 引用《入门webpack》中的原文：css-loader使你能够使用类似@import和url（…）的方法实现require的功能，style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的js文件中。
                // 我们这样配置后，遇到后缀为.css的文件，webpack先用css-loader加载器去解析这个文件，遇到“@import”“url”等语句就将相应样式文件引入（所以如果没有css-loader，就没法解析这类语句），最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里。
                // test: /\.scss$/,
                // use: ['style-loader','css-loader','sass-loader'],
                // exclude: /node_modules/

                // 更新，直接用这种方式打包，会将css文件打包到js文件中，然后在浏览器中会在head中添加style标签来读取这些样式，这样容易产生样式混乱问题。
                // 最佳方法是打包过程生成一份style.css文件，html引入这个文件即可。

                // extract-text-webpack-plugin 在webpack 4.x被废弃 使用mini-css-extract-plugin取代
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // 这里可以指定一个 publicPath
                          // 默认使用 webpackOptions.output中的publicPath
                          // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
                          // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
                          publicPath: './',  
                          // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
                          hmr: devMode, // 仅dev环境启用HMR功能
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        // 告诉webpack使用了哪些第三方库代码
        new webpack.DllReferencePlugin({
          // 映射到json文件上去
          manifest: require('./dist/dll/vendor.manifest.json')
        }),
        // new BundleAnalyzerPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // node_modules/moment/locale 负责国际化，没必要全部引入，而我们实际使用只需其中的zh-cn文件
        /**
         *  使用方式
            const moment = require('moment');
            引入zh-cn locale文件
            require('moment/locale/zh-cn');
            moment.locale('zh-cn');
         */
        new HtmlWebpackPlugin({
            title: 'My app',
            template: 'index.html'
        }),

        new HtmlWebpackTagsPlugin({ tags: ['dll_vendor.js'],publicPath: path.resolve(__dirname, '/dist/dll/'),append: false }),

        // new AddAssetHtmlPlugin({ outputPath: "dll", filepath: path.resolve(__dirname, './dist/dll/dll_*.js')}),
        // 用AddAssetHtmlPlugin回额外生成一个dll.js文件

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // contenthash ，只有css文件改了才会改变hash，而不是跟着入口文件一起变。
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].[contenthash:8].css'
        })
        
    ],
    externals: {
        jquery: 'jQuery'
    },
    //  如果是开发环境，即 mode: 'development'，用 devtool: 'cheap-module-eval-source-map' 比较好，
    //  如果是生产环境，即 mode: 'production'，用 devtool: 'cheap-module-source-map' 比较好。
    devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map'
}