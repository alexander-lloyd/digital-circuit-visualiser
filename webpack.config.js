const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

const outputDir = path.join(__dirname, 'build/');
const isProd = process.env.NODE_ENV === 'production';

const contentSecurityPolicy = {
  'default-src': '"none"',
  'img-src': ['"self"', "https://alexander-lloyd.github.io"],
  'script-src': ['"self"', "https://alexander-lloyd.github.io"],
  'style-src': ['"self"', "https://alexander-lloyd.github.io"],
  'font-src': ['data:', "https://alexander-lloyd.github.io"],
}

const cspPluginOptions = {
  enabled: isProd,
  nonceEnabled: {
    'script-src': true
  }
}

module.exports = {
  entry: './src/index.tsx',
  mode: isProd ? 'production': 'development',
  output: {
    path: outputDir,
    filename: 'index.js',
  },
  node: {
    global: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /(node_modules|__tests__)/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
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
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    }),
		new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new CspHtmlWebpackPlugin(contentSecurityPolicy, cspPluginOptions)
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json'
      })
    ]
  },
  devServer: {
    compress: true,
    contentBase: outputDir,
    port: process.env.PORT || 8000,
    historyApiFallback: true
  }
};
