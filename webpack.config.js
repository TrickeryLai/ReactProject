
'use strict';

let ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包

module.exports = {
    devtool: 'eval-source-map',

    entry: __dirname + '/src/entry.js', //唯一入口文件
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "jsx!babel-loader",
                include: /src/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css!postcss")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!postcss!sass")
            },
            //引用css中的一些字体与图像
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|woff2)\??.*$/,
                loader: 'url?limit=2000'
            },
            //引用图像
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            }
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8888,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    plugins: [
        new ExtractTextPlugin('main.css'),
    ]

};
