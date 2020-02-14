/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  output: path.join(__dirname, 'build'),
  tsConfig: path.join(__dirname, 'tsconfig.app.json')
};

PATHS['entry'] = path.join(PATHS.src, 'index.tsx');
PATHS['template'] = path.join(PATHS.src, 'index.html');

const outputDir = path.join(__dirname, 'build/');
const isProd = process.env.NODE_ENV === 'production';

const contentSecurityPolicy = {
  'default-src': "'none'",
  'img-src': ["'self'"],
  'script-src': ["'self'"],
  'style-src': ["'self'"],
  'font-src': ['data:']
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
    inject: false
  }),
  new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
  }),
  new CspHtmlWebpackPlugin(contentSecurityPolicy, cspPluginOptions),
];

const optimisations = {
  splitChunks: {
    cacheGroups: {
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      }
    }
  }
};

if (isProd) {
  plugins.push(
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {
        nodir: true,
      })
    })
  );
}

module.exports = {
  entry: PATHS.entry,
  mode: isProd ? 'production': 'development',
  output: {
    path: PATHS.output,
    filename: 'index.js',
  },
  node: {
    global: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|__tests__)/,
        options: {
          configFile: 'tsconfig.app.json'
        }
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
    contentBase: outputDir,
    port: process.env.PORT || 8000,
    historyApiFallback: true
  }
};
