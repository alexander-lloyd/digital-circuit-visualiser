const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const outputDir = path.join(__dirname, 'build/');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.tsx',
  mode: isProd ? 'production': 'development',
  output: {
    path: outputDir,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false
    }),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css'
		})
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devServer: {
    compress: true,
    contentBase: outputDir,
    port: process.env.PORT || 8000,
    historyApiFallback: true
  }
};
