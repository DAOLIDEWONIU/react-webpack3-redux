'use strict';
global.rootPath = __dirname;
const path = require('path');
const
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    autoprefixer = require('autoprefixer'),/**自动添加css浏览器前缀*/
    node_modules = path.resolve(__dirname, 'node_modules'),
    node_module_dir = path.resolve(__dirname, 'node_module');

const svgDirs = [
    require.resolve('antd').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/images/svg')  // 2. 自己私人的 svg 存放目录
];

const theme = require('./package.json').theme;//自定义主题

module.exports = {
    entry: {
        index: path.join(__dirname, "src/index.jsx"),
        vendor: [
            'babel-polyfill',
            'react',
        ]
    },
    output: {
        path: path.join(__dirname, "/build"),
        publicPath: '/build/',
        filename: '[name].js'
    },
    devServer: {
        proxy: {
            "/index": {
                target: "http://39.104.116.109",//http://39.104.116.109  http://192.168.2.142
            }
        },
        contentBase: path.join(__dirname, "/build"),//本地服务器所加载的页面所在的目录
        inline: true,  //实时刷新
        open: true, //是否运行成功后直接打开页面
        historyApiFallback: true,  //不跳转
        port: 8888,
        host: '127.0.0.1',
    },
    plugins: [
        // 能在所有JS模块里面读取“__DEV__”这个值
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true'))
        }),
        new webpack.HotModuleReplacementPlugin(),///**模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新.*/
        new webpack.NamedModulesPlugin(),//当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
        
        new HtmlWebpackPlugin({
            filename:path.join(__dirname, "build/index.html"),    //生成的html存放路径，相对于 path  `${rootPath}/src/html/index.html`
            template:path.join(__dirname, "src/templates/index.html"),    //html模板路径
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [
                        autoprefixer({
                            browsers: ["last 5 versions"],
                        })
                    ];
                }
            }
        }),
        new ExtractTextPlugin('css/[name].css'),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    
    module: {
        rules: [{
            test: /\.(js|jsx)$/,//babel-loader
            use: [
                {
                    loader:  'babel-loader',
                    options: {
                        babelrc: true,
                    }
                }
            ],
            exclude: [node_module_dir],
        },
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader', "postcss-loader"],
                include: /node_modules/,
            },
            {
                test: /\.(png|jpg|webp)$/,
                use: [
                    'url-loader?limit=8192&name=images/[name].[ext]',
                    'webp-loader?{quality: 13}'
                ],
                exclude: svgDirs
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'},
                        'postcss-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {loader: 'less-loader', options: {modifyVars: theme}},
                ],
                include: /node_modules/
            },
            {
                test: /\.svg$/i,
                use: 'svg-url-loader', // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
                include: svgDirs,
            }
        ]
    }
}
