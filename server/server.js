const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const config = require('../webpack.config.js');
const assetController = require('./controllers/assetController');

const app = express();
const PORT = process.env.PORT || 3000;
const compiler = webpack(config);
const clientDir = path.join(__dirname, '../client');

app.use(express.json());
app.use(webpackDevMiddleWare(compiler, {
  publicPath: config.output.publicPath,
}));

app.get('/assets/slides', assetController.getSlides, (req, res) => {
  res.status(200).json(res.locals.slides);
});

app.get('/assets/*', (req, res) => {
  res.sendFile(path.join(__dirname, unescape(req.url)));
});

app.get('/assets', assetController.getFolders, (req, res) => {
  res.status(200).json(res.locals.folders);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDir, '/index.html'));
});

// access on 192.168.86.27
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on PORT ${PORT}...`);
});
