/*eslint-env node */
import path from 'path'
import webpack from 'webpack'

const env = process.env
const version = env.npm_package_version
const build_path = 'frontend/public'
const base_url = 'http://localhost:8080'

export default {
  entry: {
    app: path.resolve('frontend/client.js'),
  },
  output: {
    path: path.resolve(`${build_path}/${version}`),
    filename: 'app.js',
    publicPath: `${base_url}/${version}/`,
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
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