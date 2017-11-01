var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    // Настройки сервера. Все запросы, которые будут приходить на /api будем редиректить на локалхост
    proxy: [{
      path: '/api/',
      target: 'http://localhost:3001'
    }],
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
};
