/* eslint-disable global-require */
const config = require('config');

if (config.get('useMocks')) {
  require('./api/mocks/server');
}
