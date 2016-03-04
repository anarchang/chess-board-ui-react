module.exports = {
  entry: [
    './app/main.js'
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: __dirname + '/app', loader: "babel-loader"},
      {test: /\.scss$/, include: __dirname + '/app/styles', loaders: ['style', 'css', 'sass']}
    ]
  },
  output: {
    filename: "index.js",
    path: __dirname + '/build'
  },
}
