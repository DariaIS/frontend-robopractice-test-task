const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


let isDev = true;
let mode = 'development';
let target = 'web';
if (process.env.NODE_ENV === 'production') {
    mode = 'production';
    isDev = false;
    target = 'browserslist';
}

const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
    }),
];

module.exports = {
    mode,
    target,
    entry: './src/index.tsx',
    plugins,
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
    },
    devServer: {
        hot: true,
        port: 3000,
    },
    module: {
        rules: [
            { test: /\.(html)$/, use: ['html-loader'] },
            {
                test: /\.s?css$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.join(__dirname, './src/styles/variables.scss')
                        }
                    }
                ],
            },
            {
                test: /\.module\.s?css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDev
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.join(__dirname, './src/styles/variables.scss')
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
                type: mode === 'production' ? 'asset' : 'asset/resource',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            '@src': path.join(__dirname, '/src'),
            '@styles': path.join(__dirname, '/src/styles'),
            '@UIElements': path.join(__dirname, '/src/components/UIElements'),
            '@sections': path.join(__dirname, '/src/components/sections'),
            '@utils': path.join(__dirname, '/src/utils'),
            '@pages': path.join(__dirname, '/src/pages'),
            '@hooks': path.join(__dirname, '/src/hooks'),
        },
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
    },
}