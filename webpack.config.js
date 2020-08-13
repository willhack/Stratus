const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  devServer: {
    contentBase: './client',
    port: 8080,
    hot: true,
    proxy: {
      '/assets': 'http://localhost:3000',
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client'),
    publicPath: '/',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(css||scss||sass)$/i,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(js||jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.css', '.scss', '.js', '.jsx'],
  },
};
