// @flow

// Allows accessing built-in plugins
const webpack = require('webpack');
// Use path package from Node.js
const path = require('path');

// Require plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
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

  entry: path.join(paths.APP, 'index.js'),

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
    // More readable path names when using Hot Module Replacement
    new webpack.NamedModulesPlugin(),
    // Automatically insert the webpack-generated app.bundle.js script into index.html
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, 'index.html'),
    }),
    // Minify output
    new UglifyJSPlugin(),
  ],

  module: {
    rules: [
      {
        // Transpile .js and .jsx files using Babel
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // Load CSS files
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Load binary assets
        test: /\.(woff|woff2|eot|ttf|otf|svg|png|gif|jpg)$/,
        use: {
          loader: 'file-loader',
          options: {},
        },
      },
      {
        // Load SVG images
        test: /\.svg/,
        exclude: '/fonts/',
        use: {
          loader: 'svg-url-loader',
          options: {},
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
  },

};

module.exports = config;
