/* eslint-disable
  flowtype/require-valid-file-annotation,
  flowtype/require-parameter-type,
  flowtype/require-return-type
*/

// Allows accessing built-in plugins
const webpack = require('webpack');
// Allows merging base / dev / prod configs together
const merge = require('webpack-merge');
// Use path package from Node.js
const path = require('path');

// Require plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Path name constants
const paths = {
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  APP: path.resolve(__dirname, 'app'),
  PUBLIC: path.resolve(__dirname, 'public'),
};

// Webpack base configuration
const baseConfig = {

  entry: ['babel-polyfill', path.join(paths.APP, 'index.js')],

  output: {
    filename: 'app.bundle.js',
    publicPath: '/',
  },

  devServer: {
    // Configure fallback URL; see https://redux.js.org/docs/advanced/UsageWithReactRouter.html
    historyApiFallback: true,
  },

  plugins: [
    // Automatically insert the webpack-generated app.bundle.js script into index.html
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, 'index.html'),
    }),
  ],

  module: {
    rules: [
      // Transpile .js and .jsx files using Babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // Load font files using file-loader.
      // Note: this must be done before loading general SVG files, to allow the svg-url-loader rule
      // specified below to override this one on all svg files that are not located in the /fonts/
      // folder.
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: {
          loader: 'file-loader',
        },
      },
      // Load images using url-loader, which works like file-loader, but if the asset is smaller
      // than the limit specified in its options, it is embedded as a data URI to avoid extra
      // requests.
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            absolute: true,
            name: 'images/[path][name]-[hash:8].[ext]',
          },
        },
      },
      // Load SVG images using svg-url-loader, which works like url-loader except it does not
      // base64 encode the svg, since svg is a human-readable format.
      // Important note: the /fonts/ folder (or any other folder that may contain svg fonts) must
      // be excluded, since unencoded svg will cause syntax errors in the CSS if a svg font is
      // referenced in an @font-face rule.
      {
        test: /\.svg/,
        exclude: '/fonts/',
        use: {
          loader: 'svg-url-loader',
        },
      },
    ],
  },

  resolve: {
    // Enable importing files of these types without specifying their extentions
    extensions: ['.js', '.jsx'],
    // Use the app folder as an aditional root for imports.
    // Note: folders added here need to also be added in:
    // - the module.system.node.resolve_dirname option in .flowconfig
    // - the moduleDirectories option in jest.config.js
    modules: [paths.NODE_MODULES, paths.APP],
    // Map Semantic UI LESS' theme.config to our site theme config
    alias: {
      '../../theme.config$': path.join(__dirname, 'app/assets/stylesheets/theme.config'),
    },
  },

};

// Webpack developemnt mode additional configuration
const devConfig = {

  devServer: {
    // Enable hot reloading
    hot: true,
  },

  plugins: [
    // Include hot reloading functionality
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // Load LESS files
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },

};

// Webpack production mode additional configuration
const prodConfig = {

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },

  plugins: [
    // Extract CSS from the JS bundle into a separate file for parallel loading
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],

  module: {
    rules: [
      // Load LESS files
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },

};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return merge(baseConfig, devConfig);
  }
  else {
    return merge(baseConfig, prodConfig);
  }
};
