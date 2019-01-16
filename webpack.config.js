/* eslint-disable
  flowtype/require-valid-file-annotation,
  flowtype/require-parameter-type,
  flowtype/require-return-type
*/

// Use path package from Node.js
const path = require('path');

// Allows accessing built-in plugins
const webpack = require('webpack');
// Allows merging base / dev / prod configs together
const merge = require('webpack-merge');
// Require plugins
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const RobotsTxtPlugin = require('robotstxt-webpack-plugin');

// Path name constants
const paths = {
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  APP: path.resolve(__dirname, 'app'),
  PUBLIC: path.resolve(__dirname, 'public'),
};

// Webpack base configuration
const createBaseConfig = (env) => ({

  entry: ['@babel/polyfill', path.join(paths.APP, 'index.js')],

  output: {
    filename: 'app.bundle.js',
    publicPath: '/',
  },

  devServer: {
    // Configure fallback URL; see https://redux.js.org/docs/advanced/UsageWithReactRouter.html
    historyApiFallback: true,
  },

  module: {
    rules: [
      // Transpile .js and .jsx files using Babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // Load font files using file-loader.
      // Important note: the /images/ folder (or any other folder that may contain svg images) must
      // be excluded, since otherwise the images won't work.
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|flow)$/,
        exclude: /images/,
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
        exclude: /fonts/,
        use: {
          loader: 'svg-url-loader',
        },
      },
    ],
  },

  plugins: [
    // Generate favicons in different sizes and formats
    new FaviconsWebpackPlugin(path.join(__dirname, 'app/assets/images/logo/logo-color.svg')),
    // Allow specifying an API_URL override on the command line
    new webpack.DefinePlugin({
      'window.API_URL': (env != null && env.API_URL != null) ? `"${env.API_URL}"` : false,
    }),
  ],

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

});

// Webpack developemnt mode additional configuration
const createDevConfig = (/* env */) => ({

  devServer: {
    // Enable hot reloading
    hot: true,
  },

  plugins: [
    // Include hot reloading functionality
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, 'index.dev.html'),
    }),
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

});

// Webpack production mode additional configuration
const createProdConfig = (/* env */) => ({

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
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, 'index.prod.html'),
    }),
    // Generate a /robots.txt served by the web server to prevent bots from indexing certain routes
    new RobotsTxtPlugin({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/api', '/oauth'],
        },
      ],
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

});

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return merge(createBaseConfig(env), createDevConfig(env));
  }
  else {
    return merge(createBaseConfig(env), createProdConfig(env));
  }
};
