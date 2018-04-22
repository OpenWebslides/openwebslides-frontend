// @flow

// Use path package from Node.js
const path = require('path');

// Path name constants
const paths = {
  NODE_MODULES: path.resolve(__dirname, 'node_modules'),
  APP: path.resolve(__dirname, 'app'),
};

// Minimal config to get eslint import/resolver to work
// (since the merge in the 'real' webpack.config stops it from correctly resolving paths).
module.exports = {
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
