// @flow

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
  '@babel/preset-react',
  '@babel/preset-flow',
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  // #TODO re-enable this if https://github.com/brigand/babel-plugin-flow-react-proptypes/issues/106 is ever resolved
  // 'babel-plugin-flow-react-proptypes',
  'babel-plugin-lodash',
  'react-hot-loader/babel',
];

module.exports = { presets, plugins };
