const webpack = require('webpack');

// Helpers
const clean = plugins => plugins.filter(x => !!x);

module.exports = (options = {}) => {
  const isProduction = !!options.production;

  return {
    output: {
      library: 'simpleReduxUtils',
      libraryTarget: 'umd',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            { loader: 'babel-loader' },
            {
              loader: 'eslint-loader',
              query: {
                configFile: '.eslintrc',
                failOnError: isProduction,
                failOnWarning: isProduction,
              },
            },
          ],
        },
      ],
    },
    plugins: clean([
      new webpack.optimize.OccurrenceOrderPlugin(),

      // Only for production
      isProduction && new webpack.optimize.UglifyJsPlugin({
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
      }),
    ]),
  };
};
