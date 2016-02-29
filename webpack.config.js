/*eslint-env node */
const path = require('path')
const webpack = require('webpack')

const env = process.env
const version = env.npm_package_version
const build_path = 'frontend/public'
const base_url = 'http://localhost:8080'

module.exports = {
  entry: {
    app: path.resolve('frontend/client.js'),
  },
  output: {
    path: path.resolve(`${build_path}/${version}`),
    filename: 'app.js',
    publicPath: `${base_url}/${version}/`,
  },
  devtool: 'source-map-inline',
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          sourceMaps: true,
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.EnvironmentPlugin(Object.keys(env)),
  ],
}