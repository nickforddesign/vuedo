/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const config = require('config');

const API_PORT = config.get('apiMockPort');
const API_ROOT = `http://localhost:${API_PORT}`;

module.exports = {
  lintOnSave: 'error',
  chainWebpack: ($config) => {
    $config.resolve.alias
      .set('%', path.resolve(__dirname, 'src/scss/modules'));
  },
  configureWebpack: {
    plugins: [
      new webpack.EnvironmentPlugin({
        API_PORT,
        API_ROOT
      })
    ]
  }
};
