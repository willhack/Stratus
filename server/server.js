/* 192.168.86.27 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const config = require('../webpack.config.js');

const app = express();
const PORT = process.env.PORT || 3000;
const compiler = webpack(config);
const clientDir = path.join(__dirname, '../client');

app.use(webpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath,
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, '/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on PORT ${PORT}...`);
});
