// @flow

// Allows accessing built-in plugins
const webpack = require('webpack');
// Use path package from Node.js
const path = require('path');

// Require plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Path name constants
const paths = {
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  DIST: path.resolve(__dirname, 'dist'),
  APP: path.resolve(__dirname, 'app'),
  PUBLIC: path.resolve(__dirname, 'public'),
};

// Webpack configuration
const config = {

  entry: ['react-hot-loader/patch', path.join(paths.APP, 'index.js')],

  output: {
    // Output bundle path & filename
    path: paths.DIST,
    filename: 'app.bundle.js',
    // "Otherwise hot reloading won't work as expected for nested routes."
    // See https://github.com/gaearon/react-hot-loader
    publicPath: '/',
  },

  devServer: {
    // Configure fallback URL; see https://redux.js.org/docs/advanced/UsageWithReactRouter.html
    historyApiFallback: true,
    // Enable hot reloading
    hot: true,
  },

  // Specify which type of source map to use
  // Note: source maps must be enabled to prevent the console from showing an error
  // See https://github.com/webpack/webpack-dev-server/issues/1161
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    // Include hot reloading functionality
    new webpack.HotModuleReplacementPlugin(),
    // Automatically insert the webpack-generated app.bundle.js script into index.html
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, 'index.html'),
    }),
    // Minify output
    new UglifyJSPlugin(),
    // Check source files for Flow errors; fail build if errors are found
    new FlowStatusWebpackPlugin({
      failOnError: true,
      restartFlow: false, // prevent plugin from interfering with flow server run by the IDE
    }),
  ],

  module: {
    rules: [
      {
        // Check source files with ESLint; fail build if errors are found
        // Enforce this happening before any other processing
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        // Transpile .js and .jsx files using Babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // Load CSS files
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Load SVG files
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
      {
        // Load binary assets
        test: /\.(woff|woff2|eot|ttf|otf|png|gif|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {}
        }
      }
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
  },

};

module.exports = config;
