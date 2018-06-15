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
        path: path.join(__dirname, "/dist"),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    plugins: [
        // 能在所有JS模块里面读取“__DEV__”这个值
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: 'manifest.[chunkhash:5].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,// 最紧凑的输出
            compress: {
                // dead_code : true,
                warnings: false,
                drop_console: true // 发布时去除console语句
            },
            comments: false,
            except: ['$', 'exports', 'require']
        }),
        new HtmlWebpackPlugin({
            filename:path.join(__dirname, "dist/index.html"),    //生成的html存放路径，相对于 path  `${rootPath}/src/html/index.html`
            template:path.join(__dirname, "src/templates/index.html"),    //html模板路径
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),//启用作用域提升，作用是让代码文件更小、运行的更快
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [
                        autoprefixer({
                            browsers: ["last 5 versions"],
                        })
                    ];
                }
            },
            minimize: true
        }),
        new ExtractTextPlugin('css/[name].css'),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
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
};
