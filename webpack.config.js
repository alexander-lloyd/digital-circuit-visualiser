/* eslint-env node */
/* eslint-disable no-process-env,prefer-named-capture-group */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

const DEFAULT_PORT = 8000;

const PATHS = {
    src: path.join(__dirname, 'src'),
    output: path.join(__dirname, 'build'),
    tsConfig: path.join(__dirname, 'tsconfig.app.json')
};

PATHS.entry = path.join(PATHS.src, 'index.tsx');
PATHS.template = path.join(PATHS.src, 'index.html');

const isProd = process.env.NODE_ENV === 'production';

const contentSecurityPolicy = {
    'default-src': '\'none\'',
    'img-src': ['\'self\'', 'data: '],
    'script-src': ['\'self\''],
    'style-src': ['\'self\''],
    'font-src': ['\'self\'', 'data: ']
};

const cspPluginOptions = {
    enabled: isProd,
    nonceEnabled: {
        'script-src': true
    }
};

const plugins = [
    new HtmlWebpackPlugin({
        template: PATHS.template,
        inject: true,
        favicon: './src/assets/favicon.ico'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].bundle.css'
    }),
    new CspHtmlWebpackPlugin(contentSecurityPolicy, cspPluginOptions)
];

const optimisations = {
    splitChunks: {
        cacheGroups: {
            styles: {
                name: 'styles',
                test: /\.css$/u,
                chunks: 'all',
                enforce: true
            }
        }
    }
};

module.exports = {
    entry: PATHS.entry,
    mode: isProd ? 'production' : 'development',
    output: {
        path: PATHS.output,
        filename: 'index.js'
    },
    node: {
        global: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/iu,
                loader: 'ts-loader',
                exclude: /(node_modules|__tests__)/iu,
                options: {
                    configFile: 'tsconfig.app.json'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/iu,
                use: ['file-loader']
            },
            {
                test: /\.s[ac]ss$/iu,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    optimization: isProd ? optimisations : undefined,
    plugins,
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: PATHS.tsConfig
            })
        ]
    },
    devServer: {
        compress: true,
        contentBase: PATHS.output,
        port: process.env.PORT || DEFAULT_PORT,
        historyApiFallback: true
    },
    devtool: isProd ? 'nosources-source-map' : 'eval-source-map'
};
