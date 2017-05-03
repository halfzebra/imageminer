const imageminer = require('./imageminer');
const getConfig = require('get-config');
const validateConfig = require('validate-config');

module.exports = function run (from, to, options) {

  getConfig(process.cwd())
    .then(validateConfig)

  return imageminer(from, to, options);
};
