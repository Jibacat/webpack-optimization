const path = require('path');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'moment', 'antd'],
    },
    output: {
        /**
         * 这里output里的filename就是生成的文件名称，这里也就是dll_vendor.js.
         * 而library是动态库输出的模块全局变量名称。
         * 注意，这个library一定要与webpack.DllPlugin配置中的name完全一样。
         * 为什么呢？ 看一下，生成的manifest文件以及dll_vendor文件就明白了。
         */
        path: path.resolve(__dirname, './dist', 'dll'),
        // 假如在将来真的发生了更新，那么新的dll文件名便需要加上新的hash，从而避免浏览器缓存老的文件，造成执行出错。由于 hash 的不确定性，我们在 html 入口文件中没办法指定一个固定链接的 script 脚本，刚好，add-asset-html-webpack-plugin 插件可以帮我们自动引入 dll 文件。
        filename: 'dll_[name].js',
        library: '[name]_[hash]'
    },
    plugins: [
        /**
         * webpack4 性能已经很好了，vue-cli官方已经去掉了dll，
         * path: manifest.json输出文件路径
         * name: dll对象名，跟output.library保持一致
         */ 
        new webpack.DllPlugin({
            context: __dirname,
            path: path.resolve(__dirname, './dist', '[name].manifest.json'),
            name: '[name]_[hash]'
        })
    ],
    devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map'
}