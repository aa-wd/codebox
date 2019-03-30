const path = require('path');

const srcDir = path.resolve(__dirname, '../src');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader?cacheDirectory=true'
        },
        include: srcDir,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [
          srcDir,
          path.resolve(srcDir, '../node_modules/normalize.css')
        ],
      },
      {
        test: /\.(woff2?|ttf)$/,
        loader: 'file-loader',
        include: path.resolve(srcDir, '../resources'),
    },
    ]
  }
}
