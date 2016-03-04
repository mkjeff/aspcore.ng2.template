var path = require('path');

module.exports = {
  devtool: 'source-map',
  stats: { colors: true, reasons: true },
  resolve: {
    alias: {
      'jquery': __dirname + '/node_modules/jquery/dist/jquery.js',
    },
    extensions: ['', '.ts', '.js']
  },
  debug: true,
  entry: {
    'polyfills': './web.src/polyfills.ts',
    'main': './web.src/main.ts'
  },
  output: {
    filename: 'js/[name].bundle.js',
    sourceMapFilename: 'map/[name].map',
    chunkFilename: 'js/[id].chunk.js',
  },
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ]
  },
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  },
  devServer: {
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
