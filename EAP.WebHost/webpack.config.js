var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var AssetsPlugin = require('assets-webpack-plugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');

var metadata = {
  title: 'EAP Web Host by @mkjeff',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 */
module.exports = helpers.defaults({
  // static data for index.html
  metadata: metadata,
  output: {
    path: helpers.root('wwwroot/assets'),
    publicPath: '/assets/',
  },
  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
      { test: /\.js$/, loader: "source-map-loader", exclude: [helpers.root('node_modules/rxjs')] }
    ],
    loaders: [
      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },

      // Support for .ts files.
      { test: /\.ts$/, loader: 'ts-loader', exclude: [/\.(spec|e2e)\.ts$/] },

      // Support for *.json files.
      { test: /\.json$/, loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },

      // Support for *.less files.
      { test: /\.scss$/, loader: 'style!css!sass' },

      // support for .html as raw text
      { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] },


      // support for fonts
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff&name=font/[name].[ext]"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff&name=font/[name].[ext]"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/octet-stream&name=font/[name].[ext]"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?name=font/[name].[ext]"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=image/svg+xml&name=img/[name].[ext]"
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'js/polyfills.bundle.js',
      minChunks: Infinity
    }),
    // static assets
    new CopyWebpackPlugin([{ from: 'web.src/assets', to: '.' }]),
    new ExtractTextPlugin("css/styles.css"),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV),
        'HMR': HMR
      }
    }),
    new AssetsPlugin({ prettyPrint: true }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],

  // our Webpack Development Server config
  devServer: {
    port: metadata.port,
    host: metadata.host,
  },
});
