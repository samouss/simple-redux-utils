/* eslint-disable comma-dangle */

const webpack = require('webpack');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    })
  );
}

module.exports = {
  output: {
    library: 'simpleReduxUtils',
    libraryTarget: 'umd',
  },
  eslint: {
    configFile: './.eslintrc',
    failOnError: true,
    failOnWarning: true,
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  plugins,
};
